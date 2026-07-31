import { MessageCircle } from "lucide-react";

import { whatsappHref } from "@/lib/utils";

/**
 * Floating WhatsApp button — for most South African small businesses this is
 * the contact channel that actually gets used.
 *
 * A plain anchor to wa.me: no SDK, no widget script, works on desktop web and
 * deep-links into the app on mobile.
 */
export function WhatsAppButton({ number, businessName }: { number: string; businessName: string }) {
  return (
    <a
      href={whatsappHref(number, `Hi ${businessName}, I'd like to enquire about`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span className="sr-only">Chat with {businessName} on WhatsApp</span>
    </a>
  );
}
