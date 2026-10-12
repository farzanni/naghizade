import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

/* ════════════════════════════════════════════════════════════
   Vehicle data layer.

   Content lives in /content/vehicles/*.json — one file per
   vehicle. This module is the single place that reads them,
   normalizes them, and answers "what belongs on which page".
   ════════════════════════════════════════════════════════════ */

/** Product group — drives which listing page a vehicle appears on. */
export type VehicleGroup = "trucks" | "machinery";

export interface Vehicle {
  slug: string;
  name: string;
  category: string;
  group: VehicleGroup;
  price: string;
  image: string;
  images: string[];
  videos: string[];
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  available: boolean;
}

/**
 * Category → group mapping.
 *
 * Listing pages filter by group, never by raw category string, so
 * adding a new category to content only requires one line here.
 * Unmapped categories default to "machinery" (see groupForCategory).
 */
const CATEGORY_GROUPS: Record<string, VehicleGroup> = {
  // Trucks & haulage
  کامیون: "trucks",
  کشنده: "trucks",
  کامیونت: "trucks",
  کفی: "trucks",
  کمپرسی: "trucks",
  تانکر: "trucks",
  یخچال‌دار: "trucks",

  // Road-building, mining & agricultural machinery
  "بیل مکانیکی": "machinery",
  لودر: "machinery",
  بلدوزر: "machinery",
  گریدر: "machinery",
  "غلتک و کمپکتور": "machinery",
  "ماشین‌آلات راه‌سازی": "machinery",
  "ماشین ساختمانی": "machinery",
  تراکتور: "machinery",
  لیفتراک: "machinery",
  "جرثقیل": "machinery",
  "ماشین‌آلات معدنی": "machinery",
};

function groupForCategory(category: string): VehicleGroup {
  const key = (category || "").trim();
  return CATEGORY_GROUPS[key] ?? "machinery";
}

const vehiclesDir = join(process.cwd(), "content", "vehicles");

function parseVehicle(raw: string): Vehicle | null {
  try {
    const data = JSON.parse(raw) as Partial<Vehicle>;
    if (!data.slug || !data.name) return null;

    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const primaryImage = data.image || images[0] || "";

    return {
      slug: data.slug,
      name: data.name,
      category: data.category ?? "",
      group: groupForCategory(data.category ?? ""),
      price: data.price ?? "",
      image: primaryImage,
      // Fall back to the primary image so a gallery always has something.
      images: images.length ? images : primaryImage ? [primaryImage] : [],
      videos: Array.isArray(data.videos) ? data.videos.filter(Boolean) : [],
      shortDescription: data.shortDescription ?? "",
      description: data.description ?? "",
      specifications: data.specifications ?? {},
      available: data.available !== false,
    };
  } catch {
    return null;
  }
}

/** All vehicles, available first, then by name.
 *
 *  Cached for the process lifetime: content is static, and every caller
 *  (both listing pages, every detail page, the sitemap) would otherwise
 *  re-read and re-parse every JSON file. */
let allVehicles: Vehicle[] | null = null;

export function getVehicles(): Vehicle[] {
  if (allVehicles) return allVehicles;
  if (!existsSync(vehiclesDir)) return [];

  const files = readdirSync(vehiclesDir).filter((f) => f.endsWith(".json"));

  allVehicles = files
    .map((f) => parseVehicle(readFileSync(join(vehiclesDir, f), "utf-8")))
    .filter((v): v is Vehicle => v !== null)
    .sort((a, b) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      return a.name.localeCompare(b.name, "fa");
    });

  return allVehicles;
}

/** Look up by slug. Goes through getVehicles so a slug can never
 *  escape the content directory via path traversal. */
export function getVehicle(slug: string): Vehicle | null {
  return getVehicles().find((v) => v.slug === slug) ?? null;
}

export function getVehiclesByGroup(group: VehicleGroup): Vehicle[] {
  return getVehicles().filter((v) => v.group === group);
}

/** How many vehicles are in each group — for cross-links between listings. */
export function getGroupCounts(): Record<VehicleGroup, number> {
  const counts: Record<VehicleGroup, number> = { trucks: 0, machinery: 0 };
  for (const v of getVehicles()) counts[v.group] += 1;
  return counts;
}
