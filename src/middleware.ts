import { NextRequest, NextResponse } from 'next/server';
import { registerValidation } from './app/_middlewares/validations/registerValidation';
import { getSession } from './_utils/session';
import { verifyToken } from './_utils/jwt';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const pathname = req.nextUrl.pathname;

    if (pathname === '/api/register') {
        try {
            await registerValidation(req);
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json({ message: error.message }, { status: 400 });

            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 400 });
        }
    }

    if (pathname === '/settings' ||
        pathname === '/add-recipe' ||
        pathname === '/edit-recipe') {
        try {
            const { token } = await getSession();
            if (!token)
                return NextResponse.redirect(new URL("/error", req.url));
            await verifyToken(token);
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json({ message: error.message }, { status: 400 });

            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 400 });
        }
    }

    if (
        (pathname === '/api/user' && req.method === 'PUT') ||
        (pathname === '/api/followers' && req.method === 'POST') ||
        (pathname === '/api/followers' && req.method === 'PUT') ||
        (pathname === '/api/recipe' && req.method === 'GET') ||
        (pathname === '/api/recipe' && req.method === 'POST') ||
        (pathname === '/api/recipe' && req.method === 'PUT') ||
        (pathname === '/api/recipe' && req.method === 'DELETE')) {
        try {
            const { token } = await getSession();
            if (!token)
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

            const decoded = await verifyToken(token);
            res.headers.set('user_id', decoded.payload.id);
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json({ message: error.message }, { status: 400 });

            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 400 });
        }
    }
    // const session=  await getSession();
    // session.destroy();
    return res;
}

export const config = {
    matcher: ['/api/:path*', '/', '/settings', '/add-recipe', '/edit-recipe'],
};