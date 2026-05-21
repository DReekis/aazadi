import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, FileCheck2, Landmark, Scale } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { articles, getJournalist, journalists } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return journalists.map((journalist) => ({ slug: journalist.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journalist = getJournalist(slug);
  return journalist ? { title: journalist.name, description: journalist.bio } : {};
}

export default async function JournalistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journalist = getJournalist(slug);

  if (!journalist) {
    notFound();
  }

  const authored = articles.filter((article) => article.author.slug === journalist.slug);

  return (
    <div className="container-page section-band">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <div className="soft-card p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-md bg-obsidian font-editorial text-3xl font-black text-peach">
              {journalist.name.split(" ").map((part) => part[0]).join("")}
            </div>
            <p className="eyebrow mt-5">{journalist.region}</p>
            <h1 className="font-editorial mt-2 text-4xl font-black text-obsidian md:text-5xl">{journalist.name}</h1>
            <p className="mt-2 text-lg font-bold text-maroon">{journalist.title}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{journalist.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {journalist.beats.map((beat) => (
                <span className="rounded-full border border-maroon/15 bg-cream/70 px-2.5 py-1 text-xs font-bold text-muted" key={beat}>
                  {beat}
                </span>
              ))}
            </div>
          </div>
          <div className="obsidian-panel p-5" style={{ borderRadius: 8 }}>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-peach">Public accountability</p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <Metric icon={BadgeCheck} label="Reliability" value={`${journalist.reliabilityScore}`} />
              <Metric icon={FileCheck2} label="Verified reports" value={`${journalist.verifiedReports}`} />
              <Metric icon={Scale} label="Corrections" value={`${journalist.correctionsIssued}`} />
              <Metric icon={Landmark} label="Governance" value={`${journalist.governanceParticipation}%`} />
            </dl>
          </div>
        </aside>

        <main className="space-y-8">
          <section className="soft-card p-5">
            <p className="eyebrow">Journalist record</p>
            <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Evidence practices and governance participation</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Record label="Joined" value={formatDate(journalist.joinedAt)} />
              <Record label="Primary region" value={journalist.region} />
              <Record label="Governance participation" value={`${journalist.governanceParticipation}%`} />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">
              Journalist profiles are designed as trust surfaces: public beats, correction counts, verified reports, and governance participation remain visible as the institution grows.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4 border-t border-maroon/20 pt-4">
              <div>
                <p className="eyebrow">Published work</p>
                <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Verified reporting archive</h2>
              </div>
              <Link className="button-secondary hidden sm:inline-flex" href="/search">
                Search archive
              </Link>
            </div>
            <div className="grid gap-4">
              {authored.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof BadgeCheck; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-peach">
        <Icon size={15} aria-hidden="true" />
        {label}
      </dt>
      <dd className="font-editorial mt-1 text-3xl font-black text-cream">{value}</dd>
    </div>
  );
}

function Record({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-maroon/30 pl-3">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{label}</p>
      <p className="mt-1 text-sm font-bold text-obsidian">{value}</p>
    </div>
  );
}
