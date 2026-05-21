import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles, getArticlesByCategory } from "@/lib/data";
import { slugify } from "@/lib/format";

export function generateStaticParams() {
  return [...new Set(articles.map((article) => article.category))].map((category) => ({
    category: slugify(category)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const items = getArticlesByCategory(category);
  const title = items[0]?.category ?? "Category";
  return {
    title,
    description: `AAZADI reporting archive for ${title}.`
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const items = getArticlesByCategory(category);

  if (!items.length) {
    notFound();
  }

  const categoryName = items[0].category;

  return (
    <div className="container-page section-band">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Category archive</p>
        <h1 className="font-editorial mt-2 text-5xl font-black leading-[1.02] text-obsidian md:text-7xl">
          {categoryName}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Public-interest reporting grouped by civic function rather than algorithmic attention.
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
