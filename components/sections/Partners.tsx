import { Picture, Section } from "@/components/ui";
import type { PartnersContent, SiteConfig } from "@/lib/schema";

type Props = { config: SiteConfig };

export function Partners({ config }: Props) {
  const partners = config.partners;
  if (!partners) return null;

  return (
    <Section
      id="partners"
      labelledBy={partners.heading ? "partners-heading" : undefined}
      bleed={partners.variant === "marquee"}
      className={partners.variant === "marquee" ? "section-y overflow-hidden" : undefined}
    >
      {partners.heading ? (
        <div className={partners.variant === "marquee" ? "container-page" : undefined}>
          <h2
            id="partners-heading"
            className="mb-10 text-center text-sm font-semibold tracking-[0.18em] text-muted uppercase"
          >
            {partners.heading}
          </h2>
        </div>
      ) : null}

      {partners.variant === "marquee" ? (
        <Marquee partners={partners} />
      ) : (
        <Grid partners={partners} />
      )}
    </Section>
  );
}

/**
 * CSS-only marquee: the list is duplicated and the track translates -50%, so
 * the loop is seamless. The duplicate is aria-hidden so screen readers hear
 * each logo once. Animation is disabled under prefers-reduced-motion in globals.css.
 */
function Marquee({ partners }: { partners: PartnersContent }) {
  return (
    <div className="relative flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 ? "true" : undefined}
          className="marquee-track flex shrink-0 items-center gap-14 pr-14"
        >
          {partners.logos.map((logo) => (
            <li key={logo.src} className="shrink-0">
              <Picture
                image={logo}
                fill={false}
                width={160}
                height={64}
                sizes="160px"
                className="h-12 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function Grid({ partners }: { partners: PartnersContent }) {
  return (
    <ul className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {partners.logos.map((logo) => (
        <li key={logo.src} className="flex justify-center">
          <Picture
            image={logo}
            fill={false}
            width={160}
            height={64}
            sizes="160px"
            className="h-12 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
