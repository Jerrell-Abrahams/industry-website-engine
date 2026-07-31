import { Picture, Section, SectionHeader } from "@/components/ui";
import type { GalleryContent, SiteConfig } from "@/lib/schema";

/**
 * Three gallery layouts, none of which need a lightbox library or JS.
 * `masonry` uses CSS columns; `filmstrip` uses scroll-snap.
 */

type Props = { config: SiteConfig };

export function Gallery({ config }: Props) {
  const gallery = config.gallery;
  if (!gallery) return null;

  return (
    <Section
      id="gallery"
      labelledBy="gallery-heading"
      bleed={gallery.variant === "filmstrip"}
      className={gallery.variant === "filmstrip" ? "section-y" : undefined}
    >
      <div className={gallery.variant === "filmstrip" ? "container-page" : undefined}>
        <SectionHeader
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          intro={gallery.intro}
          align="center"
          headingId="gallery-heading"
          className="mb-12"
        />
      </div>

      {gallery.variant === "masonry" ? (
        <Masonry gallery={gallery} />
      ) : gallery.variant === "filmstrip" ? (
        <Filmstrip gallery={gallery} />
      ) : (
        <Grid gallery={gallery} />
      )}
    </Section>
  );
}

/** CSS columns. `break-inside-avoid` is what stops an image splitting across columns. */
function Masonry({ gallery }: { gallery: GalleryContent }) {
  return (
    <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
      {gallery.images.map((image) => (
        <div key={image.src} className="break-inside-avoid overflow-hidden rounded-brand">
          <Picture
            image={image}
            fill={false}
            width={800}
            height={1000}
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

function Grid({ gallery }: { gallery: GalleryContent }) {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {gallery.images.map((image) => (
        <li key={image.src} className="relative aspect-square overflow-hidden rounded-brand">
          <Picture image={image} sizes="(max-width: 1024px) 50vw, 25vw" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Horizontal scroll-snap strip. Keyboard-scrollable because it's a real overflow container.
 *
 * `relative` keeps position:absolute children resolving against this strip
 * rather than the page — see Pricing.tsx.
 */
function Filmstrip({ gallery }: { gallery: GalleryContent }) {
  return (
    <ul
      tabIndex={0}
      aria-label="Photo gallery — scroll horizontally"
      className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
    >
      {gallery.images.map((image) => (
        <li
          key={image.src}
          className="relative aspect-3/4 w-64 shrink-0 snap-center overflow-hidden rounded-brand sm:w-80"
        >
          <Picture image={image} sizes="(max-width: 640px) 16rem, 20rem" />
        </li>
      ))}
    </ul>
  );
}
