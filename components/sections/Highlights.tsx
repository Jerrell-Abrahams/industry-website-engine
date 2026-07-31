import { Card, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { HighlightsContent, SiteConfig } from "@/lib/schema";

/**
 * The spec's "Features" component. It ships as `highlights` because
 * `config.features` is already the feature-flag object and one name for two
 * different things is how config bugs happen.
 */

type Props = { config: SiteConfig };

export function Highlights({ config }: Props) {
  const highlights = config.highlights;
  if (!highlights) return null;

  return (
    <Section id="highlights" labelledBy="highlights-heading" className="bg-surface">
      <SectionHeader
        eyebrow={highlights.eyebrow}
        heading={highlights.heading}
        intro={highlights.intro}
        align="center"
        headingId="highlights-heading"
        className="mb-12"
      />
      {highlights.variant === "numbered" ? (
        <Numbered items={highlights.items} />
      ) : (
        <IconGrid items={highlights.items} />
      )}
    </Section>
  );
}

function IconGrid({ items }: { items: HighlightsContent["items"] }) {
  return (
    <ul className="grid gap-[var(--brand-gap)] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title}>
          <Card className="flex h-full flex-col items-center gap-3 p-6 text-center">
            {item.icon ? (
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name={item.icon} size={26} />
              </span>
            ) : null}
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-muted">{item.description}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered markers are only honest when the content is an actual sequence —
 * a process, an intake flow. Configs that aren't sequential should use icon-grid.
 */
function Numbered({ items }: { items: HighlightsContent["items"] }) {
  return (
    <ol className="grid gap-[var(--brand-gap)] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className="font-heading text-4xl leading-none font-bold text-primary/25"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
