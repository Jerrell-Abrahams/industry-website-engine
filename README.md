# Industry Website Engine

A website engine that makes custom industry templates for businesses.

One Next.js application renders any number of client websites. Each site is
defined entirely by a single configuration file — copy, colours, fonts, layout,
section order and feature flags. There is no per-client React.

A new client goes live in under thirty minutes: copy a config, fill it in, drop
in photos, create a Vercel project, deploy.

---

## Quick start

```bash
npm install
cp .env.example .env.local          # sets NEXT_PUBLIC_SITE
npm run placeholders                # generate artwork for every config
NEXT_PUBLIC_SITE=restaurant npm run dev
```

Switch site by changing the variable:

```bash
NEXT_PUBLIC_SITE=barber   npm run dev
NEXT_PUBLIC_SITE=church   npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server for the site named by `NEXT_PUBLIC_SITE` |
| `npm run build` | Production build of that one site |
| `npm run validate` | Schema, WCAG contrast and distinctiveness across **all** configs |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run placeholders` | Regenerate placeholder SVGs from every config's palette |
| `npm run check` | validate → typecheck → build |

---

## Architecture

```
app/
  layout.tsx        theme vars on <html>, fonts, metadata, JSON-LD, nav, footer
  page.tsx          SectionRenderer over config.layout
  actions.ts        server action for the contact / booking form
  sitemap.ts robots.ts globals.css
components/
  SectionRenderer.tsx   maps section ids to components, applies feature flags
  ui.tsx                Button, Card, Badge, Eyebrow, Section, SectionHeader, Picture, Rating
  Reveal.tsx            the engine's only scroll animation
  Navbar.tsx Footer.tsx WhatsAppButton.tsx EnquiryForm.tsx
  sections/             one file per section, variants as siblings inside it
lib/
  schema.ts   the Zod schema — the single source of truth
  site.ts     getSiteConfig(): reads the env var, validates, memoises
  fonts.ts    the font registry
  theme.ts    branding → CSS custom properties
  icon.tsx    renders any Lucide icon by config name (server components only)
  jsonld.tsx  Schema.org LocalBusiness + FAQPage
sites/
  index.ts             the registry
  _template.config.ts  copy this for a new client
  <id>.config.ts       one per client
scripts/
  validate-sites.mjs   the check that covers every config at once
  gen-placeholders.mjs branded placeholder artwork
public/<id>/           that site's images
```

### How a site is selected

`NEXT_PUBLIC_SITE` is read at build time. `getSiteConfig()` looks the id up in
`sites/index.ts`, validates it with Zod, and throws a message naming the valid
ids if it is missing or invalid.

`sites/index.ts` is a static map rather than a dynamic `import()` of a
template-literal path, so a missing or misspelled site is a compile error rather
than a runtime 500 on a live client deployment.

### Theming

`branding` is written onto `<html>` as CSS custom properties during server
rendering. `app/globals.css` maps them into Tailwind's namespace with
`@theme inline`, so `bg-primary`, `rounded-brand` and `font-heading` retint per
client with no rebuild of the CSS pipeline and no client JavaScript.

`buttonStyle` and `cardStyle` are applied as `data-*` attributes on `<html>` and
resolved by CSS. That is why no component takes a `branding` prop.

### Feature flags

A section listed in `layout` whose flag is off is skipped by the renderer. You
never edit the layout array to turn a feature off. `sites/attorney.config.ts` is
the worked example: gallery, testimonials, pricing, booking, WhatsApp and
newsletter are all off, and no code changes to achieve it.

### Variants

Every major section supports several genuinely different layouts, chosen in
config. This — not the colour system — is what stops two client sites reading as
the same template recoloured.

| Section | Variants |
| --- | --- |
| hero | `fullscreen-image` `split` `minimal-centered` `video` `angled` |
| about | `side-by-side` `stacked` `stats-overlay` |
| services | `grid` `alternating` `tabs` `list` |
| highlights | `icon-grid` `numbered` |
| gallery | `masonry` `grid` `filmstrip` |
| stats | `bar` `cards` |
| pricing | `cards` `table` `simple-list` |
| testimonials | `carousel` `grid` `single-featured` |
| team | `grid` `rows` |
| faq | `single-column` `two-column` |
| timeline | `vertical` `horizontal` |
| partners | `marquee` `grid` |
| booking | `centered` `split` |
| contact | `split-map` `centered` `full-form` |
| cta | `banner` `split` |
| navbar | `solid` `transparent-overlay` `centered-logo` |
| footer | `columns` `minimal` `cta-heavy` |

`npm run validate` fails if two client sites share the same **hero + services**
pair, because that combination is what determines a site's structural feel.

---

## Creating a new client site

```bash
cp sites/_template.config.ts sites/newclient.config.ts
```

1. Rename the export to `newclientConfig` and set `id: "newclient"`.
2. Register it in `sites/index.ts` — `newclient: newclientConfig,`
3. Fill in the config. `_template.config.ts` is commented throughout; every
   visible string on the site comes from this file.
