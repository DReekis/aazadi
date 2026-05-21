import Link from "next/link";
import { CorrectionCard } from "@/components/correction-card";
import { articles, corrections } from "@/lib/data";

export const metadata = {
  title: "Correction History",
  description: "Public correction history across AAZADI articles."
};

export default function CorrectionsPage() {
  return (
    <div className="container-page section-band">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="eyebrow">Public correction history</p>
          <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
            Corrections stay attached to the record.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            AAZADI treats correction history as a trust surface. Corrections are not buried in footnotes or silently overwritten.
          </p>
        </div>
        <div className="soft-card p-5">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">Archive status</p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <dt className="text-sm font-bold text-muted">Articles</dt>
              <dd className="font-editorial text-3xl font-black text-obsidian">{articles.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-muted">Corrections</dt>
              <dd className="font-editorial text-3xl font-black text-obsidian">{corrections.length}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="grid gap-3">
        {corrections.length ? (
          corrections.map((correction) => <CorrectionCard correction={correction} key={correction.id} />)
        ) : (
          <div className="soft-card p-6">
            <h2 className="font-editorial text-2xl font-black text-obsidian">No corrections recorded yet</h2>
            <p className="mt-2 text-sm leading-6 text-muted">The correction archive will populate as public records require amendment.</p>
          </div>
        )}
      </div>
      <Link className="button-secondary mt-6" href="/governance">
        View governance log
      </Link>
    </div>
  );
}
