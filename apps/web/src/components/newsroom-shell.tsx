import Link from "next/link";
import { Archive, BadgeCheck, FileSearch, FileText, Landmark, MapPinned, Radio, Scale, ShieldCheck } from "lucide-react";

const newsroomNav = [
  { href: "/newsroom", label: "Newsroom Home", icon: Landmark },
  { href: "/newsroom/investigations/school-meal-contracts-repository", label: "Investigation Workspace", icon: FileSearch },
  { href: "/newsroom/evidence-vault", label: "Evidence Vault", icon: Archive },
  { href: "/newsroom/governance-chamber", label: "Governance Chamber", icon: Scale },
  { href: "/newsroom/regional-desks", label: "Regional Desks", icon: MapPinned },
  { href: "/newsroom/review-queue", label: "Review Queue", icon: FileText },
  { href: "/newsroom/public-pulse", label: "Public Pulse", icon: Radio },
  { href: "/newsroom/reputation", label: "Reputation Center", icon: BadgeCheck },
  { href: "/newsroom/constitutional-records", label: "Records System", icon: ShieldCheck }
];

export function NewsroomShell({
  title,
  eyebrow,
  body,
  children
}: {
  title: string;
  eyebrow: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page section-band">
      <div className="mb-8 grid gap-5 border-b border-maroon/20 pb-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">{title}</h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted lg:justify-self-end lg:text-right">{body}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit lg:sticky lg:top-[98px]">
          <nav className="soft-card grid gap-1 p-2" aria-label="Newsroom operating system">
            {newsroomNav.map(({ href, label, icon: Icon }) => (
              <Link
                className="focus-ring flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-black text-muted transition hover:bg-maroon/5 hover:text-maroon"
                href={href}
                key={href}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
