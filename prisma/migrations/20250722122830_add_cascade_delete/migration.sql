-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_host_id_fkey";

-- DropForeignKey
ALTER TABLE "studio" DROP CONSTRAINT "studio_userId_fkey";

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio" ADD CONSTRAINT "studio_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
