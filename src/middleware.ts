import { NextRequest, NextResponse } from 'next/server';
import { setSecurityHeaders } from './app/_middlewares/securityHeaders';
import { registerValidation } from './app/_middlewares/validations/registerValidation';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    await setSecurityHeaders(res);

    if (req.nextUrl.pathname === '/api/register') {
        try {
            await registerValidation(req);
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json({ message: error.message }, { status: 400 });

            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 400 });
        }
    }

    return res;
}

export const config = {
    matcher: ['/', '/api/:path*', '/:path*'],
};