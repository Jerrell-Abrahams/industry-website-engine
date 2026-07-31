"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { Card, Rating } from "@/components/ui";
import type { TestimonialsContent } from "@/lib/schema";

/**
 * Scroll-snap carousel.
 *
 * The track is a real overflow container, so it already scrolls by touch, by
 * trackpad and by keyboard before any JS runs. The buttons are a convenience
 * layer on top — `scrollBy` on the existing scroller, not a state machine that
 * reimplements scrolling.
 */
// ponytail: no carousel library. If this ever needs autoplay, loop and
// pagination dots together, that's the point to reach for one.
export function TestimonialsCarousel({ items }: { items: TestimonialsContent["items"] }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // One "page" is the width of the first card plus its gap.
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Customer reviews"
        // `relative`: Rating renders sr-only text, which is position:absolute.
        // Without a positioned ancestor it escapes the rail and widens the
        // mobile viewport — see Pricing.tsx.
        className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
          >
            <Card className="flex h-full flex-col gap-4 p-6">
              {item.rating ? <Rating value={item.rating} /> : null}
              <blockquote className="text-lg leading-relaxed">“{item.quote}”</blockquote>
              <footer className="mt-auto pt-2 text-sm">
                <span className="font-semibold">{item.name}</span>
                {item.role ? <span className="block text-muted">{item.role}</span> : null}
              </footer>
            </Card>
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
          className="flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-primary hover:text-on-primary"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
          className="flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-primary hover:text-on-primary"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
