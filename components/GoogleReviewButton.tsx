/**
 * The official Google "G" mark. Inlined rather than imported for the same
 * reason as WhatsAppIcon: Lucide carries no brand icons.
 *
 * Shown on white rather than recoloured — the four-colour mark is how Google
 * publishes it, and flattening it to one brand colour (the WhatsApp treatment)
 * is not how this particular mark is meant to appear.
 */
function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    </svg>
  );
}

/**
 * Floating "Leave a review" button, styled to match WhatsAppButton and
 * stacked directly above it.
 *
 * ponytail: the bottom-24 offset assumes the WhatsApp button is also showing
 * beneath it. A site with a review link but WhatsApp switched off floats this
 * one a little high — fine for now, worth a dynamic offset if that combination
 * actually ships.
 */
export function GoogleReviewButton({ url, businessName }: { url: string; businessName: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-24 z-40 flex size-14 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <GoogleIcon size={26} />
      <span className="sr-only">Leave {businessName} a Google review</span>
    </a>
  );
}
