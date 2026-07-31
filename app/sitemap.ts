import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site";

/**
 * These sites are a single page, so the sitemap has one entry.
 *
 * Section anchors are deliberately not listed: `#services` is not a separate
 * URL and submitting it as one is a common way to get a sitemap flagged in
 * Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = getSiteConfig();

  return [
    {
      url: seo.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
