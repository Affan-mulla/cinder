import { CameraDisabledIcon, TrackReference, VideoTrack } from "@livekit/components-react";
import { CameraOff } from "lucide-react";


const VideoTile = ({ trackRef }: { trackRef: TrackReference }) => {
 
  const isCameraOff = !trackRef.participant.isCameraEnabled
  return (
    <div className="rounded-2xl border-3 border-primary max-w-[50rem] w-full h-full dark:bg-background bg-accent-foreground flex items-center justify-center overflow-hidden relative">
      <div className="px-4 py-2  dark:bg-background/50 bg-foreground/50 rounded-2xl absolute bottom-2 left-2">
        <h2 className="font-heading dark:text-foreground text-accent text-xl">{trackRef.participant.identity}</h2>
      </div>
      {isCameraOff ? (
        <div className="text-2xl font-semibold font-heading flex justify-center  items-center">
          <CameraOff className="size-30 absolute z-0 text-foreground dark:text-secondary" />
          {/* <p className="z-10">Camera is off</p> */}
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
