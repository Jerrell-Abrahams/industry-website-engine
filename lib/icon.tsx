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

const registry = LucideIcons as unknown as Record<string, ComponentType<LucideProps> | undefined>;

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
