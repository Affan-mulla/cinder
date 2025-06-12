"use client";

import {
  createLocalVideoTrack,
  RemoteVideoTrack,
  Room,
  RoomEvent,
} from "livekit-client";
import { useEffect, useRef, useState } from "react";

const VideoCall = ({ token }: { token: string }) => {
  const [newRoom, setRoom] = useState<Room | null>(null);
  const [remote, setRemote] = useState<RemoteVideoTrack[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCall = async () => {
      const room = new Room();
      setRoom(room);

      await room?.connect("wss://cinder-yprycp7v.livekit.cloud", token);

      const localVideoTrack = await createLocalVideoTrack();
      room?.localParticipant.publishTrack(localVideoTrack);
      if (localVideoRef.current) {
        localVideoTrack.attach(localVideoRef.current);
      }

      room?.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === "video") {
          setRemote((prev) => [...prev, track as RemoteVideoTrack]);
        }
      });

      room?.on(RoomEvent.TrackUnsubscribed, (track) => {
        if (track.kind === "video") {
          setRemote((prev) => prev.filter((t) => t !== track));
        }
      });
    };

    startCall();
    console.log(remote);
    

    return () => {
      newRoom?.disconnect();
    };
    
  }, [token]);

  return (
    <div className="h-full w-full p-2 flex gap-2">
      <video ref={localVideoRef} autoPlay className="flex-1 rounded-xl w-1/2" />
      {remote.map((track) => {
        return <RemoteVideo track={track} key={track.sid} />;
      })}
    </div>
  );
};

const RemoteVideo = ({ track }: { track: RemoteVideoTrack }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      track.attach(ref.current);
    }
    return () => {
      if (ref.current) {
        track.detach(ref.current);
      }
    };
  }, [track]);

  return <video ref={ref} autoPlay className="flex-1 rounded-xl w-1/2" />;
};

export default VideoCall;
