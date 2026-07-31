import { Button, Card, Picture, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { ServicesContent, SiteConfig } from "@/lib/schema";
import { cn } from "@/lib/utils";

import { ServicesTabs } from "./ServicesTabs";

/**
 * Four layouts for the same data.
 *
 * `list` in particular is what lets a restaurant render a menu and a barber
 * render a price list from an identical `services.items` array.
 */

type Props = { config: SiteConfig };

export function Services({ config }: Props) {
  const services = config.services;
  if (!services) return null;

  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeader
        eyebrow={services.eyebrow}
        heading={services.heading}
        intro={services.intro}
        align={services.variant === "grid" || services.variant === "list" ? "center" : "left"}
        headingId="services-heading"
        className="mb-12"
      />

      {services.variant === "alternating" ? (
        <Alternating services={services} />
      ) : services.variant === "tabs" ? (
        <ServicesTabs items={services.items} />
      ) : services.variant === "list" ? (
        <List services={services} />
      ) : (
        <Grid services={services} />
      )}

      {services.cta ? (
        <div className="mt-12 flex justify-center">
          <Button href={services.cta.href}>{services.cta.label}</Button>
        </div>
      ) : null}
    </Section>
  );
}

function Grid({ services }: { services: ServicesContent }) {
  return (
    <ul className="grid gap-[var(--brand-gap)] sm:grid-cols-2 lg:grid-cols-3">
      {services.items.map((item) => (
        <li key={item.title}>
          <Card className="flex h-full flex-col gap-4 p-6">
            {item.icon ? (
              <span className="flex size-12 items-center justify-center rounded-brand bg-primary/10 text-primary">
                <Icon name={item.icon} size={24} />
              </span>
            ) : null}
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
            {item.points.length > 0 ? (
              <ul className="flex flex-col gap-1.5 text-sm text-muted">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            {item.price ? (
              <p className="mt-auto pt-2 text-lg font-bold text-primary">{item.price}</p>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** Image/copy rows that flip sides — reads as an editorial feature, not a card grid. */
function Alternating({ services }: { services: ServicesContent }) {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {services.items.map((item, i) => (
        <article key={item.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {item.image ? (
            <div
              className={cn(
                "relative aspect-4/3 overflow-hidden rounded-brand",
                i % 2 === 1 && "lg:order-2",
              )}
            >
              <Picture image={item.image} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          ) : null}

          <div className="flex flex-col gap-4">
            {item.icon ? (
              <span className="flex size-12 items-center justify-center rounded-brand bg-primary/10 text-primary">
                <Icon name={item.icon} size={24} />
              </span>
            ) : null}
            <h3 className="text-2xl font-bold sm:text-3xl">{item.title}</h3>
            <p className="text-lg text-muted">{item.description}</p>
            {item.points.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Icon name="Check" size={18} className="mt-1 shrink-0 text-primary" />
                    <span className="text-muted">{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.price ? <p className="text-lg font-bold text-primary">{item.price}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Menu-style rows with a leader rule between name and price.
 * The rule is a flex spacer with a dotted border, so it reflows at any width.
 *
 * `flex-wrap` is load-bearing: the price is whitespace-nowrap so a figure like
 * "R4 500" never breaks mid-number, which means a wordy price ("Quoted on
 * assessment") cannot shrink either. Without wrapping it pushes the row past
 * the viewport on a phone. Same shape as Pricing's SimpleList.
 */
function List({ services }: { services: ServicesContent }) {
  return (
    <ul className="mx-auto flex max-w-3xl flex-col">
      {services.items.map((item) => (
        <li key={item.title} className="border-b border-line py-6 last:border-b-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <span aria-hidden="true" className="min-w-6 grow border-b border-dotted border-line" />
            {item.price ? (
              <span className="text-lg font-bold whitespace-nowrap text-primary">{item.price}</span>
            ) : null}
          </div>
          <p className="mt-2 max-w-prose text-muted">{item.description}</p>
          {item.points.length > 0 ? (
            <p className="mt-2 text-sm text-muted/80 italic">{item.points.join(" · ")}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
