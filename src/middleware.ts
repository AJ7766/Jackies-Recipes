import { NextResponse } from 'next/server';

export function middleware() {
    const response = NextResponse.next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:;"
    );

    return response;
}

export const config = {
    matcher: ['/', '/api/:path*'],
};