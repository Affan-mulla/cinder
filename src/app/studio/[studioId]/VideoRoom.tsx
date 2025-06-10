"use client";


import { useEffect, useRef, useState } from "react";
import {Room, RemoteParticipant, LocalVideoTrack, createLocalVideoTrack, RoomEvent } from "livekit-client";
import { useParams, useSearchParams } from "next/navigation";

const VideoCall = ({ token }: { token: string }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [room, setRoom] = useState<Room | null>(null);

  const t = useSearchParams().get("t");
  console.log(t);
  console.log(token);

  useEffect(() => {
    const startCall = async () => {
      const newRoom = new Room();
      setRoom(newRoom);

      await newRoom.connect( "ws://localhost:7880", token);

      // Publish local video
      const localVideoTrack = await createLocalVideoTrack();
      newRoom.localParticipant.publishTrack(localVideoTrack);
      if (localVideoRef.current) {
        localVideoTrack.attach(localVideoRef.current);
      }

      

      // Handle remote participant
      newRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        if (track.kind === "video" && remoteVideoRef.current) {
          track.attach(remoteVideoRef.current);
        }
      });
    };

    startCall();

    return () => {
      room?.disconnect();
    };
  }, [token]);

  return (
    <div className="flex gap-4">
      <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg" />
      <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg" />
    </div>
  );
};

export default VideoCall;

