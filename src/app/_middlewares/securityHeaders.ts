import { NextResponse } from "next/server";

export const setSecurityHeaders = async (res: NextResponse) => {
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-XSS-Protection', '1; mode=block');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('Cross-Origin-Resource-Policy', 'same-site');

    if (process.env.NODE_ENV === 'development') {
        res.headers.set(
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
        res.headers.set(
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
    res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
}