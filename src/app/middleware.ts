import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login');

  // Se não estiver logado e não estiver na página de login → redireciona
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já estiver logado e tentar ir para /login → redireciona para home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Aplica o middleware apenas em rotas de páginas (evita quebrar CSS/JS/API)
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|.*\\.(.*)).*)'],
};
