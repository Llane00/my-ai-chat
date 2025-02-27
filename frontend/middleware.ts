import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 检查是否已登录（通过cookie检查）
  const isAuthenticated = request.cookies.has('auth_token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // 如果是登录页面但已认证，重定向到首页
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 如果未认证且不是登录页面，重定向到登录页
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 配置哪些路径应用此中间件
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 
