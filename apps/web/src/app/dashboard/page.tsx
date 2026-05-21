import Link from "next/link";
import { Clock3, FilePlus2, FileUp, History, Landmark, PenLine, ShieldCheck } from "lucide-react";
import { articles, governanceLogs, journalists } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Journalist Dashboard",
  description: "AAZADI journalist dashboard for drafts, evidence, reputation, and governance."
};

export default function DashboardPage() {
  const journalist = journalists[0];
  const draft = articles[0];

  return (
    <div className="container-page section-band">
      <div className="mb-8 flex flex-col gap-4 border-b border-maroon/20 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Journalist dashboard</p>
          <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
            Evidence, drafts, revisions, governance.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            A calm working surface for public-interest reporting. V1 keeps the core workflows visible without imitating social media.
          </p>
        </div>
        <Link className="button-primary" href="/articles/audit-trail-missing-school-meals">
          <PenLine size={17} aria-hidden="true" />
          Continue draft
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <main className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <DashboardMetric icon={ShieldCheck} label="Reliability" value={`${journalist.reliabilityScore}`} />
            <DashboardMetric icon={FileUp} label="Evidence uploads" value="17" />
            <DashboardMetric icon={History} label="Open revisions" value="3" />
            <DashboardMetric icon={Landmark} label="Gov actions" value="6" />
          </section>

          <section className="soft-card p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">Draft workspace</p>
                <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">{draft.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{draft.subtitle}</p>
              </div>
              <span className="rounded-full border border-maroon/20 bg-cream px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-maroon">
                Review pending
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <WorkflowCard icon={FilePlus2} title="Article draft" body="Title, subtitle, claims, category, region, and publication readiness." />
              <WorkflowCard icon={FileUp} title="Evidence upload" body="Images, PDFs, external links, and transcripts with verification state." />
              <WorkflowCard icon={History} title="Revision trail" body="Substantial edits require public summaries before publication." />
            </div>
          </section>

          <section className="soft-card p-5">
            <p className="eyebrow">Revision history</p>
            <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Your recent article changes</h2>
            <div className="mt-4 grid gap-3">
              {draft.revisions.map((revision) => (
                <article className="border-t border-maroon/15 pt-3" key={revision.version}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-obsidian">Version {revision.version}: {revision.summary}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{formatDate(revision.timestamp)}</p>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted">{revision.diff}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-5">
          <section className="obsidian-panel p-5" style={{ borderRadius: 8 }}>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-peach">Reputation metrics</p>
            <dl className="mt-4 space-y-4">
              <SideMetric label="Verified reports" value={`${journalist.verifiedReports}`} />
              <SideMetric label="Corrections issued" value={`${journalist.correctionsIssued}`} />
              <SideMetric label="Governance participation" value={`${journalist.governanceParticipation}%`} />
            </dl>
          </section>
          <section className="soft-card p-5">
            <p className="eyebrow">Governance participation</p>
            <h2 className="font-editorial mt-2 text-2xl font-black text-obsidian">Open institutional items</h2>
            <div className="mt-4 grid gap-3">
              {governanceLogs.slice(0, 2).map((log) => (
                <article className="border-t border-maroon/15 pt-3" key={log.id}>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{log.category.replace("_", " ")}</p>
                  <h3 className="mt-1 text-sm font-bold leading-5 text-obsidian">{log.title}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="soft-card p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
              <Clock3 size={15} aria-hidden="true" />
              Review cadence
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Evidence awaiting verification is reviewed before publication and again when challenged by structured public input.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function DashboardMetric({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <Icon className="text-maroon" size={19} aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="font-editorial mt-1 text-3xl font-black text-obsidian">{value}</p>
    </div>
  );
}

function WorkflowCard({ icon: Icon, title, body }: { icon: typeof FilePlus2; title: string; body: string }) {
  return (
    <div className="border border-maroon/15 bg-cream/60 p-4" style={{ borderRadius: 8 }}>
      <Icon className="text-maroon" size={20} aria-hidden="true" />
      <h3 className="font-editorial mt-2 text-xl font-black text-obsidian">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

function SideMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-cream/12 pt-3">
      <dt className="text-xs font-black uppercase tracking-[0.08em] text-peach">{label}</dt>
      <dd className="font-editorial mt-1 text-3xl font-black text-cream">{value}</dd>
    </div>
  );
}
