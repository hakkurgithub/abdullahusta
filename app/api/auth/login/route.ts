import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Kullanıcıyı Bul
    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Şifre Kontrolü (Basit Eşleşme)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Hatalı e-posta veya şifre!' }, { status: 401 });
    }

    // 3. Token Oluştur
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'gizli-anahtar-123');
    const token = await new SignJWT({ email: user.email, role: user.role }) // Role bilgisini ekledik
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey);

    // 4. Çerezi Ayarla
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 gün
    });

    // 5. Başarılı Cevap (Rolü de gönderiyoruz ki ön yüz bilsin)
    return NextResponse.json({ success: true, role: user.role });

  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}