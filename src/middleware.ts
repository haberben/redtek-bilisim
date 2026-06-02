import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isApiAdmin = request.nextUrl.pathname.startsWith('/api/products') || request.nextUrl.pathname.startsWith('/api/settings');

  // Protect Admin UI (except login page)
  if (isAdminPage && request.nextUrl.pathname !== '/admin/login') {
    const auth = request.cookies.get('admin_auth');
    if (!auth || auth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect Admin APIs (allow GET for public site, block POST/PUT/DELETE)
  if (isApiAdmin && request.method !== 'GET') {
    const auth = request.cookies.get('admin_auth');
    if (!auth || auth.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*', '/api/settings/:path*'],
};
