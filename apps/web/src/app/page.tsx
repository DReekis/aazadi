import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileSearch, History, Landmark, Scale, ShieldCheck } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CivicMapPanel } from "@/components/civic-map-panel";
import { CorrectionCard } from "@/components/correction-card";
import { GovernanceCard } from "@/components/governance-card";
import { JournalistCard } from "@/components/journalist-card";
import { PublicPulse } from "@/components/public-pulse";
import { SectionHeading } from "@/components/section-heading";
import { articles, civicMapRegions, corrections, governanceLogs, journalists, publicPulseItems } from "@/lib/data";
import { formatDate, slugify } from "@/lib/format";

export default function HomePage() {
  const [featured, ...otherArticles] = articles;

  return (
    <>
      <section className="border-b border-maroon/20 bg-paper">
        <div className="container-page grid gap-8 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
                <span>Featured investigation</span>
                <span className="text-line">/</span>
                <span>{featured.region}</span>
                <span className="text-line">/</span>
                <span>{featured.integrity.evidenceCount} evidence items</span>
              </div>
              <h1 className="font-editorial mt-4 text-5xl font-black leading-[0.98] text-obsidian sm:text-6xl lg:text-7xl">
                {featured.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{featured.dek}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link className="button-primary" href={`/articles/${featured.slug}`}>
                <FileSearch size={18} aria-hidden="true" />
                Read investigation
              </Link>
              <Link className="button-secondary" href="#evidence-standard">
                <ShieldCheck size={18} aria-hidden="true" />
                View trust model
              </Link>
            </div>
            <dl className="grid gap-3 border-t border-maroon/20 pt-5 sm:grid-cols-3">
              <HeroMetric icon={Scale} label="Verification" value={featured.integrity.verificationStatus.replaceAll("_", " ")} />
              <HeroMetric icon={History} label="Revisions" value={`${featured.integrity.revisionCount} visible`} />
              <HeroMetric icon={Landmark} label="Correction status" value={featured.integrity.correctionStatus} />
            </dl>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-maroon/20 bg-paper-deep shadow-[var(--shadow-editorial)] lg:min-h-[560px]">
            <Image
              alt={featured.imageAlt}
              className="object-cover grayscale-[12%]"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              src={featured.imageUrl}
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-cream/25 bg-obsidian/88 p-5 text-cream">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-peach">
                Published {formatDate(featured.publishedAt)}
              </p>
              <p className="mt-2 text-sm leading-6 text-cream/80">
                By {featured.author.name}, {featured.author.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="public-pulse">
        <PublicPulse items={publicPulseItems} />
      </div>

      <section className="section-band">
        <div className="container-page">
          <SectionHeading
            eyebrow="Investigations"
            title="Reporting that keeps its receipts visible."
            body="No infinite feeds. No popularity ranking. Public-interest stories are organized by evidence, region, and civic consequence."
          />
          <div className="grid gap-5">
            {otherArticles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-obsidian text-cream">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div id="evidence-standard">
            <p className="eyebrow text-peach">Evidence standard</p>
            <h2 className="font-editorial mt-2 text-4xl font-black leading-[1.02] text-cream md:text-6xl">
              Trust is a visible interface, not a slogan.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-cream/72">
              Every article carries evidence, revision history, correction status, journalist reliability, and integrity metadata. The platform slows down where ordinary media becomes opaque.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["No silent edits", "Substantial changes create public revision records with timestamps and summaries."],
              ["Structured challenges", "Readers can challenge evidence, suggest corrections, or add context by claim type."],
              ["Auditable governance", "Approvals, moderation actions, and policy changes produce public governance logs."],
              ["Storage abstraction", "Evidence uploads are centralized in V1 but isolated for future IPFS-compatible storage."]
            ].map(([title, body]) => (
              <div className="border border-peach/20 bg-cream/[0.04] p-5" style={{ borderRadius: 8 }} key={title}>
                <h3 className="font-editorial text-2xl font-black text-peach">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/72">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-page">
          <SectionHeading
            eyebrow="Regional reporting"
            title="A civic map, not an algorithm."
            body="Regional pages collect public records, investigations, and local accountability beats without turning the homepage into a churn feed."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[...new Set(articles.map((article) => article.region))].map((region) => {
              const count = articles.filter((article) => article.region === region).length;
              return (
                <Link className="soft-card focus-ring p-5 transition hover:border-maroon/40 hover:bg-cream" href={`/regions/${slugify(region)}`} key={region}>
                  <p className="eyebrow">{count} public records</p>
                  <h3 className="font-editorial mt-2 text-3xl font-black text-obsidian">{region}</h3>
                  <p className="mt-3 flex items-center gap-2 text-sm font-black text-maroon">
                    Open regional desk <ArrowRight size={16} aria-hidden="true" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CivicMapPanel regions={civicMapRegions} />

      <section className="section-band bg-paper-deep/65">
        <div className="container-page grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Governance transparency"
              title="Institutional decisions are part of the public record."
            />
            <div className="grid gap-3">
              {governanceLogs.slice(0, 3).map((log) => (
                <GovernanceCard log={log} key={log.id} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Latest corrections" title="Corrections are visible by default." />
            <div className="grid gap-3">
              {corrections.length ? (
                corrections.map((correction) => <CorrectionCard correction={correction} key={correction.id} />)
              ) : (
                <div className="soft-card p-5 text-sm text-muted">No corrections have been issued this week.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-page">
          <SectionHeading
            eyebrow="Journalist governance"
            title="Reporters are accountable members, not anonymous content producers."
            body="Profiles surface beat history, correction records, evidence reliability, and governance participation."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {journalists.map((journalist) => (
              <JournalistCard journalist={journalist} key={journalist.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band border-t border-maroon/20 bg-maroon text-cream">
        <div className="container-page grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-peach">Public mission</p>
            <h2 className="font-editorial mt-2 text-4xl font-black leading-[1.04] md:text-6xl">
              Journalism with constitutional memory.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-cream/78">
              AAZADI exists to make civic truth inspectable: records, revisions, governance decisions, and public corrections remain attached to the journalism they support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link className="button-primary border-peach bg-peach text-obsidian hover:bg-peach-soft" href="/constitution">
              Read constitution
            </Link>
            <Link className="button-secondary border-cream/40 text-cream hover:bg-cream/10" href="/apply">
              Apply as journalist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroMetric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Scale;
  label: string;
  value: string;
}) {
  return (
    <div className="soft-card p-3">
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
        <Icon size={15} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold capitalize text-obsidian">{value}</dd>
    </div>
  );
}
