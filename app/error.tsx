"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Runtime error boundary.
 *
 * Deliberately reads nothing from the site config: this has to be a client
 * component, and importing the registry to get a business name would ship all
 * twenty client configs to the browser. The palette still applies — the theme
 * is CSS custom properties on <html>, not a React context.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  // `reset()` only clears the boundary's state and re-renders the same failed
  // payload; `unstable_retry()` re-fetches first, which is what "Try again"
  // has to mean here. Added in next 16.2.
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Something went wrong</h1>
      <p className="max-w-md text-muted">
        Sorry — that did not load. Trying again usually sorts it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => unstable_retry()} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to the homepage
        </Link>
      </div>
      {error.digest ? <p className="text-xs text-muted">Reference: {error.digest}</p> : null}
    </div>
  );
}
