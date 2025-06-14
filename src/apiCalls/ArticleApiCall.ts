import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@/generated/prisma/client";


// GET articles pageNumber
 export async function getArticles( pageNumber: string | undefined ): Promise<Article[]>{
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
      { cache: 'no-store' }
    );
    if(!response.ok){
      throw new Error("Failed to fetch articles");
    }
     
    return response.json();
  }


// GET count total articles
 export async function getArticlesCount(): Promise<number>{
    const response = await fetch(`${DOMAIN}/api/articles/count`,
      { cache: 'no-store' }
    );
    if(!response.ok){
      throw new Error("Failed to fetch articles count");
    }
     
    const { count } = await response.json() as { count: number };
    return count;
  }


  // GET articles searchText
 export async function getArticlesBaseOnSearch( searchText: string ): Promise<Article[]>{
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);
    if(!response.ok){
      throw new Error("Failed to fetch articles");
    }
     
    return response.json();
  }

  //// Get single article by id
export async function getSingleArticle(articleId: string): Promise<SingleArticle>{
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,
      { cache: 'no-store' }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }
  
   return response.json();
}
