import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const protectedPrefixes = ['/dashboard', '/rooms'];
const authPages = ['/auth/login', '/auth/register'];

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth?.user);
  const { pathname } = req.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/rooms/:path*', '/auth/login', '/auth/register']
};
