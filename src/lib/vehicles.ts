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
    const data = JSON.parse(raw) as Partial<Vehicle> & { category?: string };
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
      // Ensure the primary image is always first and never duplicated.
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

/** All vehicles, available first, then by name. */
export function getVehicles(): Vehicle[] {
  if (!existsSync(vehiclesDir)) return [];

  const files = readdirSync(vehiclesDir).filter((f) => f.endsWith(".json"));

  return files
    .map((f) => parseVehicle(readFileSync(join(vehiclesDir, f), "utf-8")))
    .filter((v): v is Vehicle => v !== null)
    .sort((a, b) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      return a.name.localeCompare(b.name, "fa");
    });
}

export function getVehicle(slug: string): Vehicle | null {
  try {
    const raw = readFileSync(join(vehiclesDir, `${slug}.json`), "utf-8");
    return parseVehicle(raw);
  } catch {
    return null;
  }
}

export function getVehiclesByGroup(group: VehicleGroup): Vehicle[] {
  return getVehicles().filter((v) => v.group === group);
}
