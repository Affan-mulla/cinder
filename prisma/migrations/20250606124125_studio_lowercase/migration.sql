/*
  Warnings:

  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_userId_fkey";

-- DropTable
DROP TABLE "Studio";

-- CreateTable
CREATE TABLE "studio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studio_userId_key" ON "studio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "studio_slug_key" ON "studio"("slug");

-- AddForeignKey
ALTER TABLE "studio" ADD CONSTRAINT "studio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
