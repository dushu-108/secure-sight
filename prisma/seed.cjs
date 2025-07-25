const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Clean up existing data
  await prisma.incident.deleteMany({});
  await prisma.camera.deleteMany({});

  const cameraData = [
    { name: 'Shop Floor A', location: 'North Wing', thumbnailUrl: '/thumbnails/gun1.jpg' },
    { name: 'Vault', location: 'Restricted Zone', thumbnailUrl: '/thumbnails/unauth1.jpg' },
    { name: 'Entrance', location: 'Main Gate', thumbnailUrl: '/thumbnails/face1.jpg' },
  ];

  await prisma.camera.createMany({
    data: cameraData,
  });

  const cameras = await prisma.camera.findMany();

  const cameraMap = cameras.reduce((acc, camera) => {
    acc[camera.name] = camera.id;
    return acc;
  }, {});

  const now = new Date();
  const hoursAgo = (h) => new Date(now.getTime() - h * 60 * 60 * 1000);

  await prisma.incident.createMany({
    data: [
      {
        cameraId: cameraMap['Shop Floor A'],
        type: 'Unauthorised Access',
        tsStart: hoursAgo(1),
        tsEnd: hoursAgo(0.9),
        thumbnailUrl: '/thumbnails/unauth1.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Vault'],
        type: 'Gun Threat',
        tsStart: hoursAgo(3),
        tsEnd: hoursAgo(2.5),
        thumbnailUrl: '/thumbnails/gun1.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Entrance'],
        type: 'Face Recognised',
        tsStart: hoursAgo(4),
        tsEnd: hoursAgo(3.8),
        thumbnailUrl: '/thumbnails/face1.jpg',
        resolved: true,
      },
      {
        cameraId: cameraMap['Shop Floor A'],
        type: 'Gun Threat',
        tsStart: hoursAgo(5),
        tsEnd: hoursAgo(4.7),
        thumbnailUrl: '/thumbnails/gun2.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Vault'],
        type: 'Unauthorised Access',
        tsStart: hoursAgo(6),
        tsEnd: hoursAgo(5.9),
        thumbnailUrl: '/thumbnails/unauth2.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Entrance'],
        type: 'Face Recognised',
        tsStart: hoursAgo(7),
        tsEnd: hoursAgo(6.8),
        thumbnailUrl: '/thumbnails/face2.jpg',
        resolved: true,
      },
      {
        cameraId: cameraMap['Shop Floor A'],
        type: 'Gun Threat',
        tsStart: hoursAgo(8),
        tsEnd: hoursAgo(7.5),
        thumbnailUrl: '/thumbnails/gun3.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Vault'],
        type: 'Unauthorised Access',
        tsStart: hoursAgo(10),
        tsEnd: hoursAgo(9.5),
        thumbnailUrl: '/thumbnails/unauth3.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Entrance'],
        type: 'Face Recognised',
        tsStart: hoursAgo(12),
        tsEnd: hoursAgo(11.7),
        thumbnailUrl: '/thumbnails/face3.jpg',
        resolved: true,
      },
      {
        cameraId: cameraMap['Shop Floor A'],
        type: 'Gun Threat',
        tsStart: hoursAgo(15),
        tsEnd: hoursAgo(14.5),
        thumbnailUrl: '/thumbnails/gun4.jpg',
        resolved: false,
      },
      {
        cameraId: cameraMap['Vault'],
        type: 'Face Recognised',
        tsStart: hoursAgo(18),
        tsEnd: hoursAgo(17.8),
        thumbnailUrl: '/thumbnails/face4.jpg',
        resolved: true,
      },
      {
        cameraId: cameraMap['Entrance'],
        type: 'Unauthorised Access',
        tsStart: hoursAgo(22),
        tsEnd: hoursAgo(21.5),
        thumbnailUrl: '/thumbnails/unauth4.jpg',
        resolved: false,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
