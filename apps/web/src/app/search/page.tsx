import Link from "next/link";
import { Search } from "lucide-react";
import { articles, governanceLogs, journalists } from "@/lib/data";

export const metadata = {
  title: "Search",
  description: "Search AAZADI public records."
};

export default function SearchPage({
  searchParams
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.trim().toLowerCase() ?? "";
  const matchedArticles = query
    ? articles.filter((article) =>
        [article.title, article.subtitle, article.category, article.region, article.author.name].some((value) =>
          value.toLowerCase().includes(query)
        )
      )
    : articles;

  return (
    <div className="container-page section-band">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Search public archive</p>
        <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
          Find records by claim, region, author, or governance action.
        </h1>
      </div>
      <form className="soft-card flex flex-col gap-3 p-4 sm:flex-row" action="/search">
        <label className="sr-only" htmlFor="q">Search AAZADI</label>
        <input
          className="min-h-12 flex-1 rounded-md border border-maroon/20 bg-cream px-4 text-base outline-none focus:border-maroon"
          id="q"
          name="q"
          placeholder="Search evidence, investigations, corrections..."
          defaultValue={searchParams?.q ?? ""}
        />
        <button className="button-primary" type="submit">
          <Search size={17} aria-hidden="true" />
          Search
        </button>
      </form>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.72fr]">
        <section>
          <h2 className="font-editorial text-3xl font-black text-obsidian">Article records</h2>
          <div className="mt-4 grid gap-3">
            {matchedArticles.map((article) => (
              <Link className="soft-card focus-ring p-4 transition hover:border-maroon/40" href={`/articles/${article.slug}`} key={article.slug}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{article.category} / {article.region}</p>
                <h3 className="font-editorial mt-2 text-2xl font-black text-obsidian">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{article.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <section>
            <h2 className="font-editorial text-3xl font-black text-obsidian">Journalists</h2>
            <div className="mt-4 grid gap-3">
              {journalists.map((journalist) => (
                <Link className="soft-card focus-ring p-4" href={`/journalists/${journalist.slug}`} key={journalist.slug}>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{journalist.region}</p>
                  <h3 className="font-editorial mt-1 text-xl font-black">{journalist.name}</h3>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-editorial text-3xl font-black text-obsidian">Governance</h2>
            <div className="mt-4 grid gap-3">
              {governanceLogs.slice(0, 3).map((log) => (
                <Link className="soft-card focus-ring p-4" href="/governance" key={log.id}>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-maroon">{log.id}</p>
                  <h3 className="font-editorial mt-1 text-xl font-black">{log.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
