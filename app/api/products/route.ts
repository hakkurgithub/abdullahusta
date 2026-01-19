import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Ürünleri Listele (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        category: 'asc', // Kategorilere göre sıralı gelsin
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler çekilemedi' }, { status: 500 });
  }
}

// 2. Yeni Ürün Ekle (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, category, image } = body;

    // Basit doğrulama
    if (!name || !price) {
      return NextResponse.json({ error: 'İsim ve Fiyat zorunludur' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price), // Fiyatı sayıya çevir
        description: description || '',
        category: category || 'Diğer',
        image: image || null,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Ekleme Hatası:", error);
    return NextResponse.json({ error: 'Ürün eklenirken hata oluştu' }, { status: 500 });
  }
}

// 3. Ürün Sil (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Silme işlemi başarısız' }, { status: 500 });
  }
}