import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resolvedParam = searchParams.get('resolved');
  const resolved = resolvedParam === 'false' ? false : resolvedParam === 'true' ? true : undefined;

  const incidents = await prisma.incident.findMany({
    where: resolved !== undefined ? { resolved } : {},
    orderBy: { tsStart: 'desc' },
    include: { camera: true }
  });

  return NextResponse.json(incidents);
}
