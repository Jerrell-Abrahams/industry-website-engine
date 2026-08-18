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
| `npm run sheets` | Contact sheet per site for reviewing photos against their alt text |
| `npm run check` | validate → typecheck → build |
| `npm run new -- <id>` | Scaffold a client: config, registry entry, placeholder artwork |
| `npm run deploy:all` | Deploy every client site to production (`-- --only <id>` for one) |

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
  check-variants.mjs   every declared variant has a renderer
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

The levers that are pure presentation — `buttonStyle`, `buttonHover`,
`cardStyle`, `sectionDivider`, `sectionTint`, `surfaceTexture` — are applied as
`data-*` attributes on `<html>` and resolved by CSS. That is why no component
takes a `branding` prop, and why the section tint and dividers need no section
index threaded through `SectionRenderer`: CSS counts `main`'s children itself.

### Feature flags

A section listed in `layout` whose flag is off is skipped by the renderer. You
never edit the layout array to turn a feature off. `sites/attorney.config.ts` is
the worked example: gallery, testimonials, pricing, booking, WhatsApp and
newsletter are all off, and no code changes to achieve it.

Two flags are not sections:

- `analytics` — Vercel Analytics, off by default. Cookieless, so it needs no
  consent banner.
- `openNowBadge` — "Open now"/"Closed" beside the opening hours, computed in
  the browser against `Africa/Johannesburg`. It is off for 24/7 emergency
  trades (`security`, `plumber`, `funeral`), where "Closed" would be worse than
  saying nothing, and for stay-over and service-time businesses where trading
  hours are not the question a visitor is asking.

### Demo vs live

`demo` sits at the config root and **defaults to true**, because that is what a
new config is. A demo shows the "Demo site" pill and carries `noindex` page
metadata: 19 invented businesses with plausible South African addresses do not
belong in local search results.

`robots.txt` deliberately still *allows* crawling on demos. `Disallow` only
stops a crawler fetching the page; it does not stop the URL being indexed from
an inbound link, and a crawler that never fetches never sees the `noindex`.
Allowing the fetch is what makes the noindex take effect. The sitemap is
withheld instead, so nothing is volunteered for crawling.

Setting `demo: false` at sale time drops the pill, allows indexing, and
publishes the POPIA privacy notice at `/privacy` (with a footer link). Demos
404 that route: publishing a privacy notice for a business that does not exist
would be its own small lie. `npm run validate` prints `[demo]` or `[LIVE]` per
site so a stray flip is visible.

The notice is generated from config so it cannot drift from what the contact
form actually collects. `privacy.informationOfficer` and
`privacy.informationOfficerEmail` override the business defaults;
`privacy.extraParagraphs` appends anything industry-specific. **Have it
reviewed by someone who knows POPIA before it goes on a paying client's site** —
it is drafted from the Act's general principles, not legal advice.

### Statutory disclosure and sector rules

`compliance` renders one line in the footer and is empty by default, so demos
and sole traders show nothing.

```ts
compliance: {
  registeredName: "Sentinel Response (Pty) Ltd",
  registrationNumber: "2017/445566/07",       // CIPC, required by ECTA s43
  registrations: [{ label: "PSIRA", value: "2291847" }],
}
```

`npm run validate` **warns** when a live site has no `registeredName` or
`registrationNumber` — a warning rather than a failure, because a sole
proprietor may legitimately have no CIPC number.

It **fails** a live site whose `seo.schemaType` is a profession with
advertising restrictions (`Physician`, `Dentist`, `LegalService`, `Attorney`
and similar — see `TESTIMONIAL_RESTRICTED_TYPES`) while `features.testimonials`
is on. HPCSA and Legal Practice Council rules both restrict testimonials, and
the template would otherwise hand a client a compliance problem. Demos get a
warning instead, which is why `dentist` still builds.

That check catches the one rule a schema can see. Superlative claims,
guarantees of outcome and price advertising are restricted too — those need a
human who knows the rules to read the copy.

### Variants

Every major section supports several genuinely different layouts, chosen in
config. This — not the colour system — is what stops two client sites reading as
the same template recoloured.

