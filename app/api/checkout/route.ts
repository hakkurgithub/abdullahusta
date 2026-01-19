import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // 1. Kullanıcı Kontrolü (Giriş yapmış mı?)
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Lütfen önce giriş yapın.' }, { status: 401 });
    }

    // Token'dan Kullanıcı ID'sini al
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");
    let userId;
    
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.userId as string;
    } catch (e) {
      return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
    }

    // 2. Sepet Verisini Al
    const body = await req.json();
    const { items, total, address, paymentMethod, note } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Sepetiniz boş!' }, { status: 400 });
    }

    if (!address) {
      return NextResponse.json({ error: 'Lütfen adres giriniz.' }, { status: 400 });
    }

    // 3. Siparişi Veritabanına Kaydet
    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        total: parseFloat(total),
        address: address,
        paymentMethod: paymentMethod,
        note: note || "",
        status: "PENDING", // Onay Bekliyor
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: parseFloat(item.price),
            quantity: item.quantity
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });

  } catch (error) {
    console.error("Sipariş Hatası:", error);
    return NextResponse.json({ error: 'Sipariş oluşturulamadı.' }, { status: 500 });
  }
}