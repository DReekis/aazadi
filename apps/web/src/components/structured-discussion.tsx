import { MessageSquareText } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { StructuredComment } from "@/types/domain";

const labels: Record<StructuredComment["type"], string> = {
  correction_suggestion: "Correction suggestion",
  evidence_challenge: "Evidence challenge",
  contextual_addition: "Contextual addition",
  public_discussion: "Public discussion"
};

export function StructuredDiscussion({ comments }: { comments: StructuredComment[] }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">Structured civic discussion</p>
        <h2 className="font-editorial mt-1 text-3xl font-black text-obsidian">Public input by claim type</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Contributions are sorted by civic function, not popularity. Unsupported allegations and pile-ons do not belong here.
        </p>
      </div>
      <div className="grid gap-3">
        {comments.length ? (
          comments.map((comment) => (
            <article className="soft-card p-4" key={comment.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-obsidian text-peach">
                    <MessageSquareText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{labels[comment.type]}</p>
                    <h3 className="mt-1 font-bold text-obsidian">{comment.author}</h3>
                  </div>
                </div>
                <span className="rounded-full border border-maroon/15 bg-cream/70 px-2.5 py-1 text-xs font-black text-muted">
                  {comment.status.replace("_", " ")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{comment.body}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted">{formatDate(comment.createdAt)}</p>
            </article>
          ))
        ) : (
          <div className="soft-card p-5 text-sm leading-6 text-muted">
            No public challenges or contextual additions have been published for this article yet.
          </div>
        )}
      </div>
    </section>
  );
}
