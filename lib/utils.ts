import type { Business, SiteConfig } from "./schema";

/** Joins class names, dropping falsy ones. */
// ponytail: no clsx/tailwind-merge — nothing here builds conflicting utilities
// at runtime. Add tailwind-merge only if a real conflict shows up.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** `tel:` href — strips spaces and punctuation the display number carries. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatAddress(address: Business["address"]): string {
  return [address.street, address.suburb, address.city, address.province, address.postalCode]
    .filter(Boolean)
    .join(", ");
}

/** Turns `businessHours` into display rows. */
export function formatHours(hours: Business["businessHours"]): Array<{ day: string; value: string }> {
  return hours.map((h) => ({
    day: h.day,
    value: h.closed || !h.opens || !h.closes ? "Closed" : `${h.opens} – ${h.closes}`,
  }));
}

/** Fills `{year}` / `{business}` placeholders in footer legal text. */
export function renderLegal(template: string, businessName: string): string {
  return template
    .replaceAll("{year}", String(new Date().getFullYear()))
    .replaceAll("{business}", businessName);
}

/**
 * Absolute URL for OG tags and sitemap entries, which reject relative paths.
 */
export function absoluteUrl(config: SiteConfig, path: string): string {
  return new URL(path, config.seo.url).toString();
}

/** Dev-only warning; silent in production so a config slip never crashes a client site. */
export function warnInDev(message: string): void {
  if (process.env.NODE_ENV !== "production") console.warn(`[site-engine] ${message}`);
}

/* ------------------------------------------------------------------ *
 * Booking time slots
 * ------------------------------------------------------------------ */

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * The businessHours row matching `date`'s weekday, or undefined if no row
 * covers it. `date` must be built from local getters (never `new Date(isoString)`
 * or `.toISOString()`), or the weekday can shift by a day for visitors west of UTC.
 */
export function businessHoursFor(
  hours: Business["businessHours"],
  date: Date,
): Business["businessHours"][number] | undefined {
  const dayName = DAY_NAMES[date.getDay()];
  return hours.find((h) => h.schemaDays.includes(dayName));
}

/** True when a matched row has no bookable hours — mirrors formatHours()'s own convention. */
export function isRowUnavailable(row: Business["businessHours"][number]): boolean {
  return row.closed || !row.opens || !row.closes;
}

/** "HH:MM" slot start times from `opens` up to (excluding) `closes`, stepped by `intervalMinutes`. */
export function generateTimeSlots(opens: string, closes: string, intervalMinutes: number): string[] {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: string[] = [];
  for (let m = toMinutes(opens); m < toMinutes(closes); m += intervalMinutes) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
}
