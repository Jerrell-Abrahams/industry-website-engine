import { Button, Eyebrow, Picture } from "@/components/ui";
import type { HeroContent, SiteConfig } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Five genuinely different first impressions.
 *
 * The hero does more than any other section to stop two client sites feeling
 * like the same template, which is why it carries the most variants.
 *
 * Note the hero image always sets `priority` — it is the LCP element on every
 * layout here — and the headline is the page's only <h1>.
 */

type Props = { config: SiteConfig };

export function Hero({ config }: Props) {
  const hero = config.hero;
  if (!hero) return null;

  switch (hero.variant) {
    case "split":
      return <Split hero={hero} />;
    case "minimal-centered":
      return <MinimalCentered hero={hero} />;
    case "video":
      return <Video hero={hero} />;
    case "angled":
      return <Angled hero={hero} />;
    case "fullscreen-image":
    default:
      return <FullscreenImage hero={hero} />;
  }
}

/* ------------------------------------------------------------------ *
 * Shared copy block
 * ------------------------------------------------------------------ */

function HeroCopy({
  hero,
  onDark = false,
  size = "lg",
}: {
  hero: HeroContent;
  onDark?: boolean;
  size?: "lg" | "xl";
}) {
  const centered = hero.align === "center";

  return (
    <div className={cn("flex flex-col gap-6", centered && "items-center text-center")}>
      {hero.eyebrow ? (
        <Eyebrow className={onDark ? "text-white/85" : undefined}>{hero.eyebrow}</Eyebrow>
      ) : null}

      <h1
        className={cn(
          "font-bold",
          size === "xl"
            ? "text-4xl sm:text-6xl lg:text-7xl"
            : "text-4xl sm:text-5xl lg:text-6xl",
          onDark && "text-white",
        )}
      >
        {hero.headline}
      </h1>

      {hero.subheadline ? (
        <p
          className={cn(
            "max-w-xl text-lg leading-relaxed sm:text-xl",
            onDark ? "text-white/85" : "text-muted",
            centered && "mx-auto",
          )}
        >
          {hero.subheadline}
        </p>
      ) : null}

      {hero.primaryCta || hero.secondaryCta ? (
        <div className={cn("flex flex-wrap gap-3", centered && "justify-center")}>
          {hero.primaryCta ? (
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          ) : null}
          {hero.secondaryCta ? (
            <Button
              href={hero.secondaryCta.href}
              tone="secondary"
              className={onDark ? "text-white" : undefined}
            >
              {hero.secondaryCta.label}
            </Button>
          ) : null}
        </div>
      ) : null}

      {hero.highlights.length > 0 ? (
        <ul
          className={cn(
            "mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium",
            onDark ? "text-white/75" : "text-muted",
            centered && "justify-center",
          )}
        >
          {hero.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Scrim behind text on image/video heroes. Without it, contrast fails AA on light photos. */
function Overlay({ opacity }: { opacity: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"
      style={{ opacity: opacity / 100 }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Variants
 * ------------------------------------------------------------------ */

function FullscreenImage({ hero }: { hero: HeroContent }) {
  return (
    <section id="hero" className="relative flex min-h-[92svh] items-end overflow-hidden">
      {hero.image ? (
        <>
          <Picture image={hero.image} sizes="100vw" priority />
          <Overlay opacity={hero.overlayOpacity} />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-primary" />
      )}
      <div className="container-page relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <HeroCopy hero={hero} onDark size="xl" />
        </div>
      </div>
    </section>
  );
}

function Split({ hero }: { hero: HeroContent }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-canvas">
      <div className="container-page grid items-center gap-12 pt-32 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-40 lg:pb-24">
        <HeroCopy hero={hero} />
        {hero.image ? (
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-brand lg:aspect-square">
            <Picture image={hero.image} sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MinimalCentered({ hero }: { hero: HeroContent }) {
  return (
    <section id="hero" className="relative bg-canvas">
      <div className="container-page flex flex-col items-center pt-40 pb-24 text-center lg:pt-52 lg:pb-32">
        <div className="max-w-3xl">
          <HeroCopy hero={{ ...hero, align: "center" }} size="xl" />
        </div>
        <span aria-hidden="true" className="mt-16 block h-px w-24 bg-line" />
      </div>
    </section>
  );
}

function Video({ hero }: { hero: HeroContent }) {
  return (
    <section id="hero" className="relative flex min-h-[88svh] items-center overflow-hidden">
      {hero.videoUrl ? (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          // Poster carries the first paint, so the video itself never blocks LCP.
          poster={hero.image?.src}
          aria-hidden="true"
        >
          <source src={hero.videoUrl} />
        </video>
      ) : hero.image ? (
        <Picture image={hero.image} sizes="100vw" priority />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-primary" />
      )}
      <Overlay opacity={hero.overlayOpacity} />
      <div className="container-page relative z-10 py-28">
        <div className={cn("max-w-3xl", hero.align === "center" && "mx-auto")}>
          <HeroCopy hero={hero} onDark size="xl" />
        </div>
      </div>
    </section>
  );
}

function Angled({ hero }: { hero: HeroContent }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-canvas">
      {/* Diagonal image panel on the right; the clip-path is the whole point of
          this variant, so it collapses to a plain stacked block on mobile. */}
      {hero.image ? (
        <div
          className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
          style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <Picture image={hero.image} sizes="55vw" priority />
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        </div>
      ) : null}

      <div className="container-page relative z-10 pt-32 pb-16 lg:pt-44 lg:pb-28">
        <div className="lg:max-w-[46%]">
          <HeroCopy hero={hero} size="xl" />
        </div>
      </div>

      {hero.image ? (
        <div className="relative aspect-video w-full lg:hidden">
          <Picture image={hero.image} sizes="100vw" priority />
        </div>
      ) : null}
    </section>
  );
}
