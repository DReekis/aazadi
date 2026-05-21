import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, FileText, History, MessageSquareText, UserRound } from "lucide-react";
import { EvidenceLedger } from "@/components/evidence-ledger";
import { IntegrityPanel } from "@/components/integrity-panel";
import { StructuredDiscussion } from "@/components/structured-discussion";
import { articles, getArticle } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.subtitle
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <article className="border-b border-maroon/20 bg-paper">
        <div className="container-page grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:py-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
              <span>{article.category}</span>
              <span className="text-line">/</span>
              <span>{article.region}</span>
              <span className="text-line">/</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <h1 className="font-editorial mt-4 max-w-5xl text-5xl font-black leading-[0.98] text-obsidian md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-muted">{article.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-muted">
              <Link className="focus-ring flex items-center gap-2 hover:text-maroon" href={`/journalists/${article.author.slug}`}>
                <UserRound size={17} className="text-maroon" aria-hidden="true" />
                {article.author.name}
              </Link>
              <span className="flex items-center gap-2">
                <Clock3 size={17} className="text-maroon" aria-hidden="true" />
                {article.readingMinutes} min read
              </span>
              <span className="flex items-center gap-2">
                <FileText size={17} className="text-maroon" aria-hidden="true" />
                {article.evidence.length} evidence records
              </span>
              <span className="flex items-center gap-2">
                <History size={17} className="text-maroon" aria-hidden="true" />
                {article.revisions.length} revisions
              </span>
            </div>
          </div>
          <IntegrityPanel article={article} />
        </div>
        <div className="container-page pb-8">
          <div className="relative min-h-[300px] overflow-hidden rounded-[8px] border border-maroon/20 bg-paper-deep md:min-h-[520px]">
            <Image
              alt={article.imageAlt}
              className="object-cover grayscale-[10%]"
              fill
              priority
              sizes="100vw"
              src={article.imageUrl}
            />
          </div>
        </div>
      </article>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[minmax(0,760px)_310px] lg:items-start">
        <div>
          <div className="story-body">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            <EvidenceLedger evidence={article.evidence} />

            <section className="space-y-3" id="revisions">
              <div>
                <p className="eyebrow">Revision history</p>
                <h2 className="font-editorial mt-1 text-3xl font-black text-obsidian">No silent edits</h2>
              </div>
              <div className="grid gap-3">
                {article.revisions.map((revision) => (
                  <article className="soft-card p-4" key={`${revision.version}-${revision.timestamp}`}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">
                          Version {revision.version}
                        </p>
                        <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{revision.summary}</h3>
                      </div>
                      <p className="text-sm font-bold text-muted">{formatDate(revision.timestamp)}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">{revision.diff}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted">Editor: {revision.editor}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-3" id="corrections">
              <div>
                <p className="eyebrow">Correction history</p>
                <h2 className="font-editorial mt-1 text-3xl font-black text-obsidian">Visible corrections</h2>
              </div>
              {article.corrections.length ? (
                <div className="grid gap-3">
                  {article.corrections.map((correction) => (
                    <article className="soft-card p-4" key={correction.id}>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">
                        {correction.severity} / {correction.status}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">{correction.summary}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted">
                        Issued {formatDate(correction.issuedAt)}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="soft-card p-5 text-sm leading-6 text-muted">
                  No correction has been issued for this article.
                </div>
              )}
            </section>

            <StructuredDiscussion comments={article.comments} />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[98px]">
          <div className="soft-card p-4">
            <p className="eyebrow">Journalist</p>
            <h2 className="font-editorial mt-1 text-2xl font-black text-obsidian">{article.author.name}</h2>
            <p className="mt-1 text-sm font-bold text-maroon">{article.author.title}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{article.author.bio}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-maroon/15 pt-3 text-sm">
              <div>
                <dt className="font-black text-maroon">Reliability</dt>
                <dd className="font-editorial text-2xl font-black">{article.author.reliabilityScore}</dd>
              </div>
              <div>
                <dt className="font-black text-maroon">Verified reports</dt>
                <dd className="font-editorial text-2xl font-black">{article.author.verifiedReports}</dd>
              </div>
            </dl>
            <Link className="button-secondary mt-4 w-full" href={`/journalists/${article.author.slug}`}>
              View profile
            </Link>
          </div>
          <div className="obsidian-panel p-4" style={{ borderRadius: 8 }}>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-peach">Reader actions</p>
            <div className="mt-3 grid gap-2">
              <a className="button-primary border-peach bg-peach text-obsidian hover:bg-peach-soft" href="#evidence">
                Inspect evidence
              </a>
              <a className="button-secondary border-cream/30 text-cream hover:bg-cream/10" href="#corrections">
                View corrections
              </a>
              <a className="button-secondary border-cream/30 text-cream hover:bg-cream/10" href="#revisions">
                View revisions
              </a>
            </div>
          </div>
          <div className="soft-card p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
              <MessageSquareText size={15} aria-hidden="true" />
              Discussion structure
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Contributions are routed as correction suggestions, evidence challenges, contextual additions, or public discussion.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
