import { Landmark, Scale } from "lucide-react";
import { NewsroomShell } from "@/components/newsroom-shell";
import { governanceProposals } from "@/lib/data";

export const metadata = {
  title: "Governance Chamber",
  description: "AAZADI constitutional governance chamber."
};

export default function GovernanceChamberPage() {
  return (
    <NewsroomShell
      eyebrow="Governance Chamber"
      title="Parliamentary interface for newsroom authority."
      body="Journalist approvals, constitutional votes, moderation reviews, disputes, appeals, evidence, discussion, voting records, and final outcomes are handled transparently."
    >
      <div className="grid gap-5">
        {governanceProposals.map((proposal) => (
          <article className="soft-card p-5" key={proposal.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{proposal.id} / {proposal.status}</p>
                <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">{proposal.title}</h2>
              </div>
              <span className="flex w-fit items-center gap-1 rounded-full border border-maroon/15 bg-cream px-3 py-1 text-xs font-black text-maroon">
                <Scale size={14} aria-hidden="true" />
                {proposal.constitutionalReference}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{proposal.proposal}</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">Evidence before vote</p>
                <ul className="mt-2 grid gap-2">
                  {proposal.evidence.map((item) => (
                    <li className="flex items-center gap-2 text-sm font-semibold text-muted" key={item}>
                      <Landmark size={14} className="text-maroon" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="grid grid-cols-3 gap-2 text-center">
                <Vote label="Approve" value={proposal.votingRecord.approve} />
                <Vote label="Reject" value={proposal.votingRecord.reject} />
                <Vote label="Abstain" value={proposal.votingRecord.abstain} />
              </dl>
            </div>
            <p className="mt-5 border-t border-maroon/15 pt-4 text-sm font-bold text-obsidian">{proposal.finalOutcome}</p>
          </article>
        ))}
      </div>
    </NewsroomShell>
  );
}

function Vote({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-maroon/15 bg-cream/60 p-3" style={{ borderRadius: 8 }}>
      <dt className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-maroon">{label}</dt>
      <dd className="font-editorial text-2xl font-black text-obsidian">{value}</dd>
    </div>
  );
}
