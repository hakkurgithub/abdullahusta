import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // --- KESİN GİRİŞ BİLGİLERİ ---
    const KULLANICI = 'admin';
    const SIFRE = 'Abdullahusta2026';

    if (username === KULLANICI && password === SIFRE) {
      
      const cookieStore = await cookies();
      
      // Giriş biletini oluştur
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 // 1 Gün
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Hatalı kullanıcı adı veya şifre!' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}