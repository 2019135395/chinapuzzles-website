import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查是否访问 admin 路径
  if (pathname.startsWith('/admin')) {
    // 访问登录页时放行
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 检查 cookie
    const token = request.cookies.get('token');

    // 如果没有 token，重定向到登录页
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 配置匹配路径
export const config = {
  matcher: ['/admin/:path*'],
};