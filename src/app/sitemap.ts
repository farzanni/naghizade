import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/vehicles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const vehicles = getVehicles();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/trucks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/construction`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...vehicles.map((v) => ({
      url: `${SITE_URL}/trucks/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
