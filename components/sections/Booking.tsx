import { EnquiryForm } from "@/components/EnquiryForm";
import { Picture, Section, SectionHeader } from "@/components/ui";
import type { SiteConfig } from "@/lib/schema";

import { BookingSteps } from "./BookingSteps";

/**
 * Booking is the enquiry form with a service dropdown and a preferred date/time,
 * not a second form component and not a scheduling backend — the request lands
 * in the client's inbox and they confirm it themselves. `steps` is the one
 * exception that needs client state, so it lives in its own file (BookingSteps.tsx),
 * same precedent as ServicesTabs.tsx.
 */

type Props = { config: SiteConfig };

export function Booking({ config }: Props) {
  const booking = config.booking;
  if (!booking) return null;

  // WhatsApp confirmation link only when the site actually has both the
  // feature and a number — same gate the floating WhatsAppButton uses.
  const whatsappNumber = config.features.whatsapp ? config.business.whatsapp : undefined;

  const sharedProps = {
    submitLabel: booking.submitLabel,
    options: booking.serviceOptions,
    optionsLabel: "Which service?",
    askPreferredTime: booking.askPreferredTime,
    businessHours: config.business.businessHours,
    slotLengthMinutes: booking.slotLengthMinutes,
    whatsappNumber,
    businessName: config.business.name,
  };

  if (booking.variant === "steps") {
    return (
      <Section id="booking" labelledBy="booking-heading">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow={booking.eyebrow}
            heading={booking.heading}
            intro={booking.intro}
            align="center"
            headingId="booking-heading"
            className="mb-10"
          />
          <BookingSteps {...sharedProps} />
        </div>
      </Section>
    );
  }

  const form = <EnquiryForm {...sharedProps} formType="booking" />;

  if (booking.variant === "split") {
    return (
      <Section id="booking" labelledBy="booking-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {booking.image ? (
            <div className="relative aspect-4/5 overflow-hidden rounded-brand">
              <Picture image={booking.image} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          ) : null}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow={booking.eyebrow}
              heading={booking.heading}
              intro={booking.intro}
              headingId="booking-heading"
            />
            {form}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="booking" labelledBy="booking-heading">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          eyebrow={booking.eyebrow}
          heading={booking.heading}
          intro={booking.intro}
          align="center"
          headingId="booking-heading"
          className="mb-10"
        />
        {form}
      </div>
    </Section>
  );
}
