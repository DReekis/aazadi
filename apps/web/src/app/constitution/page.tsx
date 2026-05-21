import { BookOpenCheck, FileClock, Scale, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Constitution",
  description: "AAZADI constitutional operating principles."
};

const principles = [
  {
    icon: FileClock,
    title: "No silent edits",
    body: "Substantial changes to claims, headlines, evidence labels, or context create public revision records."
  },
  {
    icon: ShieldCheck,
    title: "Evidence before reach",
    body: "Verification state is displayed before distribution mechanics. The platform does not rank stories by outrage."
  },
  {
    icon: Scale,
    title: "Accountable journalists",
    body: "Journalists carry public profiles with beat history, correction count, reliability metrics, and governance participation."
  },
  {
    icon: BookOpenCheck,
    title: "Public governance",
    body: "Approvals, moderation actions, policy amendments, and correction adjudications are preserved as civic records."
  }
];

export default function ConstitutionPage() {
  return (
    <div className="container-page section-band">
      <div className="max-w-4xl">
        <p className="eyebrow">AAZADI constitution</p>
        <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
          A public-interest institution must be legible to the public.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          This operating constitution defines the V1 trust model: evidence, revisions, corrections, governance, and journalist accountability are product requirements, not editorial afterthoughts.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {principles.map(({ icon: Icon, title, body }) => (
          <article className="soft-card p-5" key={title}>
            <Icon className="text-maroon" size={24} aria-hidden="true" />
            <h2 className="font-editorial mt-3 text-3xl font-black text-obsidian">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
      <section className="mt-10 border-t border-maroon/20 pt-6">
        <h2 className="font-editorial text-4xl font-black text-obsidian">Editorial covenant</h2>
        <div className="story-body mt-4 max-w-3xl">
          <p>
            AAZADI exists to document power with evidence and restraint. It does not confuse speed with truth, popularity with importance, or access with accountability.
          </p>
          <p>
            The institution should become more trustworthy as users inspect it. A reader must be able to see who reported a claim, what evidence supports it, when it changed, and how the platform governed the record around it.
          </p>
        </div>
      </section>
    </div>
  );
}
