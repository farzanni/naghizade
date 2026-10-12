import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/vehicles";
import { SITE_URL } from "@/lib/site";

/* lastmod is deliberately omitted.

   It was previously set to the build time, which made every deploy
   claim all pages had changed — Google distrusts a lastmod that is
   always "now", and it wastes crawl budget. Deriving it from content
   file mtimes does not work either: Vercel's git checkout stamps every
   file with the checkout time, so it resolves to the build time there
   while looking correct locally.

   Google's guidance is to omit lastmod when the date is unknown, so
   that is what we do. Add a per-vehicle `updatedAt` field to the
   content JSON if accurate dates are ever wanted. */
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
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
