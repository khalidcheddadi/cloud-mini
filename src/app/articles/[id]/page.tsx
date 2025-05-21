import styles from "./article.module.css"; // تأكد من صحة المسار
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
// import { getSingleArticle } from "@/apiCalls/ArticleApiCall";
import { SingleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import Link from "next/link";
import { prisma } from "@/utils/DB";
import { redirect } from "next/navigation";

interface ArticleIdProps {
  params: { id: string };
}


export default async function singleArticlePage({ params }: ArticleIdProps) {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  // const article: SingleArticle = await getSingleArticle(params.id);

  const article = await prisma.article.findUnique({
              where: { id: parseInt(params.id) },
              include: {
                  comments: {
                      include: {
                          user: {
                              select: {
                                  username: true,
                              }
                          }
                      },
                      orderBy: {
                          createdAt: 'desc'
                      }
                  }
              }
          }) as SingleArticle;

          if(!article){
            redirect("/not-found");
          }
  return (
  <>
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className={styles.body}>{article.description}</p>
      </div>
    </section>

    
    <div>
      {payload 
      ?
       <>
       <AddCommentForm ArticleId={article.id} />
       </>
      : 
      <>
        
        <Link href="/login" className="text-shadow-green-800">
          to write a comment login to account
        </Link>
      </>
       }
    </div>
    <h1>comments</h1>
{article.comments && article.comments.length > 0 ? (
  article.comments.map(comment => (
    <CommentItem userId={payload?.id} key={comment.id} comment={comment} />
  ))
) : (
  <p>لا توجد تعليقات بعد.</p>
)}


  </>
);

};

