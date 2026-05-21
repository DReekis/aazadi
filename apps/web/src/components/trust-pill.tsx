import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import type { VerificationState } from "@/types/domain";

const labels: Record<VerificationState, string> = {
  verified: "Verified",
  under_review: "Under review",
  challenged: "Challenged",
  rejected: "Rejected"
};

export function TrustPill({ state }: { state: VerificationState }) {
  const Icon = state === "verified" ? CheckCircle2 : state === "under_review" ? Clock3 : CircleAlert;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-maroon/20 bg-cream/70 px-2.5 py-1 text-xs font-black text-maroon">
      <Icon size={14} aria-hidden="true" />
      {labels[state]}
    </span>
  );
}
