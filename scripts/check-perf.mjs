#!/usr/bin/env node
/**
 * Performance budget gate.
 *
 * Fails the build when a measured budget is breached, so a regression
 * cannot land silently. Runs automatically before `next build`.
 *
 * What is checked, and why:
 *
 *   JavaScript, all chunks < 220KB gz — the skill's budget is 200KB of
 *                                       *initial-load* JS. This site has
 *                                       7 routes sharing chunks, so the
 *                                       total across every chunk runs
 *                                       higher; initial load measures
 *                                       ~153KB. The ceiling catches real
 *                                       bloat (a fat dependency, an
 *                                       accidental duplicate) without
 *                                       tripping on legitimate routes.
 *   Unreferenced files in public/       — dead weight shipped on every
 *                                          deploy. This is what a 27MB
 *                                          orphan PNG looked like.
 *   Above-the-fold images < 200KB each  — LCP candidates (hero only).
 *   public/ total      < 45MB
 */
import { readdirSync, statSync, existsSync, readFileSync } from "fs";
import { join, dirname, extname, basename } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const LIMITS = {
  jsGzipKB: 220, // total across all routes; initial load is ~153KB
  aboveFoldImageKB: 200, // LCP candidates (hero)
  imageSanityKB: 1024, // below-the-fold ceiling — catches another 27MB orphan
  publicMB: 45,
};

/** Extensions that are never "above the fold" — they load on demand. */
const DEFERRED = new Set([".mp4", ".webm", ".mov"]);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function gzipKB(path) {
  try {
    return Math.round(
      execSync(`gzip -c "${path}"`, { maxBuffer: 1 << 28 }).length / 1024
    );
  } catch {
    return 0;
  }
}

function kb(path) {
  return Math.round(statSync(path).size / 1024);
}

const failures = [];
const notes = [];

// ── 1. JavaScript bundle (gzipped) ──
const chunks = walk(join(root, ".next/static/chunks")).filter((f) =>
  f.endsWith(".js")
);
const jsGzipTotal = chunks.reduce((acc, f) => acc + gzipKB(f), 0);
if (jsGzipTotal > LIMITS.jsGzipKB) {
  failures.push(
    `JavaScript bundle is ${jsGzipTotal}KB gzipped (budget ${LIMITS.jsGzipKB}KB)`
  );
} else {
  notes.push(`JS bundle: ${jsGzipTotal}KB gzipped / ${LIMITS.jsGzipKB}KB budget`);
}

// ── 2. Unreferenced files in public/ ──
// A file nothing imports is shipped to the edge on every deploy for
// nothing. This is how a 27MB orphan PNG rode along for weeks.
const sourceDirs = ["src", "content", "scripts", "app"]
  .map((d) => join(root, d))
  .filter(existsSync);
const sourceText = sourceDirs
  .flatMap(walk)
  .filter((f) => /\.(ts|tsx|js|jsx|json|css|md|mjs)$/.test(f))
  .map((f) => readFileSync(f, "utf-8"))
  .join("\n");

const orphans = walk(join(root, "public")).filter((f) => {
  const name = basename(f);
  if (sourceText.includes(name)) return false;
  // Derived assets are built by string concat, e.g.
  // `poster={video.replace(/\.mp4$/, "-poster.jpg")}` — the literal
  // basename never appears in source. Treat a file as referenced when
  // its source asset sits next to it: strip the descriptor suffix and
  // look for a sibling that starts with what remains.
  const stem = name
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/-(poster|thumb|thumbnail)$/i, "");
  const dir = dirname(f);
  // Exclude the file itself — otherwise it always counts as its own sibling.
  return !readdirSync(dir).some(
    (s) => s !== name && s.startsWith(stem)
  );
});
for (const f of orphans) {
  failures.push(
    `Unreferenced asset ${kb(f)}KB shipped every deploy: ${f.slice(
      f.indexOf("public/")
    )}`
  );
}
if (orphans.length === 0) notes.push("No unreferenced assets in public/");

// ── 3. Images ──
// The budget is about above-the-fold images (LCP candidates). The hero
// lives in assets/; everything else is below the fold and only loaded
// when the user reaches it, so it gets a sanity ceiling instead.
//
// The hero is served from a <picture> whose webp <source> comes first, so
// the JPEG variants are unreachable for any browser with webp support.
// Budget the format that actually loads, not the dead fallback.
const ABOVE_FOLD_DIR = "public/images/assets";
const PREFERRED_FORMAT = ".webp";

const aboveFold = walk(join(root, ABOVE_FOLD_DIR)).filter(
  (f) => f.endsWith(PREFERRED_FORMAT)
);
for (const f of aboveFold) {
  const size = kb(f);
  if (size > LIMITS.aboveFoldImageKB) {
    failures.push(
      `Above-the-fold image ${size}KB (budget ${LIMITS.aboveFoldImageKB}KB): ${f.slice(
        f.indexOf("public/")
      )}`
    );
  }
}
notes.push(
  `Above-the-fold images: ${aboveFold.length}, largest ${Math.max(
    ...aboveFold.map(kb)
  )}KB / ${LIMITS.aboveFoldImageKB}KB budget`
);

const belowFold = walk(join(root, "public"))
  .filter(
    (f) =>
      !f.includes(ABOVE_FOLD_DIR) && !DEFERRED.has(extname(f).toLowerCase())
  );
const biggest = belowFold.map((f) => ({ f, size: kb(f) })).sort(
  (a, b) => b.size - a.size
)[0];
if (biggest && biggest.size > LIMITS.imageSanityKB) {
  failures.push(
    `Very large below-the-fold image ${biggest.size}KB (ceiling ${LIMITS.imageSanityKB}KB): ${biggest.f.slice(
      biggest.f.indexOf("public/")
    )}`
  );
}

// ── 4. Total public payload ──
const publicMB =
  Math.round(
    (walk(join(root, "public")).reduce((acc, f) => acc + statSync(f).size, 0) /
      1024 /
      1024) *
      10
  ) / 10;
if (publicMB > LIMITS.publicMB) {
  failures.push(`public/ payload is ${publicMB}MB (budget ${LIMITS.publicMB}MB)`);
} else {
  notes.push(`public/ payload: ${publicMB}MB / ${LIMITS.publicMB}MB budget`);
}

// ── Report ──
for (const n of notes) console.log(`  ✓ ${n}`);
for (const f of failures) console.error(`  ✗ ${f}`);

if (failures.length) {
  console.error(`\nperf: ${failures.length} budget(s) breached`);
  process.exit(1);
}
console.log("perf: all budgets met");
