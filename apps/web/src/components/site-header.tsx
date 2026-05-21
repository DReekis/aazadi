import Link from "next/link";
import { FileSearch, Landmark } from "lucide-react";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/search", label: "Search" },
  { href: "/governance", label: "Governance" },
  { href: "/corrections", label: "Corrections" },
  { href: "/constitution", label: "Constitution" },
  { href: "/apply", label: "Apply" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-maroon/15 bg-paper/92 backdrop-blur">
      <div className="container-page flex min-h-[76px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-md px-3 py-2 text-sm font-bold text-muted transition hover:bg-maroon/5 hover:text-maroon"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="button-secondary hidden sm:inline-flex" href="/dashboard">
            <Landmark size={17} aria-hidden="true" />
            Dashboard
          </Link>
          <Link className="button-primary" href="/articles/audit-trail-missing-school-meals">
            <FileSearch size={17} aria-hidden="true" />
            Read
          </Link>
        </div>
      </div>
      <nav className="container-page flex gap-2 overflow-x-auto border-t border-maroon/10 py-2 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link
            className="focus-ring shrink-0 rounded-md border border-maroon/15 bg-cream/60 px-3 py-2 text-sm font-bold text-muted"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
