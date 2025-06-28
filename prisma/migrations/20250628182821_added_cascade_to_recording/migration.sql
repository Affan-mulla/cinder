-- DropForeignKey
ALTER TABLE "recording" DROP CONSTRAINT "recording_session_id_fkey";

-- AddForeignKey
ALTER TABLE "recording" ADD CONSTRAINT "recording_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
