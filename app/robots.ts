import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { seo } = getSiteConfig();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", seo.url).toString(),
    host: seo.url,
  };
}
