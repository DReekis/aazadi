import { Archive, FileClock, Landmark, ShieldCheck } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { corrections, governanceLogs, investigationWorkspaces } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Constitutional Records System",
  description: "AAZADI public record system."
};

export default function ConstitutionalRecordsPage() {
  return (
    <NewsroomShell
      eyebrow="Public Record System"
      title="Constitutional memory for the institution."
      body="Corrections, governance decisions, investigation workflow transitions, and archival states remain preserved as inspectable civic records."
    >
      <div className="space-y-6">
        <section className="grid gap-3 md:grid-cols-4">
          <RecordMetric icon={Landmark} label="Governance logs" value={`${governanceLogs.length}`} />
          <RecordMetric icon={FileClock} label="Corrections" value={`${corrections.length}`} />
          <RecordMetric icon={Archive} label="Repositories" value={`${investigationWorkspaces.length}`} />
          <RecordMetric icon={ShieldCheck} label="Audit posture" value="Active" />
        </section>
        <section className="soft-card p-5">
          <p className="eyebrow">Institutional record</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Recent preserved actions</h2>
          <div className="mt-4 grid gap-3">
            {governanceLogs.map((log) => (
              <article className="border-t border-maroon/15 pt-3" key={log.id}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{log.id} / {log.category.replace("_", " ")}</p>
                <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{log.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{log.outcome} · {formatDate(log.timestamp)}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </NewsroomShell>
  );
}

function RecordMetric({ icon: Icon, label, value }: { icon: typeof Archive; label: string; value: string }) {
  return (
    <div className="soft-card p-4">
      <Icon className="text-maroon" size={20} aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="font-editorial mt-1 text-3xl font-black text-obsidian">{value}</p>
    </div>
  );
}
