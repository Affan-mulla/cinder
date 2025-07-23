import { UsersRound } from "lucide-react";
import React from "react";
import { Participant, Recording } from "@/util/types";
import DownloadBtn from "./DownloadBtn";

const TrackItem = ({
  participant,
  recordings,
}: {
  participant: Participant;
  recordings: Recording;
}) => {
  if (!participant || !recordings) {
    return (
      <div className="text-muted-foreground">
        Participant or recording missing
      </div>
    );
  }

  const durationInSeconds = recordings.duration || 0;
  const formattedDuration = new Date(durationInSeconds * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-background p-4 rounded-xl border border-border gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-secondary p-3 rounded-xl shrink-0">
          <UsersRound className="text-primary w-6 h-6" />
        </div>

        <div className="flex flex-col">
          <h4 className="text-base sm:text-lg font-heading">
            {participant.name || "Unnamed"}
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-body">
            <span>{formattedDuration}</span>
            <span className="hidden sm:inline">•</span>
            <span>Max 1080p</span>
          </div>
        </div>
      </div>

      <div className="self-end sm:self-center">
        <DownloadBtn link={recordings.fileUrl} text="Download" />
      </div>
    </div>
  );
};

export default TrackItem;
