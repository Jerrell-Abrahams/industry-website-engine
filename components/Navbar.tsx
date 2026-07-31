"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { NavbarContent, SiteConfig } from "@/lib/schema";
import { cn, telHref } from "@/lib/utils";

/**
 * Client component because two variants need real interactivity: the mobile
 * drawer, and the scroll state that turns `transparent-overlay` solid.
 *
 * The mobile drawer is a native <dialog> opened with showModal(), which gives
 * focus trapping, Escape-to-close and background inerting for free. A div-based
 * drawer would need all three hand-written.
 */

type Props = {
  navbar: NavbarContent;
  business: Pick<SiteConfig["business"], "name" | "phone" | "logo">;
};

export function Navbar({ navbar, business }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  const overlay = navbar.variant === "transparent-overlay";

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  // Transparent only while it is genuinely over the hero; solid everywhere else,
  // otherwise the links sit on the page background and contrast fails.
  const onDark = overlay && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onDark ? "bg-transparent" : "border-b border-line bg-canvas/95 backdrop-blur-sm",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "container-page flex h-20 items-center gap-6",
          navbar.variant === "centered-logo" ? "justify-between lg:justify-center" : "justify-between",
        )}
      >
        {navbar.variant === "centered-logo" ? (
          <CenteredLogo navbar={navbar} business={business} onDark={onDark} />
        ) : (
          <>
            <Logo business={business} onDark={onDark} />
            <ul className="hidden items-center gap-7 lg:flex">
              {navbar.links.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} onDark={onDark} />
                </li>
              ))}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              {navbar.showPhone ? <PhoneLink phone={business.phone} onDark={onDark} /> : null}
              {navbar.cta ? (
                <a href={navbar.cta.href} className="btn btn-primary">
                  {navbar.cta.label}
                </a>
              ) : null}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          aria-label="Open menu"
          className={cn(
            "flex size-11 items-center justify-center rounded-brand lg:hidden",
            onDark ? "text-white" : "text-ink",
          )}
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </nav>

      <dialog
        ref={dialog}
        // Clicking the backdrop hits the dialog element itself, not its contents.
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-0 ml-auto h-full max-h-full w-[min(20rem,85vw)] max-w-full bg-canvas p-0 text-ink backdrop:bg-black/50"
      >
        <div className="flex h-full flex-col gap-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-lg font-bold">{business.name}</span>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-brand"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col">
            {navbar.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => dialog.current?.close()}
                  className="block border-b border-line py-3.5 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a href={telHref(business.phone)} className="flex items-center gap-2 font-medium">
              <Phone size={18} aria-hidden="true" />
              {business.phone}
            </a>
            {navbar.cta ? (
              <a
                href={navbar.cta.href}
                onClick={() => dialog.current?.close()}
                className="btn btn-primary"
              >
                {navbar.cta.label}
              </a>
            ) : null}
          </div>
        </div>
      </dialog>
    </header>
  );
}

/* ------------------------------------------------------------------ */

function CenteredLogo({ navbar, business, onDark }: Props & { onDark: boolean }) {
  const mid = Math.ceil(navbar.links.length / 2);

  return (
    <div className="flex w-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <ul className="hidden items-center gap-7 lg:flex lg:justify-end">
        {navbar.links.slice(0, mid).map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} onDark={onDark} />
          </li>
        ))}
      </ul>

      <Logo business={business} onDark={onDark} className="lg:justify-center" />

      <ul className="hidden items-center gap-7 lg:flex">
        {navbar.links.slice(mid).map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} onDark={onDark} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Logo({
  business,
  onDark,
  className,
}: {
  business: Props["business"];
  onDark: boolean;
  className?: string;
}) {
  return (
    <a href="#hero" className={cn("flex items-center gap-2.5", className)}>
      {business.logo ? (
        <Image
          src={business.logo.src}
          alt={business.logo.alt}
          width={160}
          height={40}
          priority
          className="h-9 w-auto"
        />
      ) : (
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            onDark ? "text-white" : "text-ink",
          )}
        >
          {business.name}
        </span>
      )}
    </a>
  );
}

function NavLink({ href, label, onDark }: { href: string; label: string; onDark: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "text-sm font-medium transition-colors",
        onDark ? "text-white/90 hover:text-white" : "text-ink hover:text-primary",
      )}
    >
      {label}
    </a>
  );
}

function PhoneLink({ phone, onDark }: { phone: string; onDark: boolean }) {
  return (
    <a
      href={telHref(phone)}
      className={cn(
        "flex items-center gap-2 text-sm font-semibold transition-colors",
        onDark ? "text-white hover:text-white/80" : "text-ink hover:text-primary",
      )}
    >
      <Phone size={16} aria-hidden="true" />
      {phone}
    </a>
  );
}
