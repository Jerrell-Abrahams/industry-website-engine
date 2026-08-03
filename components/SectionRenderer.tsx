import type { ComponentType } from "react";

import { Reveal } from "@/components/Reveal";
import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Partners } from "@/components/sections/Partners";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { SECTION_FLAG, type SectionId, type SiteConfig } from "@/lib/schema";
import { MOTION, REVEAL } from "@/lib/theme";
import { warnInDev } from "@/lib/utils";

/**
 * Renders `config.layout` in order.
 *
 * Two rules make the whole multi-tenant idea work:
 *  - a section whose feature flag is off is skipped even when it is listed in
 *    `layout`, so turning a feature off never means editing the layout array;
 *  - an unknown id warns in dev and renders nothing in production, so a typo in
 *    a config can never take a paying client's site down.
 */

const SECTIONS: Record<SectionId, ComponentType<{ config: SiteConfig }>> = {
  hero: Hero,
  about: About,
  services: Services,
  highlights: Highlights,
  gallery: Gallery,
  stats: Stats,
  pricing: Pricing,
  testimonials: Testimonials,
  team: Team,
  faq: Faq,
  timeline: Timeline,
  partners: Partners,
  booking: Booking,
  contact: Contact,
  cta: Cta,
};

export function SectionRenderer({ config }: { config: SiteConfig }) {
  const motion = MOTION[config.branding.animationStyle];
  // Resolved here rather than inside Reveal so that client component never has
  // to import lib/theme — see the note in Reveal.tsx.
  const reveal = REVEAL[config.branding.revealMotion](motion.y);

  return (
    <>
      {config.layout.map((id, index) => {
        const Section = SECTIONS[id];

        if (!Section) {
          warnInDev(`Unknown section "${id}" in layout — skipping. Valid ids: ${Object.keys(SECTIONS).join(", ")}`);
          return null;
        }

        const flag = SECTION_FLAG[id];
        if (flag && !config.features[flag]) return null;

        // The first section is above the fold: revealing it would delay the LCP
        // text and animate something the visitor is already looking at.
        if (index === 0) return <Section key={id} config={config} />;

        return (
          <Reveal
            key={id}
            initial={reveal.from}
            animate={reveal.to}
            duration={motion.duration}
          >
            <Section config={config} />
          </Reveal>
        );
      })}
    </>
  );
}
