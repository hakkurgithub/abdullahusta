import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Kullanıcıyı Bul
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });
    }

    // 2. Şifreyi Kontrol Et (Hashlenmiş şifre karşılaştırması)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Hatalı şifre.' }, { status: 401 });
    }

    // 3. Token Oluştur (JWT)
    // .env dosyasındaki gizli anahtarı kullanır, yoksa yedek anahtarı alır.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");
    
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h') // 1 Gün geçerli
      .sign(secret);

    // 4. ÇEREZİ (COOKIE) ZORLA YAPIŞTIR
    // "path: '/'" ve "SameSite: lax" ayarları çok kritiktir.
    const cookieStore = await cookies();
    
    // Eski çerezi temizle (Çakışmayı önler)
    cookieStore.delete('auth_token');

    // Yenisini ekle
    cookieStore.set('auth_token', token, {
      httpOnly: true, // JavaScript ile erişilemez (Güvenlik)
      secure: process.env.NODE_ENV === 'production', // Sadece HTTPS'de çalışsın (Canlıda)
      sameSite: 'lax', // Yönlendirmelerde çerezi koru
      path: '/', // Sitenin HER YERİNDE geçerli olsun
      maxAge: 60 * 60 * 24 // 24 Saat
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Login Hatası:", error);
    return NextResponse.json({ error: 'Giriş işlemi sırasında teknik bir hata oluştu.' }, { status: 500 });
  }
}