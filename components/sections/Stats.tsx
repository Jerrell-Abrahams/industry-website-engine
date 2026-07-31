import { Card, Section } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { SiteConfig, StatsContent } from "@/lib/schema";

type Props = { config: SiteConfig };

export function Stats({ config }: Props) {
  const stats = config.stats;
  if (!stats) return null;

  return (
    <Section
      id="stats"
      labelledBy={stats.heading ? "stats-heading" : undefined}
      className={stats.variant === "bar" ? "bg-primary text-on-primary" : undefined}
    >
      {stats.heading ? (
        <h2 id="stats-heading" className="mb-10 text-center text-3xl font-bold sm:text-4xl">
          {stats.heading}
        </h2>
      ) : null}

      {stats.variant === "cards" ? <Cards stats={stats} /> : <Bar stats={stats} />}
    </Section>
  );
}

/**
 * A <dl> is the honest element here: each stat is a label/value pair.
 * The visual order is value-then-label, which `flex-col-reverse` gives us
 * without reversing the DOM order a screen reader announces.
 */
function Bar({ stats }: { stats: StatsContent }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse items-center gap-1 text-center">
          <dt className="text-sm tracking-wide opacity-80">{item.label}</dt>
          <dd className="font-heading text-4xl font-bold sm:text-5xl">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Cards({ stats }: { stats: StatsContent }) {
  return (
    <dl className="grid gap-[var(--brand-gap)] sm:grid-cols-2 lg:grid-cols-4">
      {stats.items.map((item) => (
        <Card key={item.label} className="flex flex-col gap-2 p-6">
          {item.icon ? (
            <span className="text-primary">
              <Icon name={item.icon} size={28} />
            </span>
          ) : null}
          <dd className="font-heading text-4xl font-bold text-primary">{item.value}</dd>
          <dt className="text-sm text-muted">{item.label}</dt>
        </Card>
      ))}
    </dl>
  );
}
