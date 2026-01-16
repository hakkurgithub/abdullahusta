import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");

  // 1. Korumalı Rotalar (Giriş yapmayan giremez)
  const isProtectedRoute = pathname.startsWith('/profile') || pathname.startsWith('/admin');
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Token varsa Rol Kontrolü yap
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const role = payload.role as string;

      // Eğer Admin sayfasına girmeye çalışıyorsa ve rolü ADMIN değilse
      if (pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url)); // Ana sayfaya at
      }
      
      // Eğer giriş yapmışsa ve tekrar login/register sayfasına gitmeye çalışıyorsa
      if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url));
        return NextResponse.redirect(new URL('/profile', request.url));
      }

    } catch (error) {
      // Token geçersizse sil ve login'e at
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/login', '/register'],
};