4. `npm run placeholders` — generates correctly-proportioned artwork in
   `/public/newclient/` tinted from that client's own palette.
5. `npm run validate` — schema, contrast and distinctiveness.
6. `NEXT_PUBLIC_SITE=newclient npm run dev`
7. Replace the generated SVGs in `/public/newclient/` with the client's real
   photographs. Match the ratios listed in the template and nothing shifts.
8. Deploy (below).

### Real photography

`npm run placeholders` generates branded gradient SVGs. To fill a site with real
stock photography instead:

```bash
UNSPLASH_ACCESS_KEY=xxx npm run photos -- gym
```

Get a key at <https://unsplash.com/oauth/applications> — free, instant, no review
needed for development use.

The script searches Unsplash using each image's own `alt` text as the query (the
alt already describes the photo we want, so there is no second set of keywords to
keep in sync), **downloads** the results into `/public/<id>/`, rewrites the config's
`.svg` paths to `.jpg`, and writes `PHOTO-CREDITS.md` alongside them.

Photos are downloaded rather than hotlinked. Hotlinking would put a third-party
CDN on the critical path of a paying client's site and make builds depend on the
network — the same reason placeholders are generated locally.

**Rate limit:** an unreviewed Unsplash app gets 50 requests/hour. The script issues
one search per image *slot* rather than per image, so a site costs roughly 15–20
requests. Two or three sites per hour is the ceiling. Name the sites you want:

```bash
UNSPLASH_ACCESS_KEY=xxx npm run photos -- gym barber
```

**Before this goes on a real client's live site:** the Unsplash License permits
commercial use without attribution, but a stock photo of an identifiable person
presented as *this client's staff* is a different question from a stock photo of a
barbell. Use real photography for team sections on live sites. Stock is for demos
and for the sections where nobody is claimed to be anyone.

### Deploying a client to Vercel

Each client is a separate Vercel project pointing at **this same repository**.

1. Vercel → Add New → Project → import this repo.
2. Name it after the client.
3. Environment Variables:

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE` | `newclient` |
   | `RESEND_API_KEY` | your Resend key (optional) |
   | `CONTACT_TO_EMAIL` | where enquiries go (defaults to `business.email`) |
   | `CONTACT_FROM_EMAIL` | an address on a Resend-verified domain |

4. Deploy, then point the client's domain at the project.

Pushing to `main` redeploys every client project at once. A change to a config
file only affects the client that owns it; a change to a component affects all
of them, so run `npm run validate` before pushing.

### Contact form

`app/actions.ts` is a server action: Zod validation, a honeypot field, and a
`fetch` to Resend's REST API. With no `RESEND_API_KEY` set it logs the
submission and reports success, so dev and preview builds need no secrets.

---

## Adding a font

1. Import it from `next/font/google` in `lib/fonts.ts`.
2. Declare a module-scope `const` for it. next/font is a build-time transform and
   requires a literal options object assigned to a const — it cannot be looped.
3. Add its key to `FONT_KEYS` in `lib/schema.ts`.
4. Add an entry to `FONTS`. TypeScript fails the build if a key has no entry.

Static-weight families need an explicit `weight`; variable families omit it.

Registry fonts use `preload: false` — fourteen families with preload on would
emit fourteen `<link rel=preload>` tags on a page that uses two. If heading text
visibly swaps in on LCP for a particular client, add one manual preload for that
family in `app/layout.tsx`.

## Adding a section, or a variant

**A new variant** of an existing section:

1. Add the variant name to that section's array in `VARIANTS` (`lib/schema.ts`).
2. Add a sibling function in the section's file and a `case` in its switch.

That is the whole change. Existing configs keep working — the first entry in each
`VARIANTS` array is the default.

**A new section**:

1. Add its content schema in `lib/schema.ts` and its key to `SECTION_IDS`.
2. If it should be flag-gated, add it to `SECTION_FLAG`.
3. Create `components/sections/YourSection.tsx` taking `{ config }`.
4. Register it in the `SECTIONS` map in `components/SectionRenderer.tsx`.
5. Add it to `sites/_test.config.ts` so the fixture keeps covering everything.

Sections are server components. If a variant needs state, put that variant in its
own `"use client"` file (see `ServicesTabs.tsx`) so the rest stays server-rendered.

> **Client-bundle rule:** `components/ui.tsx` must never import `lib/icon`.
> `lib/icon` namespace-imports all ~1500 Lucide icons, which is free in a server
> component and a 700 KB mistake the moment a client component pulls it in.
> Client components import the two or three icons they need by name.

---

## CMS-ready — the DataSource migration path

Components never read config. They receive plain data objects as props, and the
only place that knows where a config comes from is `getSiteConfig()` in
`lib/site.ts`. Swapping files for a database is therefore a data-layer change:

```ts
// lib/site.ts today
export function getSiteConfig(): SiteConfig {
  const raw = sites[process.env.NEXT_PUBLIC_SITE!];
  return SiteConfigSchema.parse(raw);
}

