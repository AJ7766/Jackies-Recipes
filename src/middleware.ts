import { NextRequest, NextResponse } from 'next/server';
import { registerValidation } from './app/_middlewares/validations/registerValidation';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/api/register') {
        try {
            await registerValidation(req);
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json({ message: error.message }, { status: 400 });

            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 400 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};