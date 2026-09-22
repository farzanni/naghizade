import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

export interface Vehicle {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  videos: string[];
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  available: boolean;
}

const vehiclesDir = join(process.cwd(), "content", "vehicles");

export function getVehicles(): Vehicle[] {
  if (!existsSync(vehiclesDir)) return [];
  const files = readdirSync(vehiclesDir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => {
      const raw = readFileSync(join(vehiclesDir, f), "utf-8");
      return JSON.parse(raw) as Vehicle;
    })
    .sort(
      (a, b) =>
        a.available === b.available ? 0 : a.available ? -1 : 1
    );
}

export function getVehicle(slug: string): Vehicle | null {
  try {
    const raw = readFileSync(join(vehiclesDir, `${slug}.json`), "utf-8");
    return JSON.parse(raw) as Vehicle;
  } catch {
    return null;
  }
}
