import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session')?.value;

  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath.startsWith('/admin')) {
    // Allow /admin/login and /admin/logout without session requirement
    if (cleanPath === '/admin/login' || cleanPath === '/admin/logout') {
      return NextResponse.next();
    }

    // Any other /admin page requires session cookie
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
