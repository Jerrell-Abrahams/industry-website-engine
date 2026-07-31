import { Card, Picture, Rating, Section, SectionHeader } from "@/components/ui";
import type { SiteConfig, TestimonialsContent } from "@/lib/schema";

import { TestimonialsCarousel } from "./TestimonialsCarousel";

type Props = { config: SiteConfig };

export function Testimonials({ config }: Props) {
  const testimonials = config.testimonials;
  if (!testimonials) return null;

  return (
    <Section id="testimonials" labelledBy="testimonials-heading" className="bg-surface">
      <SectionHeader
        eyebrow={testimonials.eyebrow}
        heading={testimonials.heading}
        align={testimonials.variant === "carousel" ? "left" : "center"}
        headingId="testimonials-heading"
        className="mb-10"
      />

      {testimonials.variant === "grid" ? (
        <Grid testimonials={testimonials} />
      ) : testimonials.variant === "single-featured" ? (
        <SingleFeatured testimonials={testimonials} />
      ) : (
        <TestimonialsCarousel items={testimonials.items} />
      )}
    </Section>
  );
}

function Grid({ testimonials }: { testimonials: TestimonialsContent }) {
  return (
    <ul className="grid gap-[var(--brand-gap)] md:grid-cols-2 lg:grid-cols-3">
      {testimonials.items.map((item) => (
        <li key={item.name}>
          <Card className="flex h-full flex-col gap-4 p-6">
            {item.rating ? <Rating value={item.rating} /> : null}
            <blockquote className="leading-relaxed">“{item.quote}”</blockquote>
            <footer className="mt-auto flex items-center gap-3 pt-2">
              {item.image ? (
                <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                  <Picture image={item.image} sizes="40px" />
                </span>
              ) : null}
              <span className="text-sm">
                <span className="block font-semibold">{item.name}</span>
                {item.role ? <span className="block text-muted">{item.role}</span> : null}
              </span>
            </footer>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/**
 * One large pull-quote, with the rest reduced to a compact credit row.
 * Suits businesses with a handful of strong reviews rather than dozens.
 */
function SingleFeatured({ testimonials }: { testimonials: TestimonialsContent }) {
  const [lead, ...rest] = testimonials.items;

  return (
    <div className="flex flex-col gap-10">
      <figure className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        {lead.rating ? <Rating value={lead.rating} /> : null}
        <blockquote className="font-heading text-2xl leading-snug sm:text-3xl">
          “{lead.quote}”
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {lead.image ? (
            <span className="relative size-12 overflow-hidden rounded-full">
              <Picture image={lead.image} sizes="48px" />
            </span>
          ) : null}
          <span className="text-left text-sm">
            <span className="block font-semibold">{lead.name}</span>
            {lead.role ? <span className="block text-muted">{lead.role}</span> : null}
          </span>
        </figcaption>
      </figure>

      {rest.length > 0 ? (
        <ul className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <li key={item.name} className="flex flex-col gap-2">
              <blockquote className="text-sm leading-relaxed text-muted">“{item.quote}”</blockquote>
              <span className="text-sm font-semibold">{item.name}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
