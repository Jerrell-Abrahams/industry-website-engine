import { Button, Card, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { PricingContent, SiteConfig } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Props = { config: SiteConfig };

export function Pricing({ config }: Props) {
  const pricing = config.pricing;
  if (!pricing) return null;

  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeader
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
        align="center"
        headingId="pricing-heading"
        className="mb-12"
      />

      {pricing.variant === "table" ? (
        <Table pricing={pricing} />
      ) : pricing.variant === "simple-list" ? (
        <SimpleList pricing={pricing} />
      ) : (
        <Cards pricing={pricing} />
      )}

      {pricing.note ? (
        <p className="mt-8 text-center text-sm text-muted">{pricing.note}</p>
      ) : null}
    </Section>
  );
}

function Price({ plan }: { plan: PricingContent["plans"][number] }) {
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="font-heading text-4xl font-bold">{plan.price}</span>
      {plan.unit ? <span className="text-sm text-muted">{plan.unit}</span> : null}
    </p>
  );
}

function Cards({ pricing }: { pricing: PricingContent }) {
  return (
    <ul className="grid items-start gap-[var(--brand-gap)] md:grid-cols-3">
      {pricing.plans.map((plan) => (
        <li key={plan.name}>
          <Card
            className={cn(
              "flex h-full flex-col gap-5 p-7",
              // The featured plan gets a ring rather than a scale transform —
              // transforms break the grid baseline and blur text on some GPUs.
              plan.featured && "ring-2 ring-primary",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              {plan.featured ? (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
                  Most popular
                </span>
              ) : null}
            </div>
            <Price plan={plan} />
            {plan.description ? <p className="text-sm text-muted">{plan.description}</p> : null}
            {plan.features.length > 0 ? (
              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {plan.cta ? (
              <div className="mt-auto pt-2">
                <Button
                  href={plan.cta.href}
                  tone={plan.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta.label}
                </Button>
              </div>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}

/**
 * A real <table> with scope'd headers, so screen readers can navigate it by
 * row and column. Wrapped in an overflow container so a wide table scrolls
 * itself instead of the page.
 *
 * `relative` on that container is load-bearing: the sr-only cells below are
 * position:absolute, and without a positioned ancestor they resolve against
 * the initial containing block instead of the scroller. They then sit at the
 * table's full width — past the right edge of a phone — which widens the
 * mobile layout viewport and pushes every position:fixed element (the
 * WhatsApp button) off the screen.
 */
function Table({ pricing }: { pricing: PricingContent }) {
  const featureRows = Array.from(new Set(pricing.plans.flatMap((p) => p.features)));

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">{pricing.heading}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="py-4 pr-4 text-sm font-semibold text-muted">
              Service
            </th>
            {pricing.plans.map((plan) => (
              <th key={plan.name} scope="col" className="px-4 py-4">
                <span className="block text-lg font-bold">{plan.name}</span>
                <span className="block text-sm font-normal text-muted">
                  {plan.price}
                  {plan.unit ? ` ${plan.unit}` : ""}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((feature) => (
            <tr key={feature} className="border-b border-line">
              <th scope="row" className="py-3.5 pr-4 text-sm font-medium">
                {feature}
              </th>
              {pricing.plans.map((plan) => (
                <td key={plan.name} className="px-4 py-3.5">
                  {plan.features.includes(feature) ? (
                    <>
                      <Icon name="Check" size={18} className="text-primary" />
                      <span className="sr-only">Included</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-muted">
                        —
                      </span>
                      <span className="sr-only">Not included</span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Price-list rows. The right shape when plans are services, not tiers. */
function SimpleList({ pricing }: { pricing: PricingContent }) {
  return (
    <ul className="mx-auto flex max-w-2xl flex-col">
      {pricing.plans.map((plan) => (
        <li
          key={plan.name}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line py-5 last:border-b-0"
        >
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <span aria-hidden="true" className="min-w-6 grow border-b border-dotted border-line" />
          <span className="font-heading text-lg font-bold whitespace-nowrap text-primary">
            {plan.price}
            {plan.unit ? <span className="text-sm font-normal text-muted"> {plan.unit}</span> : null}
          </span>
          {plan.description ? (
            <p className="w-full text-sm text-muted">{plan.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
