import { BadgeCheck, Fingerprint, History, Scale } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/domain";

export function IntegrityPanel({ article }: { article: Article }) {
  const items = [
    ["Verification", article.integrity.verificationStatus.replaceAll("_", " "), BadgeCheck],
    ["Evidence", `${article.integrity.evidenceCount} public items`, Scale],
    ["Revisions", `${article.integrity.revisionCount} visible records`, History],
    ["Integrity hash", article.integrity.canonicalHash, Fingerprint]
  ] as const;

  return (
    <aside className="soft-card sticky top-[98px] space-y-4 p-4">
      <div>
        <p className="eyebrow">Trust record</p>
        <h2 className="font-editorial mt-1 text-2xl font-black text-obsidian">Article integrity</h2>
      </div>
      <dl className="space-y-3">
        {items.map(([label, value, Icon]) => (
          <div className="border-t border-maroon/12 pt-3" key={label}>
            <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
              <Icon size={15} aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-1 break-words text-sm font-semibold leading-5 text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-maroon/12 pt-3">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">Last reviewed</p>
        <p className="mt-1 text-sm font-semibold text-ink">{formatDate(article.integrity.lastReviewedAt)}</p>
      </div>
      <a className="button-secondary w-full" href="#evidence">
        Inspect evidence
      </a>
    </aside>
  );
}
