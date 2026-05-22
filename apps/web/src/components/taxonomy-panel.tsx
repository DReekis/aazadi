import { CheckCircle2 } from "lucide-react";
import { taxonomy } from "@/lib/data";

const labels = [
  ["Geographic scope", taxonomy.geographicScopes],
  ["Topic category", taxonomy.topicCategories],
  ["Content depth", taxonomy.contentDepths],
  ["Urgency", taxonomy.urgencies],
  ["Verification state", taxonomy.verificationStates]
] as const;

export function TaxonomyPanel() {
  return (
    <div className="soft-card p-5">
      <p className="eyebrow">Structured submission taxonomy</p>
      <h2 className="font-editorial mt-2 text-3xl font-black text-obsidian">Every record is classified before review.</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {labels.map(([label, values]) => (
          <div className="border-t border-maroon/15 pt-3" key={label}>
            <h3 className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{label}</h3>
            <ul className="mt-3 space-y-2">
              {values.map((value) => (
                <li className="flex items-center gap-2 text-sm font-semibold text-muted" key={value}>
                  <CheckCircle2 className="text-maroon" size={14} aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