// lib/site.ts against Supabase
export async function getSiteConfig(): Promise<SiteConfig> {
  const { data } = await supabase
    .from("sites")
    .select("config")
    .eq("id", process.env.NEXT_PUBLIC_SITE!)
    .single();
  return SiteConfigSchema.parse(data.config);   // same schema, same guarantees
}
```

`app/layout.tsx` and `app/page.tsx` become `async` and `await` it. No section
component changes, because none of them ever knew where the data came from. The
Zod schema keeps doing the same job — it validates a database row exactly as well
as it validates a TypeScript literal.

The interface is deliberately **not** abstracted behind a `DataSource` class
today. There is one implementation; an interface with one implementation is
indirection, not flexibility. Introduce it when there are genuinely two.

---

## Quality

Enforced automatically by `npm run validate` across every config:

- **WCAG AA contrast** on all eight colour pairs that appear together in the
  rendered components. A client site cannot ship unreadable body copy.
- **Schema and cross-field rules** — a section in `layout` with no content, a
  flag on with nothing behind it, a nav link pointing at a section this site does
  not render, an image outside the site's own `/public` folder.
- **Distinctiveness** — no two client sites share a hero + services pair.

Built in, not checked:

- Semantic HTML, one `<h1>` per page, `aria-labelledby` on every section.
- Skip link, visible focus rings, 44 px minimum touch targets.
- The FAQ accordion is a native `<details>`; the mobile menu is a native
  `<dialog>` opened with `showModal()`, so focus trapping, Escape-to-close and
  keyboard operation are the platform's rather than ours.
- ARIA tabs pattern with roving tabindex and arrow keys on `services: tabs`.
- `prefers-reduced-motion` honoured in `Reveal.tsx` and again globally in CSS.
- `next/image` throughout with explicit `sizes`, `priority` on the hero only.
- Alt text is required by the schema — an image without it fails validation.

### Measured, and not measured

Page weight for `church` (11 sections), production build:

| | gzipped |
| --- | --- |
| HTML | ~24 KB |
| CSS | ~12 KB |
| JS | ~227 KB |

The JS figure is mostly the React 19 + Next 16 baseline; Framer Motion is ~45 KB
of it and is loaded through `LazyMotion` with only the `domAnimation` feature set.

**Lighthouse has not been run.** The 95+ performance and accessibility target is
the goal, not a measured result — run it against a deployed preview before
quoting numbers to a client.

---

## Demo sites

Sixteen client sites, all rendered by the same code. Every one has a distinct
hero + services pair, which `npm run validate` enforces.

**Flagships**

| Id | Business | Hero + services | Notable |
| --- | --- | --- | --- |
| `restaurant` | The Smoke House, Woodstock | `fullscreen-image` + `list` | Menu-as-typography, masonry gallery, transparent nav |
| `barber` | Legacy Barbers, Braamfontein | `split` + `grid` | Booking, price list, carousel, cta-heavy footer |
| `attorney` | Nelson & Partners, Durban | `minimal-centered` + `alternating` | Six flags off, numbered process, centered-logo nav |
| `mechanic` | Precision Auto Works, Pinetown | `angled` + `tabs` | Tabbed bays, pricing table, hard shadows |
| `church` | Hope Community, Kenilworth | `video` + `grid` | Horizontal service-times rail, newsletter, pill buttons |

**Additional industries** — configs only, no new components

| Id | Business | Hero + services |
| --- | --- | --- |
| `coffee` | Bean & Bicycle, Parkhurst | `fullscreen-image` + `grid` |
| `gym` | Ironworks Strength, Bellville | `angled` + `alternating` |
| `spa` | Lotus & Stone, Umhlanga | `split` + `alternating` |
| `plumber` | Cape Flow Plumbing, Goodwood | `minimal-centered` + `list` |
| `guesthouse` | Aloe Ridge, Hermanus | `fullscreen-image` + `alternating` |
| `dentist` | Rivonia Dental Studio, Sandton | `split` + `tabs` |
| `estate` | Meridian Property Group, Umhlanga | `video` + `alternating` |
| `cleaning` | Sparkle & Shine, Randburg | `minimal-centered` + `grid` |
| `security` | Sentinel Response, Centurion | `angled` + `grid` |
| `construction` | Terra Build, Gqeberha | `video` + `tabs` |
| `turbo` | Redline Turbo Engineering, Germiston | `split` + `list` |

`engine-test` is a fixture rather than a client — it lists every section with
every flag on, so one build exercises the whole component library.

`sites/church.config.ts` sets `hero.variant: "video"` without a `videoUrl`, so it
falls back to the poster image. Drop a `/church/welcome.mp4` in and set the field
to activate it.

`sites/church.config.ts` sets `hero.variant: "video"` without a `videoUrl`, so it
falls back to the poster image. Drop a `/church/welcome.mp4` in and set the field
to activate it.
