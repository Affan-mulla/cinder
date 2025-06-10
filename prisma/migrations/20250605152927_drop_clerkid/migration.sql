/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profile_clerkId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "clerkId";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");