| Section | Variants |
| --- | --- |
| hero | `fullscreen-image` `split` `minimal-centered` `video` `angled` `split-offset` `typographic` `card-overlay` |
| about | `side-by-side` `stacked` `stats-overlay` |
| services | `grid` `alternating` `tabs` `list` |
| highlights | `icon-grid` `numbered` |
| gallery | `masonry` `grid` `filmstrip` `justified` |
| stats | `bar` `cards` `divided` |
| pricing | `cards` `table` `simple-list` `comparison-strip` |
| testimonials | `carousel` `grid` `single-featured` `wall` |
| team | `grid` `rows` |
| faq | `single-column` `two-column` `sidebar` |
| timeline | `vertical` `horizontal` |
| partners | `marquee` `grid` |
| booking | `centered` `split` `steps` |
| contact | `split-map` `centered` `full-form` |
| cta | `banner` `split` `overlap` |
| navbar | `solid` `transparent-overlay` `centered-logo` |
| footer | `columns` `minimal` `cta-heavy` |

`npm run validate` fails if two client sites share the same **hero + services**
pair, because that combination is what determines a site's structural feel. That
is a hard ceiling of 8 × 4 = **32 client sites**, of which 19 are used.

`npm run check-variants` catches the one failure the other checks cannot see: a
variant declared in `VARIANTS` with no `case` in its component. Typecheck,
validate and the build all pass in that state — the site just quietly renders
the default layout instead.

### Branding levers

Everything below is a `branding.*` enum. None of them is a component prop: they
land as CSS custom properties or `data-*` attributes on `<html>` and the cascade
does the rest, so adding one is a schema entry, a theme entry and a CSS block.
Every default is what the engine shipped with, so a config that sets none of
them looks exactly as it did.

| Lever | Values (first is the default) |
| --- | --- |
| `borderRadius` | `none` `sm` `md`* `lg` `xl` `full` |
| `buttonStyle` | `solid` `outline` `pill` `underline` `ghost` `soft` `gradient` `raised` |
| `buttonHover` | `fade` `lift` `press` `glow` |
| `cardStyle` | `flat` `bordered`* `elevated` `glass` |
| `shadowStyle` | `none` `soft`* `hard` |
| `borderWeight` | `hairline` `medium` `bold` |
| `sectionDivider` | `none` `rule` `angled` `curve` |
| `sectionTint` | `flat` `alternating` |
| `spacingScale` | `compact` `normal`* `spacious` |
| `animationStyle` | `none` `subtle`* `lively` |
| `revealMotion` | `slide-up` `fade` `slide-in` `scale` `blur` |
| `staggerChildren` | `false` `true` |
| `surfaceTexture` | `none` `noise` `grid` `dots` `wash` |
| `headingTransform` | `none` `uppercase` |

\* marks a default that is not the first value.

Three of these are worth knowing the details of:

- **`sectionDivider: "angled"` and `"curve"`** only read against a neighbouring
  section of a different colour, so pair them with `sectionTint: "alternating"`.
- **`animationStyle` and `revealMotion` are two halves of one thing** —
  `animationStyle` sets how far and how long, `revealMotion` sets what kind of
  move. `animationStyle: "none"` disables the reveal regardless of the other.
- **`staggerChildren`** is scroll-driven CSS (`animation-timeline: view()`), not
  JavaScript. Where the browser lacks it, nothing applies and the grid items are
  simply visible — the only acceptable failure mode for client content.

`revealMotion: "blur"` is the one value with a running cost: it repaints the
whole section each frame where the other four stay on the compositor. The radius
is capped low for that reason. Prefer `fade` or `scale` on image-heavy sites.

Anything added to `globals.css` that competes with a Tailwind utility must go in
`@layer components`, and must not rely on a property a utility also sets —
`section-y` writes `padding-block` from `@layer utilities`, which beats a
components-layer `padding-top` on layer order no matter how specific it is. The
`angled` divider compensates with a negative margin for exactly this reason.

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

#### Then look at what you got — this step is not optional

```bash
npm run sheets -- gym          # or no arguments for every site
```

That tiles the site's photos into one grid in `.sheets/` and prints each cell's
alt text beside it. **Unsplash relevance is loose enough that roughly two in five
photos come back wrong the first time**, and wrong here is not subtle: a
smokehouse hero reading "brisket resting on the pass" returned a *mountain pass*;
a construction gallery reading "a new four-bedroom home" returned a *four-poster
bed*; a partner named Kobus van Wyk returned a *white delivery van*.

Nothing in the pipeline can catch that — the script cannot see its own images.
One grid per site turns the check into a minute's work, so do it every time.

#### Writing alt text that finds a photo

The same sentence is the accessibility promise *and* the search query, which
means alt text has to describe **a photograph**, not a place, a person or a
category. `"A sectional title unit sold in Ballito"` is a legal category and
finds nothing; `"A modern apartment block"` finds the picture. When a search
misses twice, shorten the alt rather than elaborating it.

