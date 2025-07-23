import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const existing = await prisma.incident.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }

  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !existing.resolved },
  });

  return NextResponse.json(updated);
}
