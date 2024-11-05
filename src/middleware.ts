import { NextResponse } from 'next/server';

export function middleware() {
    const response = NextResponse.next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; frame-ancestors 'self';"
    );

    return response;
}

export const config = {
    matcher: ['/', '/api/:path*'],
};