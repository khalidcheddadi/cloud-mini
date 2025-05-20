import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/DB';


/**
 * 
 * @method GET
 * @param request 
 * @route domain/api/articles/count
 * @description count total a database 
 * @returns 
 * @public
 */


export async function GET(request: NextRequest) {
    try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500 }
        )
    }
}