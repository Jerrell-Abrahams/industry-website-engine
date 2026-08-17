"use client";

import { useEffect, useState } from "react";

import type { SiteConfig } from "@/lib/schema";
import { businessHoursFor, isRowUnavailable } from "@/lib/utils";

/**
 * "Open now" / "Closed" beside the opening hours.
 *
 * This is a client component on purpose. Every page in this engine is
 * prerendered at build time, so a server-rendered version would freeze the
 * status as it was on the day you deployed — a site built on a Tuesday
 * afternoon would cheerfully claim "Open now" at 2am on Sunday.
 *
 * The clock is pinned to the business's timezone rather than the visitor's.
 * A customer browsing from London is asking whether the shop in Cape Town is
 * open now, not whether it would be open in London.
 */

const TIME_ZONE = "Africa/Johannesburg";

/** A Date whose *local* getters read as the wall clock in TIME_ZONE. */
function nowInBusinessTimezone(): Date {
  const parts = new Intl.DateTimeFormat("en-ZA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // h23 rather than hour12:false — the latter reports midnight as "24" in
    // some engines, which rolls the date forward by a day.
    hourCycle: "h23",
  }).formatToParts(new Date());

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);

  return new Date(
    part("year"),
    part("month") - 1,
    part("day"),
    part("hour"),
    part("minute"),
  );
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function OpenNowBadge({ hours }: { hours: SiteConfig["business"]["businessHours"] }) {
  // Undefined until mounted: the server has no meaningful "now", so rendering
  // nothing on the first pass keeps the markup identical on both sides.
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const check = () => {
      const now = nowInBusinessTimezone();
      const row = businessHoursFor(hours, now);
      if (!row || isRowUnavailable(row) || !row.opens || !row.closes) return setOpen(false);

      const current = now.getHours() * 60 + now.getMinutes();
      // ponytail: treats closes <= opens as a data error rather than an
      // overnight shift. Add midnight-spanning handling if a client ever
      // trades past 00:00.
      setOpen(current >= toMinutes(row.opens) && current < toMinutes(row.closes));
    };

    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (open === undefined) return null;

  return (
    <span
      className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        open ? "bg-green-600/10 text-green-700" : "bg-neutral-500/10 text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${open ? "bg-green-600" : "bg-neutral-500"}`}
      />
      {open ? "Open now" : "Closed"}
    </span>
  );
}
