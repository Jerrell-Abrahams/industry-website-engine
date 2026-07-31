import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Placeholder artwork is generated as SVG (scripts/gen-placeholders.mjs) so
     * builds never depend on a network image service and never ship binary blobs
     * we can't diff.
     *
     * next/image refuses to optimise SVG by default because an SVG can carry
     * script. These settings are Next's documented hardening for when you do
     * allow it: the response is served as an attachment, under a CSP that blocks
     * scripting entirely.
     *
     * Once a client's real photography lands in /public/<siteId>/, this block can
     * be removed from their deployment.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
