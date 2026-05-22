import { Archive, FileSearch } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { evidenceVaultRecords } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Evidence Vault",
  description: "AAZADI structured evidence archive."
};

export default function EvidenceVaultPage() {
  return (
    <NewsroomShell
      eyebrow="Evidence Vault"
      title="Forensic public-record archive."
      body="Images, PDFs, source links, transcripts, and official records are preserved with custody state, verification status, uploader, timestamp, and integrity metadata."
    >
      <div className="space-y-5">
        <section className="grid gap-3 md:grid-cols-5">
          {["images", "PDFs", "source links", "transcripts", "official records"].map((type) => (
            <div className="soft-card p-4" key={type}>
              <Archive className="text-maroon" size={18} aria-hidden="true" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-muted">{type}</p>
              <p className="font-editorial mt-1 text-3xl font-black text-obsidian">
                {type === "official records" ? evidenceVaultRecords.filter((record) => record.officialRecord).length : evidenceVaultRecords.length}
              </p>
            </div>
          ))}
        </section>
        <section className="soft-card p-5">
          <p className="eyebrow">Vault index</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Searchable evidence custody records</h2>
          <div className="mt-4 grid gap-3">
            {evidenceVaultRecords.map((record) => (
              <article className="grid gap-3 border-t border-maroon/15 pt-3 lg:grid-cols-[1fr_220px]" key={record.id}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{record.id} / {record.type.replace("_", " ")} / {record.verificationState.replace("_", " ")}</p>
                  <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{record.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{record.summary}</p>
                </div>
                <div className="text-sm text-muted lg:text-right">
                  <p className="font-black text-maroon">{record.custodyState}</p>
                  <p>{record.desk}</p>
                  <p>{formatDate(record.uploadedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="obsidian-panel p-5" style={{ borderRadius: 8 }}>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-peach">
            <FileSearch size={15} aria-hidden="true" />
            Forensic standard
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-cream/74">
            The vault is not generic file storage. Every record is attached to a civic claim, evidence type, custody state, verification trail, and eventual public article or archive.
          </p>
        </section>
      </div>
    </NewsroomShell>
  );
}
