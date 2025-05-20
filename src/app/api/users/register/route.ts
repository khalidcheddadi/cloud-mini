import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';
import { RegisterUserDto } from '@/utils/dtos';
import { RegisterSchema } from '@/utils/validationSchemas';
import bcrypt from 'bcryptjs';
import { generateJWT, setCookie } from '@/utils/generateToken';




/**
 * 
 * @method POST
 * @route domain/api/users/register
 * @description create new user
 * @public
 */



export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = RegisterSchema.safeParse(body);
            if(!validation.success) {
                return NextResponse.json(
                    {message: validation.error.errors[0].message },
                    { status: 400 }
                );
            }
        
        // check user ila already registered user not ta"awd register two
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if(user){
            return NextResponse.json(
                { message: "this is user already registered"},
                { status: 400 }
            );
        }

        // ila m'aka'nch a'ndo d'ija account yd'ir create account

        //tach'f'ir password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt)
        const NewAccount = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
            },
            select: {
                username: true,
                id: true,
                isAdmin: true,
            }
        });

                
        // token
                const cookie = setCookie({
                    id: NewAccount.id,
                    isAdmin: NewAccount.isAdmin,
                    username: NewAccount.username,
                });
        
        return NextResponse.json({ ...NewAccount, message: "registered" },
            { 
                status: 201,
                headers: { "Set-Cookie": cookie },
             }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }

}