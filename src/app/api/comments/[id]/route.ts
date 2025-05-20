
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';
import { verifyToken } from '@/utils/verifyToken';
import { UpDateCommentDto } from '@/utils/dtos';

interface Props {
    params: { id: string }
}

/**
 * 
 * @method PUT
 * @param request 
 * @route domain/api/comments/:id
 * @description UpDate comments
 * @returns 
 * @public
 */

export async function PUT(request: NextRequest, { params }: Props ){
    try {
        const Comment = await prisma.comment.findUnique({
            where: {id: parseInt( params.id )}
         });
         if(!Comment){
            return NextResponse.json(
                { message: "not found this is Comment"},
                { status: 404 }
            )
         };
        
        const UserCookie = verifyToken(request);
        if(UserCookie === null || UserCookie.id !== Comment.userId){
             return NextResponse.json(
                { message: "not found this is User"},
                { status: 403 }
            )
        };

        const body = await request.json() as UpDateCommentDto;
        const UpdatedComment = await prisma.comment.update({
            where: {id: parseInt(params.id)},
            data: {
                text: body.text
            }
        });
        
        return NextResponse.json(UpdatedComment, { status: 200 })
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
 * @route domain/api/comments/:id
 * @description Delete comments
 * @returns 
 * @public
 */

export async function DELETE(request: NextRequest, { params }: Props){
    try {
        const Comment = await prisma.comment.findUnique({
            where: {id: parseInt( params.id )}
         });
         if(!Comment){
            return NextResponse.json(
                { message: "not found this is Comment"},
                { status: 404 }
            )
         };
        const UserCookie = verifyToken(request);
        if(UserCookie === null){
             return NextResponse.json(
                { message: "not found this is User"},
                { status: 401 }
            )
        };

        if(UserCookie.isAdmin || UserCookie.id === Comment.userId){
            await prisma.comment.delete({
                where: {id: parseInt(params.id)}
            });
            return NextResponse.json(
                { message: "deleted comments"},
                { status: 200 }
            )

        };
        return NextResponse.json(
            { message: "you are not user" },
            { status: 403 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}