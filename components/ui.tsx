import { Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { SiteImage } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Primitives shared by every section.
 *
 * Visual treatment (radius, shadow, fill vs outline) comes from CSS driven by
 * data attributes on <html>, so none of these take a `branding` prop.
 *
 * This file must NOT import lib/icon. Client components (TestimonialsCarousel,
 * ServicesTabs) import primitives from here, so anything this file pulls in
 * lands in the browser bundle — and lib/icon namespace-imports all ~1500 Lucide
 * icons. That is safe in a server component and a 700 KB mistake in a client one.
 * Icons needed here are imported by name so they tree-shake.
 */

/* ------------------------------------------------------------------ */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  tone?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Renders an anchor when `href` is given, a real <button> otherwise. */
export function Button({
  children,
  href,
  tone = "primary",
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn("btn", tone === "primary" ? "btn-primary" : "btn-secondary", className);

  if (href) {
    // External links get the safe rel; in-page anchors and internal routes don't need it.
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Section shell: the anchor id nav links target, the vertical rhythm from
 * branding.spacingScale, and the page container.
 *
 * `bleed` opts out of the container for full-width sections (hero, marquee).
 */
export function Section({
  id,
  children,
  className,
  bleed = false,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(!bleed && "section-y", className)}>
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card", className)}>{children}</div>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small uppercase label above a heading. Purely typographic — no box. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm font-semibold tracking-[0.18em] text-primary uppercase", className)}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  align = "left",
  className,
  headingId,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={headingId} className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
        {heading}
      </h2>
      {intro ? (
        <p className={cn("max-w-2xl text-lg text-muted", align === "center" && "mx-auto")}>{intro}</p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * next/image wrapper that keeps `alt` mandatory (it comes from config) and
 * forces callers to think about `sizes`, which is what actually drives how
 * many bytes a visitor downloads.
 */
export function Picture({
  image,
  sizes,
  className,
  priority = false,
  fill = true,
  width,
  height,
}: {
  image: SiteImage;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */

/** Star rating. Renders text for screen readers rather than five icon labels. */
export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="sr-only">{value} out of 5 stars</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < value ? "fill-accent text-accent" : "text-line"}
        />
      ))}
    </div>
  );
}
