import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  // Await the params to handle Next.js 13+ route parameters
  const { id } = await Promise.resolve(context.params);
  const incidentId = parseInt(id);
  const existing = await prisma.incident.findUnique({ where: { id: incidentId } });

  if (!existing) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }

  const updated = await prisma.incident.update({
    where: { id: incidentId },
    data: { resolved: !existing.resolved },
  });

  return NextResponse.json(updated);
}
