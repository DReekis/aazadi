import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archive, GitBranch, MessageSquareText, UsersRound } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { evidenceVaultRecords, getInvestigationWorkspace, investigationWorkspaces } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return investigationWorkspaces.map((workspace) => ({ slug: workspace.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const workspace = getInvestigationWorkspace(slug);
  return workspace ? { title: workspace.title, description: "AAZADI investigation workspace." } : {};
}

export default async function InvestigationWorkspacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workspace = getInvestigationWorkspace(slug);

  if (!workspace) {
    notFound();
  }

  const evidence = evidenceVaultRecords.filter((record) => workspace.evidenceIds.includes(record.id));

  return (
    <NewsroomShell
      eyebrow="Investigation workspace"
      title={workspace.title}
      body="A collaborative journalism repository: draft state, evidence attachments, source tracking, timeline, review threads, and publication workflow remain auditable."
    >
      <div className="space-y-6">
        <section className="grid gap-3 md:grid-cols-4">
          <WorkspaceMetric icon={GitBranch} label="Workflow state" value={workspace.status} />
          <WorkspaceMetric icon={Archive} label="Evidence" value={`${evidence.length} records`} />
          <WorkspaceMetric icon={UsersRound} label="Collaborators" value={`${workspace.collaborators.length + 1}`} />
          <WorkspaceMetric icon={MessageSquareText} label="Threads" value={`${workspace.discussionThreads.length}`} />
        </section>

        <section className="soft-card p-5">
          <p className="eyebrow">Publication workflow</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Draft to archive, with no silent transitions</h2>
          <div className="mt-5 grid gap-2 md:grid-cols-7">
            {workspace.publicationWorkflow.map((step) => (
              <div className="border border-maroon/15 bg-cream/60 p-3" style={{ borderRadius: 8 }} key={step.step}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{step.status}</p>
                <p className="mt-1 text-sm font-black text-obsidian">{step.step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="soft-card p-5">
            <p className="eyebrow">Timeline</p>
            <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Repository events</h2>
            <div className="mt-4 grid gap-3">
              {workspace.timeline.map((item) => (
                <article className="border-l-2 border-maroon/30 pl-4" key={`${item.date}-${item.event}`}>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{item.state}</p>
                  <h3 className="font-bold text-obsidian">{item.event}</h3>
                  <p className="text-sm text-muted">{formatDate(item.date)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="soft-card p-5">
            <p className="eyebrow">Source tracking</p>
            <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Protection and status</h2>
            <div className="mt-4 grid gap-3">
              {workspace.sourceTracking.map((source) => (
                <article className="border-t border-maroon/15 pt-3" key={source.source}>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{source.status}</p>
                  <h3 className="font-bold text-obsidian">{source.source}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{source.protection}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="soft-card p-5">
          <p className="eyebrow">Evidence attachments</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Linked records from the Evidence Vault</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {evidence.map((record) => (
              <article className="border border-maroon/15 bg-cream/60 p-4" style={{ borderRadius: 8 }} key={record.id}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{record.id} / {record.custodyState}</p>
                <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{record.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{record.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="soft-card p-5">
          <p className="eyebrow">Discussion threads</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Structured collaboration</h2>
          <div className="mt-4 grid gap-3">
            {workspace.discussionThreads.map((thread) => (
              <article className="grid gap-3 border-t border-maroon/15 pt-3 sm:grid-cols-[1fr_140px]" key={thread.title}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{thread.type} / {thread.status}</p>
                  <h3 className="font-bold text-obsidian">{thread.title}</h3>
                </div>
                <p className="text-sm font-black text-muted sm:text-right">{thread.comments} comments</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </NewsroomShell>
  );
}

function WorkspaceMetric({ icon: Icon, label, value }: { icon: typeof Archive; label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <Icon className="text-maroon" size={20} aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="font-editorial mt-1 text-2xl font-black text-obsidian">{value}</p>
    </div>
  );
}
