import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  context: any
) {
  const { id } = context.params;
  const incidentId = parseInt(id);

  if (isNaN(incidentId)) {
    return NextResponse.json({ error: 'Invalid incident ID' }, { status: 400 });
  }

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