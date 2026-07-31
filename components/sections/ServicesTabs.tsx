"use client";

import { useId, useRef, useState } from "react";

import { Picture } from "@/components/ui";
import type { ServicesContent } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * The one services variant that needs state, split into its own client leaf so
 * Services.tsx and every other variant stay server components.
 *
 * Implements the ARIA tabs pattern properly: roving tabindex, arrow-key
 * navigation, Home/End and `aria-selected`. A plain onClick list would look
 * identical and be unusable from a keyboard.
 */
export function ServicesTabs({ items }: { items: ServicesContent["items"] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Services"
        aria-orientation="vertical"
        // `relative` keeps position:absolute children resolving against this
        // strip rather than the page — see Pricing.tsx.
        className="no-scrollbar relative flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {items.map((item, i) => (
          <button
            key={item.title}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-11 shrink-0 rounded-brand px-4 py-3 text-left text-sm font-semibold whitespace-nowrap transition-colors lg:whitespace-normal",
              active === i ? "bg-primary text-on-primary" : "bg-surface text-ink hover:bg-primary/10",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {items.map((item, i) => (
        <div
          key={item.title}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="grid gap-6 sm:grid-cols-2 sm:items-center"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
            {item.points.length > 0 ? (
              <ul className="flex flex-col gap-2 text-sm">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            {item.price ? <p className="text-lg font-bold text-primary">{item.price}</p> : null}
          </div>

          {item.image ? (
            <div className="relative aspect-4/3 overflow-hidden rounded-brand">
              <Picture image={item.image} sizes="(max-width: 640px) 100vw, 40vw" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
