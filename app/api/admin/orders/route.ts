import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// 1. SİPARİŞLERİ LİSTELE (GET)
export async function GET() {
  try {
    // Admin yetkisi kontrolü
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session')?.value;
    
    if (!adminSession) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, // En yeni sipariş en üstte
      include: {
        items: true, // Siparişin içindeki yemekler
        user: {      // Siparişi veren müşteri bilgisi
          select: { name: true, phone: true, email: true } 
        } 
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Siparişler çekilemedi' }, { status: 500 });
  }
}

// 2. DURUM GÜNCELLE (PATCH)
export async function PATCH(req: Request) {
  try {
    // Admin kontrolü
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session')?.value;
    
    if (!adminSession) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status } = body;

    // Veritabanını güncelle
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}