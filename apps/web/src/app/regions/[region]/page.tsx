import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles, getArticlesByRegion } from "@/lib/data";
import { slugify } from "@/lib/format";

export function generateStaticParams() {
  return [...new Set(articles.map((article) => article.region))].map((region) => ({
    region: slugify(region)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const items = getArticlesByRegion(region);
  const title = items[0]?.region ?? "Regional Reporting";
  return {
    title,
    description: `AAZADI regional reporting archive for ${title}.`
  };
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const items = getArticlesByRegion(region);

  if (!items.length) {
    notFound();
  }

  const regionName = items[0].region;

  return (
    <div className="container-page section-band">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Regional desk</p>
        <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
          {regionName}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Investigations, evidence records, corrections, and governance context for this region.
        </p>
      </div>
      <div className="grid gap-5">
        {items.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
    </div>
  );
}
