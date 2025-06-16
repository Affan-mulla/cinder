import React from "react";
import { Button } from "../ui/button";
import { Camera, Play } from "lucide-react";
import {
  CameraDisabledIcon,
  CameraIcon,
  LeaveIcon,
  MicDisabledIcon,
  MicIcon,
  useRoomContext,
} from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { Track } from "livekit-client";
import useUserStore from "@/store/store";
import axios from "axios";
import { deleteSession } from "@/actions/createSession";

const Buttons = ({ delSession }: { delSession: () => void }) => {
  const room = useRoomContext();
  const router = useRouter();
  const [camera, setCamera] = React.useState(
    room.localParticipant.isCameraEnabled
  );
  const [mic, setMic] = React.useState(
    room.localParticipant.isMicrophoneEnabled
  );
  const cameraToggle = () => {
    room.localParticipant.setCameraEnabled(
      !room.localParticipant.isCameraEnabled
    );
    setCamera(room.localParticipant.isCameraEnabled);
  };

  const micToggle = () => {
    room.localParticipant.setMicrophoneEnabled(
      !room.localParticipant.isMicrophoneEnabled
    );
    setMic(room.localParticipant.isMicrophoneEnabled);
  };

  const disconnectAndRedirect = () => {
    console.log("Disconnecting from room...");
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop(); // ✅ this triggers onstop and uploads the file
    }
    
    room.disconnect();
  };

  const leaveRoom = async() => {
    if (user.id) {
      await room.localParticipant.publishData(new TextEncoder().encode("end-call"));
      if(chunks.length === 0) {
        delSession();
        router.push("/dashboard/home");
      }
    }
    disconnectAndRedirect();
  };

  let mediaRecorder: MediaRecorder;
  let chunks: Blob[] = [];

  async function startLocalRecording() {
    console.log("Starting local recording...");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File(
        [blob],
        `${room.localParticipant.identity}-${Date.now()}.webm`,
        {
          type: "video/webm",
        }
      );

      // Upload here (Supabase, Appwrite, etc.)
      const result = await uploadToCloudinary(file);

      console.log("Cloudinary URL:", result);
    };

    mediaRecorder.start();
  }

  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "videos");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/deehox5kc/video/upload",
      formData
    );

    const data = await res.data;

    console.log(data);
    return data;
  }

  room.on("dataReceived", (payload) => {
    const message = new TextDecoder().decode(payload);
    if (message === "start-recording") {
      startLocalRecording();
    }
    if (message === "end-call") {
      disconnectAndRedirect();
    }
  });

  const user = useUserStore((s) => s.user);

  return (
    <div className="h-[5rem]  w-full absolute bottom-0 p-2 flex justify-center">
      <div className="flex justify-center items-center gap-2 bg-violet-600 rounded-2xl px-5 w-fit">
        {user.id && (
          <Button
            onClick={() => {
              room.localParticipant.publishData(
                new TextEncoder().encode("start-recording")
              );
              startLocalRecording();
            }}
          >
            <Play />
          </Button>
        )}
        <Button onClick={cameraToggle}>
          {camera ? <CameraIcon /> : <CameraDisabledIcon />}
        </Button>
        <Button onClick={micToggle}>
          {mic ? <MicIcon /> : <MicDisabledIcon />}
        </Button>
        <Button onClick={leaveRoom}>
          <LeaveIcon />
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
