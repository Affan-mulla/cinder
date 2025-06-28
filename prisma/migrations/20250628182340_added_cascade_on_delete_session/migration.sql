-- DropForeignKey
ALTER TABLE "participant" DROP CONSTRAINT "participant_session_id_fkey";

-- DropForeignKey
ALTER TABLE "recording" DROP CONSTRAINT "recording_participant_id_fkey";

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recording" ADD CONSTRAINT "recording_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
