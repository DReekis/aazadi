import { Landmark, ShieldAlert, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { GovernanceLog } from "@/types/domain";

export function GovernanceCard({ log }: { log: GovernanceLog }) {
  const Icon = log.category === "moderation" ? ShieldAlert : log.category === "security" ? ShieldCheck : Landmark;
  return (
    <article className="soft-card p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-obsidian text-peach">
          <Icon size={18} aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
            <span>{log.id}</span>
            <span className="text-line">/</span>
            <span>{log.category.replace("_", " ")}</span>
          </div>
          <h3 className="font-editorial mt-2 text-xl font-black leading-tight text-obsidian">{log.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{log.publicSummary}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 border-t border-maroon/15 pt-3 text-sm sm:grid-cols-2">
        <p>
          <span className="font-black text-maroon">Outcome:</span> {log.outcome}
        </p>
        <p className="sm:text-right">
          <span className="font-black text-maroon">Time:</span> {formatDate(log.timestamp)}
        </p>
      </div>
    </article>
  );
}
