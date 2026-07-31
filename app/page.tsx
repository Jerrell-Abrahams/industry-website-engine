import { SectionRenderer } from "@/components/SectionRenderer";
import { getSiteConfig } from "@/lib/site";

export default function Home() {
  return <SectionRenderer config={getSiteConfig()} />;
}
