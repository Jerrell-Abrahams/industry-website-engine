import { EnquiryForm } from "@/components/EnquiryForm";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { Card, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { ContactContent, SiteConfig } from "@/lib/schema";
import { formatAddress, formatHours, telHref } from "@/lib/utils";

type Props = { config: SiteConfig };

export function Contact({ config }: Props) {
  const contact = config.contact;
  if (!contact) return null;

  const { business, features } = config;
  const centered = contact.variant === "centered";

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-surface">
      <SectionHeader
        eyebrow={contact.eyebrow}
        heading={contact.heading}
        intro={contact.intro}
        align={centered ? "center" : "left"}
        headingId="contact-heading"
        className="mb-12"
      />

      {contact.variant === "full-form" ? (
        <div className="mx-auto max-w-2xl">
          <Details config={config} compact />
          <div className="mt-8">
            <Form contact={contact} />
          </div>
        </div>
      ) : contact.variant === "centered" ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          <Details config={config} />
          <Form contact={contact} />
        </div>
      ) : (
        // split-map: details + form on the left, embedded map on the right.
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <Details config={config} />
            <Form contact={contact} />
          </div>
          {features.map && business.googleMapsEmbedUrl ? (
            // Not sticky: SectionRenderer wraps sections in a motion div, and a
            // transformed ancestor silently kills position:sticky.
            <div className="min-h-80 overflow-hidden rounded-brand border border-line">
              <Map url={business.googleMapsEmbedUrl} name={business.name} />
            </div>
          ) : null}
        </div>
      )}

      {/* The non-split variants still get a map when the flag is on. */}
      {features.map && business.googleMapsEmbedUrl && contact.variant !== "split-map" ? (
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-brand border border-line">
          <Map url={business.googleMapsEmbedUrl} name={business.name} />
        </div>
      ) : null}
    </Section>
  );
}

function Form({ contact }: { contact: ContactContent }) {
  return (
    <div>
      {contact.formHeading ? (
        <h3 className="mb-5 text-xl font-bold">{contact.formHeading}</h3>
      ) : null}
      <EnquiryForm submitLabel={contact.submitLabel} options={contact.subjectOptions} />
    </div>
  );
}

/**
 * Google Maps embed in a plain iframe — no API key, no billing account, no
 * client-side maps library. `loading="lazy"` keeps it off the critical path.
 */
function Map({ url, name }: { url: string; name: string }) {
  return (
    <iframe
      src={url}
      title={`Map showing the location of ${name}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full min-h-80 w-full border-0"
    />
  );
}

function Details({ config, compact = false }: { config: SiteConfig; compact?: boolean }) {
  const { business } = config;
  const hours = formatHours(business.businessHours);

  const rows = [
    { icon: "Phone", label: "Phone", value: business.phone, href: telHref(business.phone) },
    { icon: "Mail", label: "Email", value: business.email, href: `mailto:${business.email}` },
    {
      icon: "MapPin",
      label: "Address",
      value: formatAddress(business.address),
      href: business.googleMapsUrl,
    },
  ];

  return (
    <div className={compact ? "grid gap-4 sm:grid-cols-3" : "flex flex-col gap-6"}>
      <ul className={compact ? "contents" : "flex flex-col gap-4"}>
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name={row.icon} size={18} />
            </span>
            <span className="text-sm">
              <span className="block font-semibold">{row.label}</span>
              {row.href ? (
                <a
                  href={row.href}
                  className="text-muted underline-offset-4 hover:text-primary hover:underline"
                  {...(row.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-muted">{row.value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {!compact && hours.length > 0 ? (
        <Card className="p-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <Icon name="Clock" size={18} className="text-primary" />
            Opening hours
            {config.features.openNowBadge ? (
              <OpenNowBadge hours={business.businessHours} />
            ) : null}
          </h3>
          <dl className="flex flex-col gap-1.5 text-sm">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt className="text-muted">{h.day}</dt>
                <dd className="font-medium">{h.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ) : null}
    </div>
  );
}
