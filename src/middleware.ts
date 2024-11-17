import { NextRequest, NextResponse } from 'next/server';

function setSecurityHeaders(response: NextResponse) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-site');
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self';",
            "script-src 'self' https://trusted-cdn.com;",
            "style-src 'self' https://fonts.googleapis.com;",
            "font-src 'self' https://fonts.gstatic.com;",
            "img-src 'self' https: data:;",
            "frame-ancestors 'self';",
            "form-action 'self';",
        ].join(' ')
    );
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    setSecurityHeaders(response);
    return response;
}

export const config = {
    matcher: ['/', '/api/:path*'],
};
