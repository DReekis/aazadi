import Link from "next/link";
import { MapPinned, ShieldCheck } from "lucide-react";
import type { CivicMapRegion } from "@/types/domain";

export function CivicMapPanel({ regions, compact = false }: { regions: CivicMapRegion[]; compact?: boolean }) {
  const maxPulse = Math.max(...regions.map((region) => region.pulseCount));

  return (
    <section className={compact ? "" : "section-band"}>
      <div className={compact ? "" : "container-page"}>
        <div className="mb-5 flex flex-col gap-3 border-t border-maroon/20 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Civic map</p>
            <h2 className="font-editorial mt-2 text-3xl font-black leading-tight text-obsidian md:text-5xl">
              A living map of public reality.
            </h2>
          </div>
          <Link className="button-secondary w-fit" href="/civic-map">
            <MapPinned size={17} aria-hidden="true" />
            Browse map
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="soft-card relative min-h-[320px] overflow-hidden p-5">
            <div className="absolute inset-0 opacity-[0.18]">
              <div className="h-full w-full bg-[linear-gradient(90deg,rgba(90,23,35,.35)_1px,transparent_1px),linear-gradient(rgba(90,23,35,.35)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
            <div className="relative h-[320px]">
              {regions.map((region) => {
                const left = Math.max(8, Math.min(88, ((region.lng - 68) / 30) * 100));
                const top = Math.max(10, Math.min(84, ((36 - region.lat) / 30) * 100));
                const size = 18 + (region.pulseCount / maxPulse) * 34;
                return (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    key={region.id}
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full border border-peach bg-maroon text-[0.68rem] font-black text-cream shadow-[var(--shadow-editorial)]"
                      style={{ width: size, height: size }}
                      title={`${region.name}: ${region.issue}`}
                    >
                      {region.pulseCount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {regions.map((region) => (
              <article className="soft-card p-4" key={region.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">
                      {region.scope} / {region.issue}
                    </p>
                    <h3 className="font-editorial mt-1 text-2xl font-black text-obsidian">{region.name}</h3>
                  </div>
                  <span className="flex items-center gap-1 rounded-full border border-maroon/15 bg-cream px-2 py-1 text-xs font-black text-maroon">
                    <ShieldCheck size={13} aria-hidden="true" />
                    {region.verificationState}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {region.pulseCount} pulse records and {region.investigationCount} active investigations.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
