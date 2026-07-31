import { Card, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { SiteConfig, TimelineContent } from "@/lib/schema";

/**
 * An ordered list with a marker rail.
 *
 * `marker` holds whatever the content genuinely is — a year for a company
 * history, a time for a service schedule, a step number for a process. It is
 * never decorative numbering, which is why the schema makes it a free string
 * rather than auto-incrementing an index.
 */

type Props = { config: SiteConfig };

export function Timeline({ config }: Props) {
  const timeline = config.timeline;
  if (!timeline) return null;

  return (
    <Section id="timeline" labelledBy="timeline-heading">
      <SectionHeader
        eyebrow={timeline.eyebrow}
        heading={timeline.heading}
        intro={timeline.intro}
        align="center"
        headingId="timeline-heading"
        className="mb-12"
      />
      {timeline.variant === "horizontal" ? (
        <Horizontal timeline={timeline} />
      ) : (
        <Vertical timeline={timeline} />
      )}
    </Section>
  );
}

function Vertical({ timeline }: { timeline: TimelineContent }) {
  return (
    <ol className="mx-auto flex max-w-2xl flex-col">
      {timeline.items.map((item) => (
        <li key={`${item.marker}-${item.title}`} className="flex gap-5 sm:gap-8">
          {/* Rail: dot plus a connector that stops at the last item. */}
          <div className="flex flex-col items-center">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              {item.icon ? (
                <Icon name={item.icon} size={18} />
              ) : (
                <span aria-hidden="true" className="size-2.5 rounded-full bg-current" />
              )}
            </span>
            <span aria-hidden="true" className="w-px grow bg-line last:hidden" />
          </div>

          <div className="pb-10">
            <p className="font-heading text-sm font-bold tracking-wide text-primary uppercase">
              {item.marker}
            </p>
            <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
            {item.description ? <p className="mt-1 text-muted">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Cards on a horizontal scroll rail. Reads as a schedule rather than a history.
 *
 * `relative` keeps position:absolute children (sr-only text, next/image fill)
 * resolving against this rail rather than the page — see Pricing.tsx.
 */
function Horizontal({ timeline }: { timeline: TimelineContent }) {
  return (
    <ol className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
      {timeline.items.map((item) => (
        <li
          key={`${item.marker}-${item.title}`}
          className="w-64 shrink-0 snap-start sm:w-72"
        >
          <Card className="flex h-full flex-col gap-2 p-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              {item.icon ? <Icon name={item.icon} size={20} /> : null}
            </span>
            <p className="font-heading text-sm font-bold tracking-wide text-primary uppercase">
              {item.marker}
            </p>
            <h3 className="text-lg font-bold">{item.title}</h3>
            {item.description ? <p className="text-sm text-muted">{item.description}</p> : null}
          </Card>
        </li>
      ))}
    </ol>
  );
}
