import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const adminSession = request.cookies.get('admin_session')?.value

  // Admin alt sayfalarına (/admin/dashboard, /admin/orders) girmeye çalışıyorsa
  // AMA elinde admin kartı yoksa...
  if (path.startsWith('/admin/') && !adminSession) {
    // Onu giriş kapısına (/admin) geri gönder
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  // (Opsiyonel) Müşteri koruması - Profil sayfaları için
  const protectedUserRoutes = ['/profile', '/checkout']
  if (protectedUserRoutes.some(route => path.startsWith(route))) {
    if (!request.cookies.get('auth_token')?.value) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Sadece bu yollarda çalış, diğer sayfaları yavaşlatma
  matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*'],
}