
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@/generated/prisma/client";
import { getArticles } from "@/apiCalls/ArticleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import Link from "next/link";
import styles from './AdminArticlesTable.module.css'; // أو globals.css إذا عمّمت
import Pagination from "@/components/articles/Panigation";
import DeleteArticleButton from "./DeleteArticleButton";
import { prisma } from "@/utils/DB";


interface AdminArticlesTableProps {
  searchParams: {pageNumber: string};
}
const AdminArticlesTable = async ({ searchParams: {pageNumber} }: AdminArticlesTableProps) => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    if(!token){
      redirect("/");
    }
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false){
      redirect("/");
    } 

    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await prisma.article.count();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE)
  
return (
  <section className={styles["table-section"]}>
    <h2>Articles</h2>
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{new Date(article.createdAt).toDateString()}</td>
              <td>
                <Link href={`/admin/articles-table/edit/${article.id}`}>Edit</Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td>
                <Link href={`/articles/${article.id}`}>Read More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination pageNumber={parseInt(pageNumber)} pages={pages} route="/admin/articles-table" />
  </section>
);
}

export default AdminArticlesTable