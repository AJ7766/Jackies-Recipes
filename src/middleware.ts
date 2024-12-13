import { NextResponse } from 'next/server';
import { setSecurityHeaders } from './app/_middlewares/securityHeaders';

export async function middleware() {
    const response = NextResponse.next();
    await setSecurityHeaders(response);

    return response;
}

export const config = {
    matcher: ['/', '/api/:path*', '/:path*'],
};