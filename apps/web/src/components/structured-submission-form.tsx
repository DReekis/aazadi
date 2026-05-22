import { FilePlus2 } from "lucide-react";
import { taxonomy } from "@/lib/data";

export function StructuredSubmissionForm() {
  return (
    <form className="soft-card grid gap-4 p-5">
      <div>
        <p className="eyebrow">Structured journalist upload flow</p>
        <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Submit news through civic classification.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          The body draft is only one part of submission. Scope, topic, depth, urgency, and verification state are required for search, regional organization, API quality, future federation, and long-term archive integrity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <Select label="Geographic scope" values={taxonomy.geographicScopes} />
        <Select label="Topic category" values={taxonomy.topicCategories} />
        <Select label="Content depth" values={taxonomy.contentDepths} />
        <Select label="Urgency" values={taxonomy.urgencies} />
        <Select label="Verification state" values={taxonomy.verificationStates} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Region or country" placeholder="India, Kerala, Delhi NCR, Europe..." />
        <Field label="District or city" placeholder="Ernakulam, Central Delhi, Pune..." />
      </div>
      <Field label="Working headline" placeholder="Use a precise civic claim, not a clickbait frame" />
      <label className="grid gap-2">
        <span className="text-sm font-black text-maroon">Draft summary and claim boundaries</span>
        <textarea className="min-h-32 rounded-md border border-maroon/20 bg-cream px-4 py-3 outline-none focus:border-maroon" placeholder="State what is known, what is not yet verified, and what evidence is attached." />
      </label>
      <button className="button-primary w-fit" type="button">
        <FilePlus2 size={17} aria-hidden="true" />
        Create newsroom record
      </button>
    </form>
  );
}

function Select({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-maroon">{label}</span>
      <select className="min-h-11 rounded-md border border-maroon/20 bg-cream px-3 text-sm font-semibold outline-none focus:border-maroon">
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </label>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-maroon">{label}</span>
      <input className="min-h-11 rounded-md border border-maroon/20 bg-cream px-3 outline-none focus:border-maroon" placeholder={placeholder} />
    </label>
  );
}
