import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TÜM KULLANICILARI GETİR
export async function GET() {
  try {
    // Şifre hariç tüm bilgileri çek (Güvenlik için şifre select: false yapılır ama Prisma'da manuel seçelim)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
        orders: { // Sipariş geçmişini de görelim (Tercihlerini anlamak için)
          select: { id: true, total: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Kullanıcılar alınamadı' }, { status: 500 });
  }
}

// KULLANICI GÜNCELLE
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, phone, address, role, password } = body;

    // Güncellenecek veri paketi
    const updateData: any = { name, phone, address, role };

    // Eğer yeni şifre girildiyse, onu da güncelle (Girilmediyse dokunma)
    if (password && password.length > 0) {
      updateData.password = password; // Normalde burası hashlenmeli ama şimdilik düz metin kaydediyoruz, login API'nizle uyumlu olsun.
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}

// KULLANICI SİL
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Silme başarısız (Siparişi olan kullanıcı silinemez)' }, { status: 500 });
  }
}