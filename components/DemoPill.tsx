import { AGENCY, agencyHref } from "@/lib/utils";

/**
 * "Demo site" badge, shown on every site whose config has `demo: true`.
 *
 * Bottom-left rather than bottom-right: the floating WhatsApp button owns the
 * right corner, and on a narrow phone the two would sit on top of each other.
 *
 * Deliberately not themed with the client palette — a prospect has to read this
 * as an overlay from the agency, not as part of the business's own design.
 */
export function DemoPill({ siteId }: { siteId: string }) {
  return (
    <a
      href={agencyHref(siteId)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-40 rounded-full bg-neutral-900/85 px-3.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-neutral-900"
    >
      Demo site
      <span className="ml-1.5 opacity-70">{`· built by ${AGENCY.name}`}</span>
    </a>
  );
}
