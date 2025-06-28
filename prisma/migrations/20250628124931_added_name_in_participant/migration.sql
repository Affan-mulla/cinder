/*
  Warnings:

  - Added the required column `name` to the `participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participant" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recording" ALTER COLUMN "duration" SET DATA TYPE DOUBLE PRECISION;
