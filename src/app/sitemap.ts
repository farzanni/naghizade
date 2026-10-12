import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/vehicles";
import { SITE_URL } from "@/lib/site";

/* lastmod reflects real content changes, not the build time.
   An always-"now" lastmod is distrusted by Google and wastes crawl
   budget, so static pages omit it and vehicle pages use their content
   file's modification date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const vehicles = getVehicles();

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/machinery`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...vehicles.map((v) => ({
      url: `${SITE_URL}/machinery/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
