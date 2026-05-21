import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Correction } from "@/types/domain";

export function CorrectionCard({ correction }: { correction: Correction }) {
  return (
    <article className="soft-card p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-maroon text-cream">
          <ClipboardCheck size={18} aria-hidden="true" />
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.08em] text-maroon">
            {correction.severity} / {correction.status}
          </div>
          <Link className="focus-ring" href={`/articles/${correction.articleSlug}`}>
            <h3 className="font-editorial mt-1 text-xl font-black leading-tight text-obsidian">
              {correction.articleTitle}
            </h3>
          </Link>
          <p className="mt-2 text-sm leading-6 text-muted">{correction.summary}</p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted">{formatDate(correction.issuedAt)}</p>
        </div>
      </div>
    </article>
  );
}
