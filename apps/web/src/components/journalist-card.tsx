import Link from "next/link";
import { BadgeCheck, FileCheck2, Scale } from "lucide-react";
import type { Journalist } from "@/types/domain";

export function JournalistCard({ journalist }: { journalist: Journalist }) {
  return (
    <article className="soft-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{journalist.region}</p>
          <Link className="focus-ring" href={`/journalists/${journalist.slug}`}>
            <h3 className="font-editorial mt-2 text-2xl font-black text-obsidian">{journalist.name}</h3>
          </Link>
          <p className="mt-1 text-sm font-bold text-maroon">{journalist.title}</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-obsidian font-editorial text-xl font-black text-peach">
          {journalist.name.split(" ").map((part) => part[0]).join("")}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{journalist.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {journalist.beats.map((beat) => (
          <span className="rounded-full border border-maroon/15 bg-cream/70 px-2.5 py-1 text-xs font-bold text-muted" key={beat}>
            {beat}
          </span>
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-maroon/15 pt-4 text-center">
        <Metric icon={BadgeCheck} label="Reliability" value={`${journalist.reliabilityScore}`} />
        <Metric icon={FileCheck2} label="Reports" value={`${journalist.verifiedReports}`} />
        <Metric icon={Scale} label="Gov" value={`${journalist.governanceParticipation}%`} />
      </dl>
    </article>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="mx-auto flex items-center justify-center text-maroon">
        <Icon size={16} aria-hidden="true" />
      </dt>
      <dd className="mt-1 font-editorial text-xl font-black text-obsidian">{value}</dd>
      <dd className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-muted">{label}</dd>
    </div>
  );
}
