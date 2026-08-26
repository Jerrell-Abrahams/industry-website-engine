import { Button, Picture, Section, SectionHeader } from "@/components/ui";
import type { AboutContent, SiteConfig } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Props = { config: SiteConfig };

export function About({ config }: Props) {
  const about = config.about;
  if (!about) return null;

  switch (about.variant) {
    case "stacked":
      return <Stacked about={about} />;
    case "stats-overlay":
      return <StatsOverlay about={about} />;
    case "side-by-side":
    default:
      return <SideBySide about={about} />;
  }
}

function Body({ about, className }: { about: AboutContent; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 text-lg leading-relaxed text-muted", className)}>
      {about.body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

function StatList({ about, onDark = false }: { about: AboutContent; onDark?: boolean }) {
  if (about.stats.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {about.stats.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className={cn("block text-3xl font-bold", onDark ? "text-white" : "text-primary")}>
              {s.value}
            </span>
            <span className={cn("text-sm", onDark ? "text-white/70" : "text-muted")}>{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SideBySide({ about }: { about: AboutContent }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {about.image ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-brand">
            <Picture image={about.image} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          <SectionHeader eyebrow={about.eyebrow} heading={about.heading} headingId="about-heading" />
          <Body about={about} />
          <StatList about={about} />
          {about.cta ? (
            <div>
              <Button href={about.cta.href}>{about.cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function Stacked({ about }: { about: AboutContent }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="flex flex-col items-center gap-8 text-center">
        <SectionHeader
          eyebrow={about.eyebrow}
          heading={about.heading}
          align="center"
          headingId="about-heading"
        />
        <Body about={about} className="max-w-3xl text-center" />
        {about.cta ? <Button href={about.cta.href}>{about.cta.label}</Button> : null}
      </div>
      {about.images.length > 0 ? (
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {about.images.map((img) => (
            <div key={img.src} className="relative aspect-4/3 overflow-hidden rounded-brand">
              <Picture image={img} sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      ) : about.image ? (
        <div className="relative mt-14 aspect-21/9 overflow-hidden rounded-brand">
          <Picture image={about.image} sizes="100vw" />
        </div>
      ) : null}
      <div className="mt-12">
        <StatList about={about} />
      </div>
    </Section>
  );
}

/** Copy sits on a dark panel that overlaps the image — the most "designed" of the three. */
function StatsOverlay({ about }: { about: AboutContent }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="relative">
        {about.image ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-brand sm:aspect-21/9">
            <Picture image={about.image} sizes="100vw" />
            <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
          </div>
        ) : null}

        <div
          className={cn(
            "rounded-brand bg-primary p-8 text-on-primary sm:p-10",
            about.image && "relative z-10 mx-auto -mt-16 w-[92%] lg:-mt-24 lg:w-[80%]",
          )}
        >
          <div className="flex flex-col gap-6">
            {about.eyebrow ? (
              <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-80">
                {about.eyebrow}
              </p>
            ) : null}
            <h2 id="about-heading" className="text-3xl font-bold sm:text-4xl">
              {about.heading}
            </h2>
            <div className="flex flex-col gap-4 text-lg leading-relaxed opacity-90">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <StatList about={about} onDark />
            {about.cta ? (
              <div>
                <Button href={about.cta.href} tone="secondary" className="text-on-primary">
                  {about.cta.label}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
