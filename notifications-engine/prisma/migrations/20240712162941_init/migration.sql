/*
  Warnings:

  - You are about to drop the column `date` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `idmetadata` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `Metadata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_idmetadata_fkey";

-- DropIndex
DROP INDEX "Notification_idmetadata_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "date",
DROP COLUMN "idmetadata",
DROP COLUMN "method",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "iduser" TEXT NOT NULL DEFAULT '5';

-- DropTable
DROP TABLE "Metadata";
