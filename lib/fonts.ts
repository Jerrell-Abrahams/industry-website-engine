import {
  Archivo,
  DM_Serif_Display,
  Fraunces,
  Inter,
  Jost,
  Lora,
  Merriweather,
  Montserrat,
  Nunito,
  Oswald,
  Playfair_Display,
  Poppins,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";

import { FONT_KEYS, type FontKey } from "./schema";

/**
 * Font registry.
 *
 * next/font cannot load a font from an arbitrary runtime string. The calls are
 * rewritten at build time by an SWC transform, which requires each loader to be
 * called with a literal options object and assigned to a module-scope const —
 * hence the flat block of declarations below rather than a tidier loop or a
 * shared options object.
 *
 * `preload: false` throughout.
 * ponytail: 14 families with preload on would emit 14 <link rel=preload> tags on
 * a page that uses two. If heading text visibly swaps in on LCP, add one manual
 * preload for the active family in app/layout.tsx — don't re-enable all 14.
 *
 * ## Adding a font
 * 1. Import it from `next/font/google` above.
 * 2. Declare a const for it here.
 * 3. Add its key to `FONT_KEYS` in lib/schema.ts.
 * 4. Add an entry to FONTS. TypeScript fails the build if a key has no entry.
 *
 * Static-weight families (DM Serif Display, Poppins) must pass `weight`;
 * variable families omit it and get their whole range.
 */

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-playfair",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: "400",
  variable: "--font-dm-serif",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-source-serif",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-lora",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-merriweather",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-montserrat",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-oswald",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-nunito",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-archivo",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jost",
});

type FontEntry = {
  /** The `.variable` class that defines this font's CSS custom property. */
  variable: string;
  /** The custom property itself, referenced by --brand-font-heading/body. */
  cssVar: string;
  /** Human name, for docs and the template config. */
  label: string;
  category: "serif" | "sans" | "display";
};

export const FONTS: Record<FontKey, FontEntry> = {
  playfair: {
    variable: playfair.variable,
    cssVar: "--font-playfair",
    label: "Playfair Display",
    category: "serif",
  },
  dmSerif: {
    variable: dmSerif.variable,
    cssVar: "--font-dm-serif",
    label: "DM Serif Display",
    category: "serif",
  },
  sourceSerif: {
    variable: sourceSerif.variable,
    cssVar: "--font-source-serif",
    label: "Source Serif 4",
    category: "serif",
  },
  lora: {
    variable: lora.variable,
    cssVar: "--font-lora",
    label: "Lora",
    category: "serif",
  },
  merriweather: {
    variable: merriweather.variable,
    cssVar: "--font-merriweather",
    label: "Merriweather",
    category: "serif",
  },
  fraunces: {
    variable: fraunces.variable,
    cssVar: "--font-fraunces",
    label: "Fraunces",
    category: "display",
  },
  inter: {
    variable: inter.variable,
    cssVar: "--font-inter",
    label: "Inter",
    category: "sans",
  },
  poppins: {
    variable: poppins.variable,
    cssVar: "--font-poppins",
    label: "Poppins",
    category: "sans",
  },
  montserrat: {
    variable: montserrat.variable,
    cssVar: "--font-montserrat",
    label: "Montserrat",
    category: "sans",
  },
  spaceGrotesk: {
    variable: spaceGrotesk.variable,
    cssVar: "--font-space-grotesk",
    label: "Space Grotesk",
    category: "sans",
  },
  oswald: {
    variable: oswald.variable,
    cssVar: "--font-oswald",
    label: "Oswald",
    category: "display",
  },
  nunito: {
    variable: nunito.variable,
    cssVar: "--font-nunito",
    label: "Nunito",
    category: "sans",
  },
  archivo: {
    variable: archivo.variable,
    cssVar: "--font-archivo",
    label: "Archivo",
    category: "sans",
  },
  jost: {
    variable: jost.variable,
    cssVar: "--font-jost",
    label: "Jost",
    category: "sans",
  },
};

/** Every registry key, for docs and the font picker in the template config. */
export const FONT_LABELS = FONT_KEYS.map((k) => `${k} — ${FONTS[k].label} (${FONTS[k].category})`);
