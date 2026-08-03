"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The engine's only scroll animation.
 *
 * Keeping Framer Motion confined to this one file means `prefers-reduced-motion`
 * is honoured in exactly one place and can't be forgotten in a new section, and
 * the rest of the library stays as server components.
 *
 * SectionRenderer wraps each section in one of these using branding.animationStyle
 * and branding.revealMotion; sections only reach for it directly when they want
 * a stagger.
 *
 * The keyframes arrive as plain objects rather than this file looking them up in
 * `REVEAL` itself. That is not style: this is a client component, `lib/theme`
 * imports `lib/fonts`, and importing theme here put all fourteen next/font
 * declarations into a browser chunk — same failure mode as the ui.tsx / lib-icon
 * rule, and confirmed by grepping the built chunks for the font registry.
 *
 * `LazyMotion` + `m` rather than the full `motion` component: this engine only
 * ever animates opacity and transform, and loading the whole feature set to do
 * that costs roughly 20 KB gzipped on every client site for nothing.
 */
export function Reveal({
  children,
  initial = { opacity: 0, y: 16 },
  animate = { opacity: 1, y: 0 },
  duration = 0.5,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Start/end keyframes. SectionRenderer builds these from REVEAL in lib/theme.ts. */
  initial?: Record<string, number | string>;
  animate?: Record<string, number | string>;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // animationStyle "none" sets duration to 0 — same path as a reduced-motion user.
  if (reduced || duration === 0) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={initial}
        whileInView={animate}
        // once: never re-animates on scroll-back, which reads as jittery.
        // The negative bottom margin starts the reveal just before the element lands.
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
