import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userToken');
    const { pathname } = request.nextUrl;

    // Prevent authenticated users from accessing /login or /register
    if ((pathname === '/login' || pathname === '/register') && token) {
        return NextResponse.redirect(new URL('/boards', request.url));
    }

    // Redirect unauthenticated users away from /boards
    if (pathname.startsWith('/boards') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
