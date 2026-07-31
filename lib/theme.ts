import type { CSSProperties } from "react";

import { FONTS } from "./fonts";
import type { Branding } from "./schema";

/**
 * Turns `branding` into the CSS custom properties the whole site reads.
 *
 * These are set once on <html> in the root layout, server-rendered, so there is
 * no theme context, no client JS and no flash of the wrong palette.
 * app/globals.css maps each `--brand-*` into Tailwind's namespace via
 * `@theme inline`, which is what makes `bg-primary` retint per client.
 */

const RADIUS: Record<Branding["borderRadius"], string> = {
  none: "0px",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.875rem",
  xl: "1.5rem",
  full: "9999px",
};

const SHADOW: Record<Branding["shadowStyle"], string> = {
  none: "none",
  soft: "0 1px 2px rgb(0 0 0 / 0.04), 0 12px 32px -8px rgb(0 0 0 / 0.12)",
  hard: "0 2px 0 0 rgb(0 0 0 / 0.85)",
};

/** Vertical rhythm between sections — the biggest single lever on how a site "feels". */
const SECTION_SPACE: Record<Branding["spacingScale"], { y: string; gap: string }> = {
  compact: { y: "3.5rem", gap: "1.5rem" },
  normal: { y: "5.5rem", gap: "2rem" },
  spacious: { y: "8rem", gap: "3rem" },
};

/** Scroll-reveal distance and duration. `none` is also forced by prefers-reduced-motion. */
export const MOTION: Record<Branding["animationStyle"], { y: number; duration: number }> = {
  none: { y: 0, duration: 0 },
  subtle: { y: 16, duration: 0.5 },
  lively: { y: 32, duration: 0.7 },
};

export function themeStyle(branding: Branding): CSSProperties {
  const space = SECTION_SPACE[branding.spacingScale];

  return {
    "--brand-primary": branding.primaryColor,
    "--brand-secondary": branding.secondaryColor,
    "--brand-accent": branding.accentColor,
    "--brand-bg": branding.neutral.bg,
    "--brand-surface": branding.neutral.surface,
    "--brand-border": branding.neutral.border,
    "--brand-text": branding.neutral.text,
    "--brand-muted": branding.neutral.textMuted,
    "--brand-on-primary": branding.neutral.onPrimary,

    "--brand-radius": RADIUS[branding.borderRadius],
    "--brand-shadow": SHADOW[branding.shadowStyle],
    "--brand-section-y": space.y,
    "--brand-gap": space.gap,
    "--brand-heading-transform": branding.headingTransform === "uppercase" ? "uppercase" : "none",
    "--brand-heading-tracking": branding.headingTransform === "uppercase" ? "0.06em" : "-0.01em",

    "--brand-font-heading": `var(${FONTS[branding.fontHeading].cssVar})`,
    "--brand-font-body": `var(${FONTS[branding.fontBody].cssVar})`,
  } as CSSProperties;
}

/** Both font `.variable` classes for <html>. The same key twice is harmless. */
export function fontClasses(branding: Branding): string {
  return `${FONTS[branding.fontHeading].variable} ${FONTS[branding.fontBody].variable}`;
}

/**
 * `buttonStyle` and `cardStyle` are applied as data attributes on <html> and
 * resolved by CSS in globals.css.
 *
 * The alternative was threading `branding` into every Button and Card in the
 * library. The cascade already solves this, so it does it.
 */
export function themeAttributes(branding: Branding) {
  return {
    "data-button-style": branding.buttonStyle,
    "data-card-style": branding.cardStyle,
    "data-shadow": branding.shadowStyle,
  };
}
