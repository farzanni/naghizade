import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* No `host` directive: it is a Yandex-only extension that Google
   ignores, and a non-standard line is noise for every other crawler. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
