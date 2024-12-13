import { NextResponse } from "next/server";

export const setSecurityHeaders = async (response: NextResponse) => {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-site');

    if (process.env.NODE_ENV === 'development') {
        response.headers.set(
            'Content-Security-Policy',
            [
                "default-src 'self';",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com https://www.googletagmanager.com;",
                "connect-src 'self' https://region1.google-analytics.com;",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
                "font-src 'self' https://fonts.gstatic.com;",
                "img-src 'self' https: data:;",
                "frame-ancestors 'self';",
                "form-action 'self';",
            ].join(' ')
        );
    } else {
        response.headers.set(
            'Content-Security-Policy',
            [
                "default-src 'self';",
                "script-src 'self' 'unsafe-inline' https://trusted-cdn.com https://www.googletagmanager.com https://vercel.live;",
                "connect-src 'self' https://region1.google-analytics.com;",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
                "font-src 'self' https://fonts.gstatic.com;",
                "img-src 'self' https: data:;",
                "frame-ancestors 'self';",
                "form-action 'self';",
            ].join(' ')
        );
    }
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
}