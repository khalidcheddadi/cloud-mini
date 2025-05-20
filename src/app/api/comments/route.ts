
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';
import { verifyToken } from '@/utils/verifyToken';
import { CreateCommentDto } from '@/utils/dtos';
import { CommentSchema } from '@/utils/validationSchemas';


/**
 * 
 * @method POST
 * @param request 
 * @route domain/api/comments
 * @description post comments
 * @returns 
 * @public
 */

export async function POST(request: NextRequest){
    try {
        const userCookie = verifyToken(request);
        if(!userCookie){
            return NextResponse.json(
                { message: "Only Logged in userCookie, access denied" },
                { status: 401 }
            )
        }
        const body = await request.json() as CreateCommentDto;
        const validation = CommentSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        if (body.ArticleId === undefined) {
        return NextResponse.json({ message: "ArticleId is required" }, { status: 400 });
        }
        const NewComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.ArticleId,
                userId: Number(userCookie.id),
            }
        });

        return NextResponse.json(NewComment, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}


/**
 * 
 * @method GET
 * @param request 
 * @route domain/api/comments
 * @description Get All comments
 * @access private
 */

export async function GET(request: NextRequest){
    try {
        const userCookie = await verifyToken(request);
        if(userCookie === null || userCookie.isAdmin == false){
            return NextResponse.json(
                { message: "Only admin, access denied" },
                { status: 403 }
            )
        }

        const AllComment = await prisma.comment.findMany();
        return NextResponse.json(AllComment, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}