When the photo is close but the alt over-promises — one massage table where the
alt says two — change the alt, not the photo. It costs no API calls and the alt
is what a screen reader will read out.

Team and testimonial slots never search their alt text at all: a name cannot
describe a photograph. They draw from a rotating pool of portrait queries, and
`scripts/.photo-ledger.json` records every photo ever used so no face appears on
two client sites. Delete that file to allow reuse.

**Rate limit:** an unreviewed Unsplash app gets 50 requests/hour — one search plus
one download-tracking call per image, so budget **two requests per image** and
about 25 images an hour. The run is resumable: fetched images become `.jpg` and
are skipped next time, so on a 403 just wait and repeat the same command.

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

If you create the project by importing the repo in the dashboard, disconnect
git afterwards or every client redeploys on every unrelated push. The existing
projects are all CLI-deployed — see below.

### Redeploying after a change

The Vercel projects are **not** connected to this repository's git history —
they are deployed from the CLI. Pushing to `main` therefore deploys nothing.
Every project has to be deployed explicitly:

```bash
vercel link --yes --project <site>   # rewrites .vercel/ and pulls that project's dev env into .env.local
vercel --prod --yes
```

A change to a config file only affects the client that owns it, so redeploy
that one. A change to anything in `components/`, `lib/` or `app/` affects all
of them, so loop over every site:

```bash
npm run deploy:all                  # every client site
npm run deploy:all -- --only barber # just one
```

It reads the site list from `sites/index.ts`, runs `validate` first and aborts
if that fails, and retries each site once before giving up. Two things it
leaves behind: `.env.local` is overwritten with the last-linked project's
variables, and `.vercel/` points at that project — both gitignored, but
`npm run dev` will render the wrong site until you re-link the one you are
working on.

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

## Adding a section, a variant, or a branding lever

**A new variant** of an existing section:

1. Append the variant name to that section's array in `VARIANTS` (`lib/schema.ts`).
2. Add a sibling function in the section's file and a `case` in its switch.
3. `npm run check-variants` — this is what fails if you do 1 without 2.

That is the whole change. Existing configs keep working — the first entry in each
`VARIANTS` array is the default, which is also why new names go on the **end**:
prepend one and every config that omits `variant` silently changes layout.

**A new branding lever**:

1. Add the enum to `brandingSchema` in `lib/schema.ts`, defaulting to whatever
   the engine does today.
2. Emit it in `lib/theme.ts` — a CSS custom property in `themeStyle()` if it is a
   value, a `data-*` attribute in `themeAttributes()` if it selects a treatment.
3. Add the CSS in `app/globals.css`. Anything that competes with a Tailwind
   utility belongs in `@layer components` so the utility keeps winning.

No component changes, and no site changes. If a lever cannot be expressed this
way it usually means a value is hard-coded in a component that should be reading
a custom property — `.field` was moved out of `EnquiryForm.tsx` for exactly that
reason, so `borderWeight` could reach form inputs.

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

And by `npm run check-variants`:

- **Every declared variant has a renderer.** A name in `VARIANTS` with no `case`
  passes typecheck, validate and the build, and ships the wrong layout.

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

Eighteen client sites, all rendered by the same code. Every one has a distinct
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
| `doctor` | Helderberg Family Practice, Somerset West | `card-overlay` + `grid` |
| `estate` | Meridian Property Group, Umhlanga | `video` + `alternating` |
| `cleaning` | Sparkle & Shine, Randburg | `minimal-centered` + `grid` |
| `security` | Sentinel Response, Centurion | `angled` + `grid` |
| `construction` | Terra Build, Gqeberha | `video` + `tabs` |
| `turbo` | Redline Turbo Engineering, Germiston | `split` + `list` |
| `funeral` | Thembeka Funeral Directors, Soweto | `fullscreen-image` + `tabs` |

`engine-test` is a fixture rather than a client — it lists every section with
every flag on, so one build exercises the whole component library.

`sites/church.config.ts` sets `hero.variant: "video"` without a `videoUrl`, so it
falls back to the poster image. Drop a `/church/welcome.mp4` in and set the field
to activate it.

`sites/doctor.config.ts` is the one config with `features.testimonials` off for a
regulatory reason rather than an editorial one: the HPCSA's rules on advertising
do not permit a registered practitioner to publish patient testimonials. It is
also the worked example of the newer branding levers — `soft` buttons, `lift`
hover, `curve` dividers over `alternating` tint, `fade` reveal and a `wash`
texture.
