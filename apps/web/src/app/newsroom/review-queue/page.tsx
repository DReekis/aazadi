import Link from "next/link";
import { CheckCircle2, Clock3, FileText } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { evidenceVaultRecords, investigationWorkspaces, publicPulseItems } from "@/lib/data";

export const metadata = {
  title: "Editorial Review Queue",
  description: "AAZADI structured editorial workflow."
};

const workflow = ["Draft", "Review", "Evidence Verification", "Editorial Approval", "Publish", "Corrections Layer", "Archive"];

export default function ReviewQueuePage() {
  const queue = [
    ...investigationWorkspaces.map((item) => ({
      title: item.title,
      type: "Investigation",
      state: item.status,
      href: `/newsroom/investigations/${item.slug}`
    })),
    ...publicPulseItems.slice(0, 3).map((item) => ({
      title: item.headline,
      type: "Pulse Update",
      state: item.verificationState,
      href: "/newsroom/public-pulse"
    })),
    ...evidenceVaultRecords.filter((item) => item.custodyState !== "Cleared").slice(0, 3).map((item) => ({
      title: item.title,
      type: "Evidence",
      state: item.custodyState,
      href: "/newsroom/evidence-vault"
    }))
  ];

  return (
    <NewsroomShell
      eyebrow="Editorial Review Queue"
      title="Draft to archive, auditable by design."
      body="The workflow enforces the newsroom sequence: Draft, Review, Evidence Verification, Editorial Approval, Publish, Corrections Layer, Archive."
    >
      <div className="space-y-6">
        <section className="soft-card p-5">
          <p className="eyebrow">Workflow spine</p>
          <div className="mt-4 grid gap-2 md:grid-cols-7">
            {workflow.map((step, index) => (
              <div className="border border-maroon/15 bg-cream/60 p-3" style={{ borderRadius: 8 }} key={step}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">Step {index + 1}</p>
                <p className="mt-1 text-sm font-black text-obsidian">{step}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="soft-card p-5">
          <p className="eyebrow">Queue</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Items awaiting institutional action</h2>
          <div className="mt-4 grid gap-3">
            {queue.map((item) => (
              <Link className="focus-ring grid gap-3 border-t border-maroon/15 pt-3 sm:grid-cols-[1fr_170px]" href={item.href} key={`${item.type}-${item.title}`}>
                <div>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
                    <FileText size={14} aria-hidden="true" />
                    {item.type}
                  </p>
                  <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{item.title}</h3>
                </div>
                <p className="flex items-center gap-2 text-sm font-black text-muted sm:justify-end">
                  {item.state === "Verified" || item.state === "Cleared" ? <CheckCircle2 size={15} className="text-maroon" aria-hidden="true" /> : <Clock3 size={15} className="text-maroon" aria-hidden="true" />}
                  {item.state}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </NewsroomShell>
  );
}
