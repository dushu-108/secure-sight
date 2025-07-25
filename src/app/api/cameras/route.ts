import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cameras = await prisma.camera.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(cameras);
  } catch (error) {
    console.error("Failed to fetch cameras:", error);
    return NextResponse.json({ error: "Failed to fetch cameras" }, { status: 500 });
  }
}
