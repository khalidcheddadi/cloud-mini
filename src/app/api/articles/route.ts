import { CreateArticleDto } from '@/utils/dtos';
import { CreateArticleSchema } from '@/utils/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/generated/prisma/client';
import { prisma } from '@/utils/DB';
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';




/**
 * 
 * @method GET
 * @param request 
 * @route domain/api/articles
 * @description Get All Articles by page number
 * @returns 
 * @public
 */

export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            orderBy: {
                createdAt: 'desc',
            }
        });
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}


/**
 * 
 * @method POST
 * @param request 
 * @route domain/api/articles
 * @description Create New Articles
 * @access private (only admin add)
 */

export async function POST(request: NextRequest) {
    try {
    
    const UserToken = verifyToken(request);
    if(UserToken === null || UserToken.isAdmin === false){
        return NextResponse.json(
            {message: "not admin"},
            { status: 403 }
        )
    }
    const body = (await request.json()) as CreateArticleDto;

    const validation = CreateArticleSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const NewArticles: Article = await prisma.article.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(NewArticles, { status: 201 });


    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }

}