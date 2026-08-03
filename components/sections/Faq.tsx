import { ChevronDown } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import type { SiteConfig } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Accordion built on native <details>/<summary>.
 *
 * This is deliberately not a headless accordion component. The native element
 * is already keyboard-operable, announces its expanded state to screen readers,
 * and is findable by in-page browser search when collapsed — all things a
 * div-and-useState version has to reimplement and usually gets wrong.
 * It also ships zero JavaScript.
 */

type Props = { config: SiteConfig };

export function Faq({ config }: Props) {
  const faq = config.faq;
  if (!faq) return null;

  const sidebar = faq.variant === "sidebar";

  const header = (
    <SectionHeader
      eyebrow={faq.eyebrow}
      heading={faq.heading}
      intro={faq.intro}
      align={faq.variant === "single-column" ? "center" : "left"}
      headingId="faq-heading"
      // Sticky only where there is a column beside it to scroll past.
      className={sidebar ? "lg:sticky lg:top-28" : "mb-10"}
    />
  );

  const questions = (
    <div
      // `|| undefined` so the sidebar variant, which wants no wrapper classes
      // at all, does not render a bare class="".
      className={
        cn(
          faq.variant === "two-column" && "grid gap-x-10 gap-y-0 md:grid-cols-2",
          faq.variant === "single-column" && "mx-auto max-w-3xl",
        ) || undefined
      }
    >
      {faq.items.map((item) => (
        <details key={item.question} name="faq" className="group border-b border-line py-1">
          <summary className="flex min-h-11 items-center justify-between gap-4 py-4 text-left font-semibold">
            <span>{item.question}</span>
            <ChevronDown size={20} aria-hidden="true" className="faq-marker shrink-0 text-primary" />
          </summary>
          <p className="pb-5 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );

  return (
    <Section id="faq" labelledBy="faq-heading">
      {sidebar ? (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>{header}</div>
          {questions}
        </div>
      ) : (
        <>
          {header}
          {questions}
        </>
      )}
    </Section>
  );
}
