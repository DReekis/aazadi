import { ShieldAlert } from "lucide-react";
import { governanceLogs } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Moderation Transparency",
  description: "Public moderation transparency page for AAZADI."
};

export default function ModerationTransparencyPage() {
  const moderationLogs = governanceLogs.filter((log) => log.category === "moderation");

  return (
    <div className="container-page section-band">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Moderation transparency</p>
        <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian">
          Structured discussion requires visible moderation.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          AAZADI moderates by civic function: evidence challenges, correction suggestions, contextual additions, and public discussion. Removals are logged when they affect public trust.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {["Unsupported personal allegation", "Duplicate claim without evidence", "Private information exposure"].map((rule) => (
          <div className="soft-card p-5" key={rule}>
            <ShieldAlert className="text-maroon" size={22} aria-hidden="true" />
            <h2 className="font-editorial mt-3 text-2xl font-black text-obsidian">{rule}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Removed or held for review with an appeal trail preserved for the affected participant.
            </p>
          </div>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="font-editorial text-3xl font-black text-obsidian">Recent moderation disclosures</h2>
        <div className="mt-4 grid gap-3">
          {moderationLogs.map((log) => (
            <article className="soft-card p-4" key={log.id}>
              <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{log.id} / {formatDate(log.timestamp)}</p>
              <h3 className="font-editorial mt-2 text-2xl font-black text-obsidian">{log.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{log.publicSummary}</p>
              <p className="mt-3 text-sm font-bold text-maroon">{log.outcome}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
