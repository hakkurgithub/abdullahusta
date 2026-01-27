import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function PATCH(req: Request) {
  try {
    // 1. Kullanıcı Giriş Yapmış mı?
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 });
    }

    // 2. Token'dan User ID'yi al
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // 3. Gelen veriyi al (Telefon ve Adres)
    const body = await req.json();
    const { phone, address } = body;

    // 4. Veritabanını güncelle
    await prisma.user.update({
      where: { id: payload.userId as string },
      data: { phone, address } // Sadece bunları değiştiriyoruz
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Güncelleme sırasında hata oluştu' }, { status: 500 });
  }
}