import { CivicMapPanel } from "@/components/civic-map-panel";
import { ArticleCard } from "@/components/article-card";
import { civicMapRegions, articles } from "@/lib/data";

export const metadata = {
  title: "Civic Map",
  description: "AAZADI geographic civic awareness layer."
};

export default function CivicMapPage() {
  return (
    <div>
      <div className="container-page pt-10">
        <p className="eyebrow">Geographic civic awareness</p>
        <h1 className="font-editorial mt-2 max-w-4xl text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
          Browse public reality by region, district, and civic issue.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          V1 uses a lightweight civic map model: every region is tagged with scope, issue, pulse count, investigation count, and verification state.
        </p>
      </div>
      <CivicMapPanel regions={civicMapRegions} />
      <section className="container-page section-band pt-0">
        <div className="mb-5 border-t border-maroon/20 pt-4">
          <p className="eyebrow">Mapped investigations</p>
          <h2 className="font-editorial mt-2 text-4xl font-black text-obsidian">Records with geographic tags</h2>
        </div>
        <div className="grid gap-5">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
