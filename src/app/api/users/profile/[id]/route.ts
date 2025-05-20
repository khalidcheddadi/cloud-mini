import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';
import { verifyToken } from '@/utils/verifyToken';
import { UpdateUserDto } from '@/utils/dtos';
import bcrypt from 'bcryptjs';
import { UpDateProfileSchema } from '@/utils/validationSchemas';


interface Props {
    params: { id: string}
}


/**
 * 
 * @method DELETE
 * @route domain/api/users/profile/[id]
 * @description delete account
 * @access private
 */



export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id)},
            include: { comments: true,},
        });
    if(!user) {
        return NextResponse.json({ message: 'user not found' }, { status: 404 })
    }
            // deleted tho user

    await prisma.user.delete({
        where: { id: parseInt(params.id) }
    });

        // deleted tos comment tho user
    const CommentIDS: number[] = user?.comments.map(Comment => Comment.id);
    await prisma.comment.deleteMany({
        where: { id: {in: CommentIDS } },
    })


    const userFromToken = verifyToken(request);

    if(userFromToken  !== null && userFromToken.id === user.id){
        return NextResponse.json({ message: 'deleted account'}, { status: 200 })
    }

    return NextResponse.json(
        { message: "only user himself can delete his profile, forbidden"},
        { status: 403 }
    )

    
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
 * @route domain/api/users/profile/[id]
 * @description get account
 * @access private
 */

export async function GET(request: NextRequest, { params } : Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id)},
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true
            }
        });
        if(!user){
            return NextResponse.json({ message: 'user not found' }, { status: 404 })
        }
        const userFromToken = verifyToken(request);

    if(userFromToken === null || userFromToken.id !== user.id){
        return NextResponse.json({ message: 'you are not user'}, { status: 403 })
    }

    return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}


/**
 * 
 * @method PUT
 * @route domain/api/users/profile/[id]
 * @description put account
 * @access private
 */

export async function PUT(request: NextRequest, { params } : Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id)},
        });
        if(!user){
            return NextResponse.json({ message: 'user not found' }, { status: 404 })
        }
        const userFromToken = verifyToken(request);

    if(userFromToken === null || userFromToken.id !== user.id){
        return NextResponse.json({ message: 'you are not user have this account you fake'}, { status: 403 })
    }
    const body = await request.json() as UpdateUserDto;
    const validation = UpDateProfileSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                {message: validation.error.errors[0].message },
                { status: 400 }
            );
        }
    if(body.password){
        const salt = await bcrypt.genSalt(10)
        body.password = await bcrypt.hash(body.password, salt)
    }
    const UpdateProfile = await prisma.user.update({
        where: { id: parseInt(params.id)},
        data: {
            username: body.username,
            email: body.email,
            password: body.password
        }
    });

    const { password, ...other} = UpdateProfile;

    return NextResponse.json({ ...other, message: "update success"},
        { status: 200 }
    )
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}