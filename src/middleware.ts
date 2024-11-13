import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/config/database';

function setSecurityHeaders(response: NextResponse) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; frame-ancestors 'self';"
    );
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    setSecurityHeaders(response);
    return response;
}

export const config = {
    matcher: ['/', '/api/:path*'],
};
