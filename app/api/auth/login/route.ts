import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Kullanıcıyı veritabanında bul
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ message: 'Kullanıcı bulunamadı.' }, { status: 401 });
    }

    // 2. Şifreyi kontrol et
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Hatalı şifre.' }, { status: 401 });
    }

    // 3. Güvenli Oturum Anahtarı (JWT) oluştur
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role // Admin mi Müşteri mi?
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h') // Oturum 24 saat geçerli
      .sign(secret);

    // 4. Anahtarı tarayıcıya (Cookie) yerleştir
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true, // JavaScript ile erişilemez (Güvenlik)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 saat
      path: '/',
    });

    return NextResponse.json({ 
      message: 'Giriş başarılı!',
      user: { name: user.name, role: user.role } 
    });

  } catch (error) {
    console.error('Login hatası:', error);
    return NextResponse.json({ message: 'Sunucu hatası.' }, { status: 500 });
  }
}
