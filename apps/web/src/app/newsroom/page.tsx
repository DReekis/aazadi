import Link from "next/link";
import { AlertTriangle, Archive, FileSearch, FileText, Landmark, Radio, ShieldCheck } from "lucide-react";
import { CivicMapPanel } from "@/components/civic-map-panel";
import { NewsroomShell } from "@/components/newsroom-shell";
import { StructuredSubmissionForm } from "@/components/structured-submission-form";
import { TaxonomyPanel } from "@/components/taxonomy-panel";
import {
  civicMapRegions,
  evidenceVaultRecords,
  governanceProposals,
  investigationWorkspaces,
  publicPulseItems,
  regionalDesks
} from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "The Newsroom",
  description: "AAZADI constitutional newsroom operating system."
};

export default function NewsroomPage() {
  return (
    <NewsroomShell
      eyebrow="The Newsroom"
      title="Constitutional newsroom operating system."
      body="The internal command center for active investigations, evidence review, civic pulse, regional desks, governance alerts, correction requests, and journalist activity."
    >
      <div className="space-y-6">
        <section className="grid gap-3 md:grid-cols-4">
          <CommandMetric icon={FileSearch} label="Active investigations" value={`${investigationWorkspaces.length}`} />
          <CommandMetric icon={FileText} label="Review queue" value="6" />
          <CommandMetric icon={Archive} label="Evidence reviews" value={`${evidenceVaultRecords.filter((item) => item.custodyState !== "Cleared").length}`} />
          <CommandMetric icon={Landmark} label="Governance alerts" value={`${governanceProposals.filter((proposal) => proposal.status !== "Resolved").length}`} />
        </section>

        <section className="soft-card p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">Active investigations</p>
              <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Repository-style reporting workspaces</h2>
            </div>
            <Link className="button-primary" href="/newsroom/investigations/school-meal-contracts-repository">
              Open workspace
            </Link>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {investigationWorkspaces.map((workspace) => (
              <Link className="focus-ring border border-maroon/15 bg-cream/60 p-4" style={{ borderRadius: 8 }} href={`/newsroom/investigations/${workspace.slug}`} key={workspace.slug}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{workspace.desk} / {workspace.status}</p>
                <h3 className="font-editorial mt-2 text-2xl font-black text-obsidian">{workspace.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{workspace.evidenceIds.length} evidence records · {workspace.collaborators.length + 1} collaborators</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="soft-card p-5">
            <p className="eyebrow">Regional pulse</p>
            <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Desk activity</h2>
            <div className="mt-4 grid gap-3">
              {regionalDesks.slice(0, 4).map((desk) => (
                <article className="border-t border-maroon/15 pt-3" key={desk.slug}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-editorial text-xl font-black text-obsidian">{desk.name}</h3>
                    <span className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{desk.pulseCount} pulse</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted">{desk.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="obsidian-panel p-5" style={{ borderRadius: 8 }}>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-peach">Governance alerts</p>
            <div className="mt-4 grid gap-3">
              {governanceProposals.map((proposal) => (
                <article className="border-t border-cream/12 pt-3" key={proposal.id}>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-peach">
                    <AlertTriangle size={14} aria-hidden="true" />
                    {proposal.id} / {proposal.status}
                  </p>
                  <h3 className="font-editorial mt-1 text-xl font-black text-cream">{proposal.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TaxonomyPanel />

        <StructuredSubmissionForm />

        <section className="soft-card p-5">
          <p className="eyebrow">Public pulse management</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Current civic awareness records</h2>
          <div className="mt-4 grid gap-3">
            {publicPulseItems.slice(0, 5).map((item) => (
              <article className="grid gap-3 border-t border-maroon/15 pt-3 md:grid-cols-[1fr_150px]" key={item.id}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{item.zone} / {item.region} / {item.verificationState}</p>
                  <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{item.headline}</h3>
                </div>
                <p className="flex items-center gap-2 text-sm font-bold text-muted md:justify-end">
                  <Radio size={15} className="text-maroon" aria-hidden="true" />
                  {formatDate(item.updatedAt)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <CivicMapPanel compact regions={civicMapRegions} />
      </div>
    </NewsroomShell>
  );
}

function CommandMetric({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <Icon className="text-maroon" size={20} aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="font-editorial mt-1 text-3xl font-black text-obsidian">{value}</p>
    </div>
  );
}
