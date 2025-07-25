/*
  Warnings:

  - The primary key for the `Camera` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Camera` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Incident` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `cameraId` on the `Incident` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_cameraId_fkey";

-- AlterTable
ALTER TABLE "Camera" DROP CONSTRAINT "Camera_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Camera_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "cameraId",
ADD COLUMN     "cameraId" INTEGER NOT NULL,
ADD CONSTRAINT "Incident_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
