import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/vehicles";

function baseUrl() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://flodesk.ir";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const vehicles = getVehicles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl()}/trucks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl()}/construction`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${baseUrl()}/trucks/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...vehiclePages];
}
