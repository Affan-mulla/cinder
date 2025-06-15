/*
  Warnings:

  - You are about to drop the column `sessionId` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `recording` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `recording` table. All the data in the column will be lost.
  - You are about to drop the column `hostUserId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `studio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `studio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `studio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_id` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant_id` to the `recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host_id` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `studio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participant" DROP CONSTRAINT "participant_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "participant" DROP CONSTRAINT "participant_userId_fkey";

-- DropForeignKey
ALTER TABLE "recording" DROP CONSTRAINT "recording_participantId_fkey";

-- DropForeignKey
ALTER TABLE "recording" DROP CONSTRAINT "recording_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_hostUserId_fkey";

-- DropForeignKey
ALTER TABLE "studio" DROP CONSTRAINT "studio_userId_fkey";

-- DropIndex
DROP INDEX "participant_sessionId_idx";

-- DropIndex
DROP INDEX "participant_userId_idx";

-- DropIndex
DROP INDEX "recording_participantId_idx";

-- DropIndex
DROP INDEX "recording_sessionId_idx";

-- DropIndex
DROP INDEX "session_hostUserId_idx";

-- DropIndex
DROP INDEX "studio_userId_key";

-- AlterTable
ALTER TABLE "participant" DROP COLUMN "sessionId",
DROP COLUMN "userId",
ADD COLUMN     "session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recording" DROP COLUMN "participantId",
DROP COLUMN "sessionId",
ADD COLUMN     "participant_id" TEXT NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "hostUserId",
ADD COLUMN     "host_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "studio" DROP COLUMN "logoUrl",
DROP COLUMN "userId",
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "participant_session_id_idx" ON "participant"("session_id");

-- CreateIndex
CREATE INDEX "recording_session_id_idx" ON "recording"("session_id");

-- CreateIndex
CREATE INDEX "recording_participant_id_idx" ON "recording"("participant_id");

-- CreateIndex
CREATE INDEX "session_host_id_idx" ON "session"("host_id");

-- CreateIndex
CREATE UNIQUE INDEX "studio_userId_key" ON "studio"("user_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recording" ADD CONSTRAINT "recording_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recording" ADD CONSTRAINT "recording_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio" ADD CONSTRAINT "studio_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
