import { MapPinned, Radio } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { regionalDesks } from "@/lib/data";

export const metadata = {
  title: "Regional Desks",
  description: "AAZADI regional newsroom structures."
};

export default function RegionalDesksPage() {
  return (
    <NewsroomShell
      eyebrow="Regional Desks"
      title="Federation-ready civic desks."
      body="Regional desks organize pulse records, local investigations, journalists, civic issues, and structured archives without becoming social feeds."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {regionalDesks.map((desk) => (
          <article className="soft-card p-5" key={desk.slug}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{desk.scope} / {desk.region}</p>
                <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">{desk.name}</h2>
              </div>
              <MapPinned className="text-maroon" size={22} aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{desk.summary}</p>
            <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
              <DeskMetric label="Pulse" value={desk.pulseCount} />
              <DeskMetric label="Investigations" value={desk.activeInvestigations} />
              <DeskMetric label="Evidence" value={desk.evidenceReviews} />
            </dl>
            <div className="mt-5 border-t border-maroon/15 pt-4">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
                <Radio size={14} aria-hidden="true" />
                Civic issues
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {desk.civicIssues.map((issue) => (
                  <span className="rounded-full border border-maroon/15 bg-cream px-2.5 py-1 text-xs font-bold text-muted" key={issue}>
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </NewsroomShell>
  );
}

function DeskMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-maroon/15 bg-cream/60 p-3" style={{ borderRadius: 8 }}>
      <dt className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-maroon">{label}</dt>
      <dd className="font-editorial text-2xl font-black text-obsidian">{value}</dd>
    </div>
  );
}
