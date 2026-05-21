import { ExternalLink, FileImage, FileText, Link2, ScrollText } from "lucide-react";
import { formatDate } from "@/lib/format";
import { TrustPill } from "@/components/trust-pill";
import type { EvidenceItem } from "@/types/domain";

const icons = {
  image: FileImage,
  pdf: FileText,
  external_link: Link2,
  transcript: ScrollText
};

export function EvidenceLedger({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <section className="space-y-3" id="evidence">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Evidence ledger</p>
          <h2 className="font-editorial mt-1 text-3xl font-black text-obsidian">Documents behind the story</h2>
        </div>
        <span className="text-sm font-black text-maroon">{evidence.length} items</span>
      </div>
      <div className="grid gap-3">
        {evidence.map((item) => {
          const Icon = icons[item.type];
          return (
            <article className="soft-card p-4" key={item.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-maroon text-cream">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-black leading-tight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.summary}</p>
                  </div>
                </div>
                <TrustPill state={item.verificationState} />
              </div>
              <dl className="mt-4 grid gap-3 border-t border-maroon/15 pt-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted sm:grid-cols-3">
                <div>
                  <dt className="text-maroon">Uploader</dt>
                  <dd className="mt-1 normal-case tracking-normal text-ink">{item.uploader}</dd>
                </div>
                <div>
                  <dt className="text-maroon">Uploaded</dt>
                  <dd className="mt-1 normal-case tracking-normal text-ink">{formatDate(item.uploadedAt)}</dd>
                </div>
                <div>
                  <dt className="text-maroon">Type</dt>
                  <dd className="mt-1 flex items-center gap-1 normal-case tracking-normal text-ink">
                    {item.type.replace("_", " ")}
                    {item.sourceUrl ? <ExternalLink size={13} aria-hidden="true" /> : null}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
