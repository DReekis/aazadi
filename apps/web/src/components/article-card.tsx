import Image from "next/image";
import Link from "next/link";
import { FileText, History, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/domain";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="soft-card grid overflow-hidden md:grid-cols-[0.95fr_1.2fr]">
      <Link className="focus-ring relative min-h-[240px] overflow-hidden bg-paper-deep" href={`/articles/${article.slug}`}>
        <Image
          alt={article.imageAlt}
          className="object-cover grayscale-[18%] transition duration-300 hover:scale-[1.015]"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 45vw"
          src={article.imageUrl}
        />
      </Link>
      <div className="flex flex-col justify-between gap-6 p-5 md:p-7">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-maroon">
            <span>{article.category}</span>
            <span className="text-line">/</span>
            <span>{article.region}</span>
          </div>
          <Link href={`/articles/${article.slug}`} className="focus-ring">
            <h3 className="font-editorial mt-3 text-2xl font-black leading-[1.05] text-obsidian md:text-4xl">
              {article.title}
            </h3>
          </Link>
          <p className="mt-3 text-sm leading-6 text-muted md:text-base">{article.subtitle}</p>
        </div>
        <div className="grid gap-3 border-t border-maroon/15 pt-4 text-sm text-muted sm:grid-cols-3">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-maroon" aria-hidden="true" />
            {article.integrity.verificationStatus.replaceAll("_", " ")}
          </span>
          <span className="flex items-center gap-2">
            <FileText size={16} className="text-maroon" aria-hidden="true" />
            {article.integrity.evidenceCount} evidence items
          </span>
          <span className="flex items-center gap-2">
            <History size={16} className="text-maroon" aria-hidden="true" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
