import { getArticles } from "@/apiCalls/ArticleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Panigation";
import SearchArticlesInput from "@/components/articles/SearchArticlesInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@/generated/prisma/client";
import { prisma } from "@/utils/DB";

  interface ArticlesPageProps {
    searchParams: { pageNumber: string }
  }


const ArticlesPage = async ({ searchParams } : ArticlesPageProps) => {
  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count:number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE); // tabiei number

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <SearchArticlesInput />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          📚 Latest Articles
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <ArticleItem article={item} key={item.id} />
          ))}
        </div>
        <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages}  />
      </div>
    </div>
  );
};

export default ArticlesPage;


