import { TrackReference, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";


const VideoTile = ({ trackRef }: { trackRef: TrackReference }) => {
 
  const isCameraOff = !trackRef.participant.isCameraEnabled
  return (
    <div className="rounded-2xl border-3 border-primary max-w-[50rem] w-full h-full bg-background flex items-center justify-center overflow-hidden">
      {isCameraOff ? (
        <div className="text-foreground text-lg font-semibold">
          Camera is off
        </div>
      ) : (
        <VideoTrack
          trackRef={trackRef}
          className="rounded-2xl w-full h-full object-cover"
          muted={trackRef.participant.isLocal}
        />
      )}
    </div>
  );
};

export default VideoTile;
