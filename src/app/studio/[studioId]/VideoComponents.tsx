import { Button } from "@/components/ui/button";
import Buttons from "@/components/VideoRoom/Buttons";
import {
  GridLayout,
  LiveKitRoom,
  useTracks,
  VideoTrack,
  TrackReferenceOrPlaceholder,
  ParticipantTile,
  ControlBar,
  CameraDisabledIcon,
  MicDisabledIcon,
  LeaveIcon,
  useRoomContext,
  usePagination,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React from "react";

const RoomRenderer = () => {
  const tracks = useTracks([Track.Source.Camera]);
  const pagination = usePagination(3, tracks)

  return (
    <GridLayout
      tracks={pagination.tracks}
      className={`grid auto-rows-auto  gap-2 bg-neutral-800 items-center p-2 rounded-2xl overflow-hidden h-full w-full`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      }}
    >
      <VideoTrack className="rounded-2xl border-4 border-violet-600 object-cover max-w-[50rem] w-full h-full" />
    </GridLayout>
  );
};

const VideoComponents = ({ token }: { token: string }) => {
  return (
    <LiveKitRoom
      serverUrl="wss://cinder-yprycp7v.livekit.cloud"
      token={token}
      connect={true}
      audio={true}
      video={true}
      className="w-full h-full flex justify-center items-center flex-col"
    >
      <RoomRenderer />
      <Buttons />
    </LiveKitRoom>
  );
};

export default VideoComponents;
