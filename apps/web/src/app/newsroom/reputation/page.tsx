import { BadgeCheck, FileCheck2, Landmark, Scale } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { journalists } from "@/lib/data";

export const metadata = {
  title: "Journalist Reputation Center",
  description: "AAZADI journalist accountability and reputation center."
};

export default function ReputationCenterPage() {
  return (
    <NewsroomShell
      eyebrow="Journalist Reputation Center"
      title="Accountability metrics with civic context."
      body="Reputation is not popularity. It is built from verified reports, correction history, governance participation, and evidence practice."
    >
      <div className="grid gap-4">
        {journalists.map((journalist) => (
          <article className="soft-card p-5" key={journalist.slug}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{journalist.region}</p>
                <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">{journalist.name}</h2>
                <p className="mt-1 text-sm font-bold text-maroon">{journalist.title}</p>
              </div>
              <BadgeCheck className="text-maroon" size={24} aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{journalist.bio}</p>
            <dl className="mt-5 grid gap-2 sm:grid-cols-4">
              <ReputationMetric icon={BadgeCheck} label="Reliability" value={`${journalist.reliabilityScore}`} />
              <ReputationMetric icon={FileCheck2} label="Verified reports" value={`${journalist.verifiedReports}`} />
              <ReputationMetric icon={Scale} label="Corrections" value={`${journalist.correctionsIssued}`} />
              <ReputationMetric icon={Landmark} label="Governance" value={`${journalist.governanceParticipation}%`} />
            </dl>
          </article>
        ))}
      </div>
    </NewsroomShell>
  );
}

function ReputationMetric({ icon: Icon, label, value }: { icon: typeof BadgeCheck; label: string; value: string }) {
  return (
    <div className="border border-maroon/15 bg-cream/60 p-3" style={{ borderRadius: 8 }}>
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
        <Icon size={14} aria-hidden="true" />
        {label}
      </dt>
      <dd className="font-editorial mt-1 text-2xl font-black text-obsidian">{value}</dd>
    </div>
  );
}
