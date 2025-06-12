import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantName,
  ParticipantTile,
  TrackLoop,
  useTracks,
  VideoTrack,
} from "@livekit/components-react";
import { Participant, Track } from "livekit-client";

interface LivekitComponentsProps {
  token: string;
}

const LivekitComponents = ({ token }: LivekitComponentsProps) => {
  return (
    <LiveKitRoom
      serverUrl="wss://cinder-yprycp7v.livekit.cloud"
      token={token}
      connect
      video
      audio
      className="w-full h-screen flex flex-col bg-neutral-950 rounded-2xl overflow-hidden"
    >
      <GridLayoutComponent />
    </LiveKitRoom>
  );
};

const GridLayoutComponent = () => {
  const tracks = useTracks([Track.Source.Camera]);
  console.log(tracks);
  

  return (
    <GridLayout tracks={tracks}  className="w-full h-full flex p-2 gap-2">
      
      <VideoTrack className="flex rounded-2xl  overflow-hidden h-full object-cover flex-wrap" >
      </VideoTrack>
    </GridLayout>
  );
};

export default LivekitComponents;