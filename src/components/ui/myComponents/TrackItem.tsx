import { Download, UsersRound } from "lucide-react";
import React from "react";
import { Button } from "../button";
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
      <div className="text-muted-foreground">Participant or recording missing</div>
    );
  }

  const durationInSeconds = recordings.duration || 0;
  const formattedDuration = new Date(durationInSeconds * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <div className="flex items-center justify-between bg-background p-3 rounded-xl border border-border">
      <div className="flex items-center gap-4">
        <div className="bg-secondary p-3 rounded-xl">
          <UsersRound className="text-primary" />
        </div>

        <div>
          <h4 className="text-lg font-heading">{participant.name || "Unnamed"}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <span>{formattedDuration}</span>
            <span>•</span>
            <span>Max 1080p</span>
          </div>
        </div>
      </div>

      <DownloadBtn link={recordings.fileUrl} text="Download" />
    </div>
  );
};

export default TrackItem;
