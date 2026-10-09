import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session')?.value;

  // Add x-pathname header for server components to know the active path
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  if (pathname.startsWith('/admin')) {
    // Allow /admin/login and /admin/logout without session requirement
    if (pathname === '/admin/login' || pathname === '/admin/logout') {
      return NextResponse.next({
        request: { headers: requestHeaders }
      });
    }

    // Any other /admin page requires session cookie
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
