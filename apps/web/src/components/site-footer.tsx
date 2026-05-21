import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-maroon/20 bg-obsidian text-cream">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_2fr]">
        <div className="[&_*]:text-cream">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-cream/72">
            AAZADI is built as public-interest civic infrastructure: transparent, evidence-led, and accountable by design.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <FooterColumn title="Institution" links={[["Mission", "/constitution"], ["Governance", "/governance"], ["Moderation", "/governance/moderation"]]} />
          <FooterColumn title="Public Record" links={[["Corrections", "/corrections"], ["Search", "/search"], ["Regional Reporting", "/regions/delhi-ncr"]]} />
          <FooterColumn title="Journalists" links={[["Apply", "/apply"], ["Dashboard", "/dashboard"], ["Profiles", "/journalists/naina-rahman"]]} />
        </div>
      </div>
      <div className="border-t border-cream/10 py-4">
        <p className="container-page text-xs font-semibold uppercase tracking-[0.12em] text-cream/56">
          Version 1 foundation for constitutional journalism infrastructure
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.1em] text-peach">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-cream/76">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link className="focus-ring hover:text-peach" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
