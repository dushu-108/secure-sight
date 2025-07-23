import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cameras = await prisma.camera.createMany({
    data: [
      { id: 'cam1', name: 'Shop Floor A', location: 'North Wing' },
      { id: 'cam2', name: 'Vault', location: 'Restricted Zone' },
      { id: 'cam3', name: 'Entrance', location: 'Main Gate' },
    ],
  });

  const now = new Date();

  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

  await prisma.incident.createMany({
    data: [
      {
        id: 'i1',
        cameraId: 'cam1',
        type: 'Unauthorised Access',
        tsStart: hoursAgo(1),
        tsEnd: hoursAgo(0.9),
        thumbnailUrl: '/thumbnails/unauth1.jpg',
        resolved: false,
      },
      {
        id: 'i2',
        cameraId: 'cam2',
        type: 'Gun Threat',
        tsStart: hoursAgo(3),
        tsEnd: hoursAgo(2.5),
        thumbnailUrl: '/thumbnails/gun1.jpg',
        resolved: false,
      },
      {
        id: 'i3',
        cameraId: 'cam3',
        type: 'Face Recognised',
        tsStart: hoursAgo(4),
        tsEnd: hoursAgo(3.8),
        thumbnailUrl: '/thumbnails/face1.jpg',
        resolved: true,
      },
      {
        id: 'i4',
        cameraId: 'cam1',
        type: 'Gun Threat',
        tsStart: hoursAgo(5),
        tsEnd: hoursAgo(4.7),
        thumbnailUrl: '/thumbnails/gun2.jpg',
        resolved: false,
      },
      {
        id: 'i5',
        cameraId: 'cam2',
        type: 'Unauthorised Access',
        tsStart: hoursAgo(6),
        tsEnd: hoursAgo(5.9),
        thumbnailUrl: '/thumbnails/unauth2.jpg',
        resolved: false,
      },
      {
        id: 'i6',
        cameraId: 'cam3',
        type: 'Face Recognised',
        tsStart: hoursAgo(7),
        tsEnd: hoursAgo(6.8),
        thumbnailUrl: '/thumbnails/face2.jpg',
        resolved: true,
      },
      {
        id: 'i7',
        cameraId: 'cam1',
        type: 'Gun Threat',
        tsStart: hoursAgo(8),
        tsEnd: hoursAgo(7.5),
        thumbnailUrl: '/thumbnails/gun3.jpg',
        resolved: false,
      },
      {
        id: 'i8',
        cameraId: 'cam2',
        type: 'Unauthorised Access',
        tsStart: hoursAgo(10),
        tsEnd: hoursAgo(9.5),
        thumbnailUrl: '/thumbnails/unauth3.jpg',
        resolved: false,
      },
      {
        id: 'i9',
        cameraId: 'cam3',
        type: 'Face Recognised',
        tsStart: hoursAgo(12),
        tsEnd: hoursAgo(11.7),
        thumbnailUrl: '/thumbnails/face3.jpg',
        resolved: true,
      },
      {
        id: 'i10',
        cameraId: 'cam1',
        type: 'Gun Threat',
        tsStart: hoursAgo(15),
        tsEnd: hoursAgo(14.5),
        thumbnailUrl: '/thumbnails/gun4.jpg',
        resolved: false,
      },
      {
        id: 'i11',
        cameraId: 'cam2',
        type: 'Face Recognised',
        tsStart: hoursAgo(18),
        tsEnd: hoursAgo(17.8),
        thumbnailUrl: '/thumbnails/face4.jpg',
        resolved: true,
      },
      {
        id: 'i12',
        cameraId: 'cam3',
        type: 'Unauthorised Access',
        tsStart: hoursAgo(22),
        tsEnd: hoursAgo(21.5),
        thumbnailUrl: '/thumbnails/unauth4.jpg',
        resolved: false,
      },
    ],
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
