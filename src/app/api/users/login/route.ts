import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';
import { LoginUserDto } from '@/utils/dtos'; // had variables d table
import { LoginSchema } from '@/utils/validationSchemas'; // had validation
import bcrypt from 'bcryptjs'; // had dy'al ta'chfiir password
import { setCookie } from '@/utils/generateToken';

// @/generated/prisma/client
/**
 * 
 * @method POST
 * @route domain/api/users/login
 * @description login sign in
 * @public
 */



export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;
        const validation = LoginSchema.safeParse(body);
            if(!validation.success) {
                return NextResponse.json(
                    {message: validation.error.errors[0].message },
                    { status: 400 }
                );
            }
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if(!user){
            return NextResponse.json({
                message: "sorry this account not have register new account",
                status: 400
            })
        }
        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if(!isPasswordMatch){
            return NextResponse.json({
                message: "password not correct",
                status: 400
            })
        };

        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username,
        });

        return NextResponse.json(
            { message: "Authenticated" },
             {
                status: 200,
                headers: { "Set-Cookie": cookie }
            }
            );


    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }

}