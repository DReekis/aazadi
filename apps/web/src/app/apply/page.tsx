import { FileUp, ShieldCheck, UserCheck } from "lucide-react";

export const metadata = {
  title: "Apply as Journalist",
  description: "Apply to become an AAZADI journalist."
};

export default function ApplyPage() {
  return (
    <div className="container-page section-band">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside>
          <p className="eyebrow">Journalist onboarding</p>
          <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
            Join a newsroom built around evidence and governance.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            AAZADI journalist membership is reviewed for identity, work samples, conflicts, evidence practice, and willingness to participate in institutional governance.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              [UserCheck, "Identity and beat review"],
              [FileUp, "Work samples with evidence trail"],
              [ShieldCheck, "Governance and correction covenant"]
            ].map(([Icon, label]) => (
              <div className="soft-card flex items-center gap-3 p-4" key={label as string}>
                <Icon className="text-maroon" size={20} aria-hidden="true" />
                <p className="font-bold text-obsidian">{label as string}</p>
              </div>
            ))}
          </div>
        </aside>
        <form className="soft-card grid gap-4 p-5 md:p-7">
          <Field label="Full name" name="name" placeholder="Your legal name" />
          <Field label="Email" name="email" placeholder="you@example.org" type="email" />
          <Field label="Primary region" name="region" placeholder="City, state, or civic beat region" />
          <Field label="Current affiliation" name="affiliation" placeholder="Independent, newsroom, university, civic desk..." />
          <label className="grid gap-2">
            <span className="text-sm font-black text-maroon">Evidence practice statement</span>
            <textarea
              className="min-h-32 rounded-md border border-maroon/20 bg-cream px-4 py-3 outline-none focus:border-maroon"
              name="statement"
              placeholder="Describe how you verify documents, protect sources, and handle corrections."
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-black text-maroon">Work sample links</span>
            <textarea
              className="min-h-24 rounded-md border border-maroon/20 bg-cream px-4 py-3 outline-none focus:border-maroon"
              name="samples"
              placeholder="Add public links, document references, or archive URLs."
            />
          </label>
          <label className="flex items-start gap-3 text-sm leading-6 text-muted">
            <input className="mt-1 h-4 w-4 accent-maroon" type="checkbox" name="covenant" />
            <span>I agree that substantial edits, corrections, conflicts, and governance participation will be visible as part of my public accountability record.</span>
          </label>
          <button className="button-primary" type="button">
            Submit application
          </button>
          <p className="text-xs leading-5 text-muted">
            V1 frontend form is ready for the `/journalists/applications` API endpoint. Submission wiring can be enabled once deployment secrets and anti-abuse checks are configured.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text"
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-maroon">{label}</span>
      <input
        className="min-h-12 rounded-md border border-maroon/20 bg-cream px-4 outline-none focus:border-maroon"
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}
