import { Button, Picture, Section } from "@/components/ui";
import type { CtaContent, SiteConfig } from "@/lib/schema";

type Props = { config: SiteConfig };

export function Cta({ config }: Props) {
  const cta = config.cta;
  if (!cta) return null;

  return cta.variant === "split" ? <Split cta={cta} /> : <Banner cta={cta} />;
}

function Actions({ cta, onPrimary }: { cta: CtaContent; onPrimary: boolean }) {
  if (!cta.primaryCta && !cta.secondaryCta) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {cta.primaryCta ? (
        <Button
          href={cta.primaryCta.href}
          tone={onPrimary ? "secondary" : "primary"}
          className={onPrimary ? "border-current text-on-primary" : undefined}
        >
          {cta.primaryCta.label}
        </Button>
      ) : null}
      {cta.secondaryCta ? (
        <Button
          href={cta.secondaryCta.href}
          tone="secondary"
          className={onPrimary ? "text-on-primary" : undefined}
        >
          {cta.secondaryCta.label}
        </Button>
      ) : null}
    </div>
  );
}

function Banner({ cta }: { cta: CtaContent }) {
  return (
    <Section id="cta" labelledBy="cta-heading" className="bg-primary text-on-primary">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 id="cta-heading" className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          {cta.heading}
        </h2>
        {cta.body ? <p className="max-w-2xl text-lg opacity-90">{cta.body}</p> : null}
        <Actions cta={cta} onPrimary />
      </div>
    </Section>
  );
}

function Split({ cta }: { cta: CtaContent }) {
  return (
    <Section id="cta" labelledBy="cta-heading">
      <div className="overflow-hidden rounded-brand bg-primary text-on-primary">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-5 p-8 sm:p-12">
            <h2 id="cta-heading" className="text-3xl font-bold sm:text-4xl">
              {cta.heading}
            </h2>
            {cta.body ? <p className="text-lg opacity-90">{cta.body}</p> : null}
            <Actions cta={cta} onPrimary />
          </div>
          {cta.image ? (
            <div className="relative aspect-4/3 h-full w-full md:aspect-auto md:min-h-80">
              <Picture image={cta.image} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
