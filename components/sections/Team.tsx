import { Card, Picture, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/lib/icon";
import type { SiteConfig, TeamContent } from "@/lib/schema";

type Props = { config: SiteConfig };

export function Team({ config }: Props) {
  const team = config.team;
  if (!team) return null;

  return (
    <Section id="team" labelledBy="team-heading">
      <SectionHeader
        eyebrow={team.eyebrow}
        heading={team.heading}
        intro={team.intro}
        align={team.variant === "grid" ? "center" : "left"}
        headingId="team-heading"
        className="mb-12"
      />
      {team.variant === "rows" ? <Rows team={team} /> : <Grid team={team} />}
    </Section>
  );
}

function Socials({ member }: { member: TeamContent["members"][number] }) {
  if (member.socials.length === 0) return null;
  return (
    <ul className="flex gap-3">
      {member.socials.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-primary"
          >
            <Icon name={s.icon} size={18} />
            <span className="sr-only">
              {member.name} on {s.platform}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Grid({ team }: { team: TeamContent }) {
  return (
    <ul className="grid gap-[var(--brand-gap)] sm:grid-cols-2 lg:grid-cols-4">
      {team.members.map((member) => (
        <li key={member.name}>
          <Card className="flex h-full flex-col overflow-hidden">
            {member.image ? (
              <div className="relative aspect-square">
                <Picture image={member.image} sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
              {member.bio ? <p className="text-sm text-muted">{member.bio}</p> : null}
              <div className="mt-auto pt-2">
                <Socials member={member} />
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** Wide rows with a portrait beside a longer bio — for teams whose story matters. */
function Rows({ team }: { team: TeamContent }) {
  return (
    <ul className="flex flex-col gap-10">
      {team.members.map((member) => (
        <li
          key={member.name}
          className="flex flex-col gap-6 border-b border-line pb-10 last:border-b-0 last:pb-0 sm:flex-row sm:gap-8"
        >
          {member.image ? (
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-brand sm:size-44">
              <Picture image={member.image} sizes="(max-width: 640px) 100vw, 11rem" />
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
            </div>
            {member.bio ? <p className="max-w-prose text-muted">{member.bio}</p> : null}
            <Socials member={member} />
          </div>
        </li>
      ))}
    </ul>
  );
}
