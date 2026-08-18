import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui";
import { getSiteConfig } from "@/lib/site";
import { formatAddress } from "@/lib/utils";

/**
 * POPIA processing notice.
 *
 * Live sites only — a demo collects nothing real, and publishing a privacy
 * notice for a business that does not exist would be its own small lie.
 *
 * The text is generated from config rather than authored per client so that
 * it cannot drift out of step with what the contact form actually collects.
 * It is a starting point drafted from the Act's general principles, not legal
 * advice: have it reviewed before it goes on a paying client's site.
 */

export function generateMetadata(): Metadata {
  const { business, demo } = getSiteConfig();
  if (demo) return {};
  return {
    title: "Privacy policy",
    description: `How ${business.name} collects, uses and protects your personal information.`,
    alternates: { canonical: "/privacy" },
  };
}

export default function PrivacyPage() {
  const config = getSiteConfig();
  if (config.demo) notFound();

  const { business, privacy } = config;
  const officer = privacy.informationOfficer ?? business.name;
  const officerEmail = privacy.informationOfficerEmail ?? business.email;
  return (
    <Section id="privacy">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">Privacy policy</h1>
          {privacy.lastUpdated ? (
            <p className="text-sm text-muted">Last updated {privacy.lastUpdated}</p>
          ) : null}
        </header>

        <P>
          This notice explains how {business.name} collects, uses and protects your personal
          information, in line with the Protection of Personal Information Act, 2013 (POPIA).
        </P>

        <H>Who is responsible</H>
        <P>
          {business.name} is the responsible party for the information described here. Our
          information officer is {officer}, reachable at{" "}
          <a className="text-primary hover:underline" href={`mailto:${officerEmail}`}>
            {officerEmail}
          </a>{" "}
          or on {business.phone}. Our address is {formatAddress(business.address)}.
        </P>

        <H>What we collect, and why</H>
        <P>
          When you complete an enquiry form on this site we collect the name, email address,
          phone number and message you provide. We use them for one purpose: to respond to your
          enquiry and to carry out any work you go on to ask us for. We do not sell your
          information, and we do not use it for advertising.
        </P>
        <P>
          Our web host records standard technical information such as your IP address and browser
          type as part of serving the page. That is a normal part of how the internet works and is
          not linked to your enquiry.
        </P>

        <H>Who else sees it</H>
        <P>
          Your enquiry is delivered to us by email through our email provider, and our website is
          served by our hosting provider. Both process the information only to provide those
          services to us. We share your information with nobody else unless the law requires it.
        </P>

        <H>How long we keep it</H>
        <P>
          We keep enquiries for as long as we need them to deal with your request and to meet any
          record-keeping obligations that apply to our business, after which they are deleted.
        </P>

        <H>Your rights</H>
        <P>
          You may ask us what personal information we hold about you, ask us to correct it, or ask
          us to delete it. Email {officerEmail} and we will respond. If you believe we have
          mishandled your information you may complain to the Information Regulator of South
          Africa at{" "}
          <a
            className="text-primary hover:underline"
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
          >
            inforegulator.org.za
          </a>
          .
        </P>

        {privacy.extraParagraphs.map((paragraph) => (
          <P key={paragraph}>{paragraph}</P>
        ))}

        <Link href="/" className="text-primary hover:underline">
          ← Back to {business.name}
        </Link>
      </div>
    </Section>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading mt-2 text-xl font-semibold">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed text-muted">{children}</p>
);
