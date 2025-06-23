"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import {
  CameraDisabledIcon,
  CameraIcon,
  LeaveIcon,
  MicDisabledIcon,
  MicIcon,
  useRoomContext,
} from "@livekit/components-react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/store";
import axios from "axios";
const Buttons = ({ delSession }: { delSession: () => void }) => {
  const room = useRoomContext();
  const router = useRouter();
  const user = useUserStore.getState().user;

  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  let session_id = "";
  let participant_id = "";
  const chunks = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const toggleCamera = () => {
    const newState = !room.localParticipant.isCameraEnabled;
    room.localParticipant.setCameraEnabled(newState);
    setCamera(newState);
  };
  const toggleMic = () => {
    const newState = !room.localParticipant.isMicrophoneEnabled;
    room.localParticipant.setMicrophoneEnabled(newState);
    setMic(newState);
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "videos");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/deehox5kc/video/upload",
      formData
    );

    return res.data;
  };

  const addParticipant = async ({ sessionId }: { sessionId: string }) => {
    session_id = sessionId;
    if (!sessionId) return console.warn("Session id not found");
    console.log("Adding participant...");
    const res = await axios.post("/api/participant", {
      sessionId,
    })
    console.log(res);
    
    if (res.status === 200) {
      participant_id = res.data.data?.id || "";
    };
  };

  const createRecording = async(data : any) => {
    console.log("createRecording");
    
    const {secure_url : fileUrl,duration} = data;
    if(!fileUrl || !duration || !participant_id || !session_id) return console.warn({fileUrl,duration,participant_id,session_id});

    const res = await axios.post("/api/recording", {
      fileUrl,
      participant_id,
      session_id,
      duration
    })
    if(res.status === 200){
      console.log(res.data);
    }

  }

  const startLocalRecording = async () => {
    if (isRecording) return;

    console.log("Starting local recording...");
    setIsRecording(true);
    if (user.id) {
      // Send session ID to remote participants
      room.localParticipant.publishData(
        new TextEncoder().encode(`session-id:${user.session_id}`)
      );
      addParticipant({ sessionId: user.session_id });
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunks.current = [];

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const file = new File(
        [blob],
        `${room.localParticipant.identity}-${Date.now()}.webm`,
        { type: "video/webm" }
      );

      try {
        const result = await uploadToCloudinary(file);
        if(result){
          console.log("result");
          
          createRecording(result)
        }
        console.log("Cloudinary URL:", result);
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

    recorder.start();
  };

  const disconnectAndRedirect = () => {
    console.log("Disconnecting from room...");
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    } else{
      if (user.id) delSession();
    }
    room.disconnect();
    router.push("/dashboard/home");
  };

  const leaveRoom = async () => {
    if (user.id) {
      await room.localParticipant.publishData(
        new TextEncoder().encode("end-call")
      );
    }
    disconnectAndRedirect();
  };

  useEffect(() => {
    const handleData = (payload: Uint8Array) => {
      let remoteSessionId: string | null = null;
      const message = new TextDecoder().decode(payload);

      if (message.startsWith("session-id:")) {
        remoteSessionId = message.split("session-id:")[1];
        console.log("Received session ID:", remoteSessionId);
        // Call addParticipant with received session ID
        addParticipant({ sessionId: remoteSessionId });
      }

      if (message === "start-recording" && !isRecording) {
        startLocalRecording();
      }

      if (message === "end-call") {
        console.log("Received end-call message");
        disconnectAndRedirect();
      }
    };

    room.on("dataReceived", handleData);
    return () => {
      room.off("dataReceived", handleData);
    };
  }, [isRecording]);

  return (
    <div className="h-[5rem] w-full absolute -bottom-3 z-100 p-2 flex justify-center">
      <div className="flex justify-center items-center gap-2 bg-background/80 border border-border rounded-2xl px-5 w-fit ">
        {user.id && (
          <Button
            onClick={() => {
              room.localParticipant.publishData(
                new TextEncoder().encode("start-recording")
              );
              startLocalRecording(); // ✅ still needed to start locally
            }}
          >
            <Play className="text-foreground" />
          </Button>
        )}
        <Button onClick={toggleCamera} className="text-foreground">
          {camera ? <CameraIcon /> : <CameraDisabledIcon />}
        </Button>
        <Button onClick={toggleMic} className="text-foreground">
          {mic ? <MicIcon /> : <MicDisabledIcon />}
        </Button>
        <Button onClick={leaveRoom} className="text-foreground">
          <LeaveIcon />
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
