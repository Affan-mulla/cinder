/*
  Warnings:

  - Added the required column `studio_id` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "studio_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
