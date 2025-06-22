"use client";

import VideoTile from "@/components/Livekit/CustomVideo";
import Buttons from "@/components/VideoRoom/Buttons";
import {
  LiveKitRoom,
  useTracks,
  AudioTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React from "react";

const RoomRenderer = () => {
  const videoTracks = useTracks([Track.Source.Camera]);
  const audioTracks = useTracks([Track.Source.Microphone]);

  return (
    <>
      <div
        className="grid auto-rows-auto gap-4 bg-muted border border-border items-center p-4 rounded-xl overflow-hidden h-full w-full"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
        }}
      >
        {videoTracks.map((trackRef, i) => (
          <VideoTile trackRef={trackRef} key={i} />
        ))}
      </div>

      {audioTracks.map((track, i) => (
        <AudioTrack trackRef={track} key={i} className="hidden" muted={false} />
      ))}
    </>
  );
};

const VideoComponents = ({
  token,
  delSession,
}: {
  token: string;
  delSession: () => void;
}) => {
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
      <Buttons delSession={delSession} />
    </LiveKitRoom>
  );
};

export default VideoComponents;
