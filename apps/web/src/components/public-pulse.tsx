import Link from "next/link";
import { Clock3, FileText, MapPinned } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { PublicPulseItem, PulseZone } from "@/types/domain";

const zones: PulseZone[] = ["India", "World", "States", "Cities"];

export function PublicPulse({ items }: { items: PublicPulseItem[] }) {
  const lead = items[0];

  return (
    <section className="section-band border-y border-maroon/20 bg-paper-deep/65">
      <div className="container-page">
        <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Public Pulse</p>
            <h2 className="font-editorial mt-2 text-4xl font-black leading-[1.02] text-obsidian md:text-6xl">
              A structured civic awareness layer.
            </h2>
          </div>
          <p className="text-sm leading-6 text-muted lg:text-right">
            Not a ticker and not a feed. Pulse items are classified by geography, issue, urgency, verification state, and evidence count before they reach the public surface.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <article className="obsidian-panel p-5" style={{ borderRadius: 8 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-peach">
                  {lead.zone} / {lead.region}
                </p>
                <h3 className="font-editorial mt-3 text-3xl font-black leading-tight text-cream">
                  {lead.headline}
                </h3>
              </div>
              <span className="rounded-full border border-peach/30 px-2.5 py-1 text-xs font-black text-peach">
                {lead.urgency}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-cream/74">{lead.summary}</p>
            <div className="mt-5 grid gap-3 border-t border-cream/12 pt-4 text-sm text-cream/72 sm:grid-cols-3">
              <PulseMeta icon={Clock3} label="Updated" value={formatDate(lead.updatedAt)} />
              <PulseMeta icon={FileText} label="Evidence" value={`${lead.evidenceCount} items`} />
              <PulseMeta icon={MapPinned} label="Desk" value={lead.desk} />
            </div>
            {lead.linkedArticleSlug ? (
              <Link className="button-primary mt-5 border-peach bg-peach text-obsidian hover:bg-peach-soft" href={`/articles/${lead.linkedArticleSlug}`}>
                Open linked record
              </Link>
            ) : null}
          </article>

          <div className="grid gap-3 md:grid-cols-2">
            {zones.map((zone) => (
              <div className="soft-card p-4" key={zone}>
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-maroon/15 pb-3">
                  <h3 className="font-editorial text-2xl font-black text-obsidian">{zone}</h3>
                  <span className="text-xs font-black uppercase tracking-[0.08em] text-maroon">
                    {items.filter((item) => item.zone === zone).length} records
                  </span>
                </div>
                <div className="space-y-3">
                  {items
                    .filter((item) => item.zone === zone)
                    .slice(0, 3)
                    .map((item) => (
                      <PulseRow item={item} key={item.id} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PulseRow({ item }: { item: PublicPulseItem }) {
  const content = (
    <div className="border-t border-maroon/12 pt-3 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-maroon">
        <span>{item.region}</span>
        <span className="text-line">/</span>
        <span>{item.category}</span>
        <span className="text-line">/</span>
        <span>{item.verificationState}</span>
      </div>
      <p className="mt-1 text-sm font-bold leading-5 text-obsidian">{item.headline}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{item.evidenceCount} evidence items · {item.urgency}</p>
    </div>
  );

  return item.linkedArticleSlug ? (
    <Link className="focus-ring block" href={`/articles/${item.linkedArticleSlug}`}>
      {content}
    </Link>
  ) : (
    content
  );
}

function PulseMeta({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-peach">
        <Icon size={14} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 font-semibold text-cream">{value}</p>
    </div>
  );
}
