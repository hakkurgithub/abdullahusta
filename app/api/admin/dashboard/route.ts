import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Istatistikleri Prisma ile çekiyoruz (pg modülüne gerek yok)
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();

    return NextResponse.json({
      userCount,
      productCount,
      orderCount
    });
  } catch (error) {
    console.error('Dashboard hatasi:', error);
    return NextResponse.json(
      { message: 'Veriler alinamadi.' }, 
      { status: 500 }
    );
  }
}
