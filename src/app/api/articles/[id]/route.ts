import { prisma } from '@/utils/DB';
import { UpdateArticleDto } from '@/utils/dtos';
import { verifyToken } from '@/utils/verifyToken';
import { NextRequest, NextResponse } from 'next/server';


interface Props {
    params: { id: string }
}

/**
 * 
 * @method GET
 * @param request 
 * @route domain/api/articles/:id
 * @description Get Single Articles by id
 * @returns 
 * @public
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
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
        });

        if (!article) {
            return NextResponse.json({ message: 'article not found' }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}



/**
 * 
 * @method PUT
 * @param request 
 * @route domain/api/articles/:id
 * @description Update Single Articles by id
 * @access private (only admin)
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
// check admin or non
    const UserToken = verifyToken(request);
        if(UserToken === null || UserToken.isAdmin === false){
            return NextResponse.json(
                {message: "not admin"},
                { status: 403 }
            )
        }
// GET Article BY Id
    const article = await prisma.article.findUnique({
        where: { id: parseInt(params.id) },
    });

    if(!article) {
        return NextResponse.json({ message: 'article not found' }, { status: 404 })
    }
    const body = (await request.json()) as UpdateArticleDto;
    const UpdateArticle = await prisma.article.update({
                where: { id: parseInt(params.id) },
                data: {
                    title: body.title,
                    description: body.description
                }
            });

    return NextResponse.json(UpdateArticle, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}



/**
 * 
 * @method DELETE
 * @param request 
 * @route domain/api/articles/:id
 * @description DELETE Single Articles by id
 * @returns 
 * @public
 */


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
// check Admin or non
        const UserToken = verifyToken(request);
        if(UserToken === null || UserToken.isAdmin === false){
            return NextResponse.json(
                {message: "not admin"},
                { status: 403 }
            )
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: { comments: true,},
        });
    if(!article) {
        return NextResponse.json({ message: 'article not found' }, { status: 404 })
    }
    // deleted article
    await prisma.article.delete({
        where: { id: parseInt(params.id) }
    });

    // deleted tos comment tho article
    const CommentIDS: number[] = article?.comments.map(Comment => Comment.id);
    await prisma.comment.deleteMany({
        where: { id: {in: CommentIDS } },
    })

    return NextResponse.json({ message: 'deleted Articles'}, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}


