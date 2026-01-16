import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, category, image } = body;

    // Basit doğrulama
    if (!name || !price || !category) {
      return NextResponse.json(
        { message: 'Isim, Fiyat ve Kategori zorunludur.' }, 
        { status: 400 }
      );
    }

    // Veritabanına kaydet
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Fiyatı sayıya çevir
        category,
        image: image || null,
        isAvailable: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Urun ekleme hatasi:', error);
    return NextResponse.json(
      { message: 'Sunucu hatasi olustu.' }, 
      { status: 500 }
    );
  }
}
