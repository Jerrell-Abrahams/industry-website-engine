import Link from "next/link";

import { Button } from "@/components/ui";
import { getSiteConfig } from "@/lib/site";
import { telHref } from "@/lib/utils";

/**
 * Branded 404.
 *
 * Next's default is an unstyled black-on-white page with no navigation and no
 * way to contact anyone — a dead end on a site sold as finished work. The
 * layout still wraps this, so the navbar, footer and palette come for free;
 * all this adds is the message and a way out.
 */
export default function NotFound() {
  const { business } = getSiteConfig();

  return (
    <div className="container-page flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <p className="font-heading text-6xl font-bold text-primary">404</p>
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">
        We could not find that page
      </h1>
      <p className="max-w-md text-muted">
        It may have moved, or the link may be wrong. You can head back to the homepage, or just
        call us — we would rather talk to you than lose you to a broken link.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Back to the homepage</Button>
        <Button href={telHref(business.phone)} tone="secondary">
          Call {business.phone}
        </Button>
      </div>
      <Link href="/#contact" className="text-sm text-muted underline-offset-4 hover:underline">
        Or send {business.name} a message
      </Link>
    </div>
  );
}
