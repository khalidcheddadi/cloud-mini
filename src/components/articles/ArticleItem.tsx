import { Article } from "@/generated/prisma/client";
import Link from "next/link";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <article className="flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-5">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
          {article.title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
          {article.description}
        </p>
      </div>

      <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
        <Link
          href={`/articles/${article.id}`}
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          اقرأ المزيد
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleItem;
