import { GovernanceCard } from "@/components/governance-card";
import { SectionHeading } from "@/components/section-heading";
import { governanceLogs } from "@/lib/data";

export const metadata = {
  title: "Governance Log",
  description: "Public governance log for AAZADI institutional decisions."
};

export default function GovernancePage() {
  return (
    <div className="container-page section-band">
      <SectionHeading
        eyebrow="Governance log"
        title="Public decisions, preserved in order."
        body="Journalist approvals, policy changes, correction reviews, moderation actions, and security disclosures belong in the public record."
      />
      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="soft-card h-fit p-5">
          <p className="eyebrow">Governance model</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Transparent authority</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            AAZADI treats governance as a first-class product surface. Decisions that affect trust are logged, categorized, and visible.
          </p>
          <dl className="mt-5 grid gap-3">
            {["Journalist approval", "Moderation disclosure", "Correction adjudication", "Policy amendment"].map((item) => (
              <div className="border-t border-maroon/15 pt-3" key={item}>
                <dt className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{item}</dt>
                <dd className="mt-1 text-sm text-muted">Logged with actor, timestamp, public summary, and outcome.</dd>
              </div>
            ))}
          </dl>
        </aside>
        <main className="grid gap-3">
          {governanceLogs.map((log) => (
            <GovernanceCard log={log} key={log.id} />
          ))}
        </main>
      </div>
    </div>
  );
}
