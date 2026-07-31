import Image from "next/image";

import { Button } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { SiteConfig } from "@/lib/schema";
import { cn, formatAddress, renderLegal, telHref } from "@/lib/utils";

type Props = { config: SiteConfig };

export function Footer({ config }: Props) {
  const { footer } = config;

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      {footer.variant === "cta-heavy" && footer.cta ? <FooterCta config={config} /> : null}

      <div className="container-page py-14">
        {footer.variant === "minimal" ? <Minimal config={config} /> : <Columns config={config} />}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-sm text-muted sm:flex-row">
          <p>{renderLegal(footer.legal, config.business.name)}</p>
          <Socials config={config} />
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

function FooterCta({ config }: Props) {
  const { footer } = config;
  return (
    <div className="bg-primary text-on-primary">
      <div className="container-page flex flex-col items-center gap-5 py-14 text-center">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
          {footer.ctaHeading ?? config.business.tagline}
        </h2>
        {footer.blurb ? <p className="max-w-xl opacity-90">{footer.blurb}</p> : null}
        {footer.cta ? (
          <Button href={footer.cta.href} tone="secondary" className="border-current text-on-primary">
            {footer.cta.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * `centered` is not cosmetic sugar for text-align. The blurb is capped at
 * max-w-sm while the address line runs wider, so under the default
 * `align-items: stretch` the paragraph's box sits flush left inside a wider
 * container — inherited `text-center` centres the text within that box and the
 * box itself still looks off-centre. `items-center` centres the boxes.
 */
function Brand({ config, centered = false }: Props & { centered?: boolean }) {
  const { business, footer } = config;
  return (
    <div className={cn("flex flex-col gap-4", centered && "items-center")}>
      {business.logo ? (
        <Image
          src={business.logo.src}
          alt={business.logo.alt}
          width={160}
          height={40}
          className="h-9 w-auto"
        />
      ) : (
        <span className="font-heading text-xl font-bold">{business.name}</span>
      )}
      {footer.blurb ? <p className="max-w-sm text-sm text-muted">{footer.blurb}</p> : null}
      <address className="flex flex-col gap-1.5 text-sm text-muted not-italic">
        <a href={telHref(business.phone)} className="hover:text-primary">
          {business.phone}
        </a>
        <a href={`mailto:${business.email}`} className="hover:text-primary">
          {business.email}
        </a>
        <span>{formatAddress(business.address)}</span>
      </address>
    </div>
  );
}

function Columns({ config }: Props) {
  const { footer, features } = config;
  const showNewsletter = features.newsletter && footer.newsletterHeading;

  return (
    <div
      className={cn(
        "grid gap-10",
        showNewsletter ? "lg:grid-cols-[1.5fr_repeat(2,1fr)_1.5fr]" : "lg:grid-cols-[1.5fr_repeat(3,1fr)]",
      )}
    >
      <Brand config={config} />

      {footer.columns.map((column) => (
        <nav key={column.heading} aria-label={column.heading}>
          <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">{column.heading}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {column.links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="text-muted hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}

      {showNewsletter ? <Newsletter config={config} /> : null}
    </div>
  );
}

function Minimal({ config }: Props) {
  const { footer } = config;
  const links = footer.columns.flatMap((c) => c.links);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Brand config={config} centered />
      {links.length > 0 ? (
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="text-muted hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

/**
 * Newsletter signup.
 *
 * ponytail: posts straight to the client's own mailing-list provider via the
 * action URL in config, so the engine stores no subscriber data and needs no
 * database. Wire it to a server action when a client actually needs double
 * opt-in.
 */
function Newsletter({ config }: Props) {
  const { footer } = config;
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-wide uppercase">{footer.newsletterHeading}</h3>
      {footer.newsletterBody ? (
        <p className="text-sm text-muted">{footer.newsletterBody}</p>
      ) : null}
      <form
        action={`mailto:${config.business.email}`}
        method="post"
        encType="text/plain"
        className="flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="min-h-11 w-full rounded-brand border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button type="submit" className="btn btn-primary px-4 py-2 text-sm">
          Subscribe
        </button>
      </form>
    </div>
  );
}

function Socials({ config }: Props) {
  const { socialLinks } = config.business;
  if (socialLinks.length === 0) return null;

  return (
    <ul className="flex gap-1">
      {socialLinks.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full transition-colors hover:text-primary"
          >
            <Icon name={social.icon} size={18} />
            <span className="sr-only">
              {config.business.name} on {social.platform}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
