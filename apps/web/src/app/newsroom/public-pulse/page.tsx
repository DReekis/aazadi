import { PublicPulse } from "@/components/public-pulse";
import { NewsroomShell } from "@/components/newsroom-shell";
import { TaxonomyPanel } from "@/components/taxonomy-panel";
import { publicPulseItems } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Public Pulse Management",
  description: "AAZADI structured civic awareness management."
};

export default function PublicPulseManagementPage() {
  return (
    <NewsroomShell
      eyebrow="Public Pulse Management"
      title="Curate civic awareness without feed mechanics."
      body="Pulse updates are classified by geography, issue, depth, urgency, verification, evidence count, and desk ownership before appearing on public surfaces."
    >
      <div className="space-y-6">
        <TaxonomyPanel />
        <section className="soft-card p-5">
          <p className="eyebrow">Pulse records</p>
          <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Structured civic updates</h2>
          <div className="mt-4 grid gap-3">
            {publicPulseItems.map((item) => (
              <article className="grid gap-3 border-t border-maroon/15 pt-3 lg:grid-cols-[1fr_240px]" key={item.id}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{item.id} / {item.zone} / {item.category}</p>
                  <h3 className="font-editorial mt-1 text-xl font-black text-obsidian">{item.headline}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.summary}</p>
                </div>
                <div className="text-sm text-muted lg:text-right">
                  <p className="font-black text-maroon">{item.urgency} / {item.verificationState}</p>
                  <p>{item.desk}</p>
                  <p>{formatDate(item.updatedAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <PublicPulse items={publicPulseItems} />
      </div>
    </NewsroomShell>
  );
}
