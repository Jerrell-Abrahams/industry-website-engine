import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { warnInDev } from "./utils";

/**
 * Renders any Lucide icon by config name, e.g. `icon: "Scissors"`.
 *
 * The namespace import looks alarming for bundle size but this component is
 * only ever used from server components, so the whole library stays on the
 * server and none of it reaches the browser — the icon ships as inline SVG.
 * Client components (Navbar, forms) import their two or three icons by name
 * instead, which does tree-shake.
 *
 * The payoff is that a new client can use any of Lucide's ~1500 icons from
 * config alone, which is the "zero React changes" promise.
 */

/**
 * Lucide dropped brand icons some time ago — WhatsAppButton and
 * GoogleReviewButton already inline their own glyphs for the same reason.
 * Every real site config in `sites/` references one of these four for its
 * `socialLinks`, and until now they all silently rendered nothing: `Icon()`
 * warned "Unknown icon" and returned null. Same fix, applied once here rather
 * than in every config, since every socialLinks icon resolves through this one
 * registry.
 */
function Facebook({ size = 24, ...rest }: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94Z" />
    </svg>
  );
}

function Instagram({ size = 24, ...rest }: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.771 1.153A4.9 4.9 0 0 1 21.474 5.45c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.771 4.9 4.9 0 0 1-1.771 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153 4.9 4.9 0 0 1-1.153-1.771c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.68 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2Zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.371-.06 4.04 0 2.67.01 2.986.06 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.041.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.05-1.055.06-1.371.06-4.041 0-2.67-.01-2.986-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.05-1.371-.06-4.041-.06Zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27Zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  );
}

function Linkedin({ size = 24, ...rest }: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.56V9h3.554v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function Youtube({ size = 24, ...rest }: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

const brandIcons = { Facebook, Instagram, Linkedin, Youtube };

const registry = {
  ...LucideIcons,
  ...brandIcons,
} as unknown as Record<string, ComponentType<LucideProps> | undefined>;

type IconProps = LucideProps & { name?: string };

export function Icon({ name, ...props }: IconProps) {
  if (!name) return null;

  const Component = registry[name];
  if (!Component) {
    warnInDev(`Unknown icon "${name}". See https://lucide.dev/icons for valid names.`);
    return null;
  }

  // Icons sit beside their own text label everywhere in this engine, so they
  // are decorative and must not be announced twice.
  return <Component aria-hidden="true" focusable="false" {...props} />;
}

export function isValidIconName(name: string): boolean {
  return Boolean(registry[name]);
}
