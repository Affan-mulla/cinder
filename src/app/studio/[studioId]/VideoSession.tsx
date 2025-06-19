"use client";
import { DialogCloseButton } from "@/components/Dialog/ShareLink";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import VideoComponents from "./VideoComponents";
import { createSession, deleteSession } from "@/actions/createSession";
import useUserStore from "@/store/store";
const VideoSession = ({
  token,
  roomId,
  isHost,
}: {
  token: string;
  roomId: string;
  isHost: boolean;
}) => {
  const [title, setTitle] = useState("");
  const user = useUserStore((s) => s.user);
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    if (hasCreatedRef.current) return;
    hasCreatedRef.current = true;
    async function sessionCreate() {
      try {
        const res = await createSession({
          title,
          hostId: user?.id as string,
          sessionId: user.session_id,
        });
        if (res.status === 200) {
          console.log(res.data);
          useUserStore.setState((state) => ({
            user: { ...state.user, session_id: res.data.id },
          }));
        }
      } catch (error) {
        console.error("Error creating session:", error);
      }
    }

    sessionCreate();
  }, [title]);

  const delSession = async () => {
    try {
      const res = await deleteSession({ sessionId: user.session_id });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="flex h-screen p-4 bg-neutral-900">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Untitled Recording"
            className="font-bold max-w-[25%] text-white bg-neutral-900"
            disabled={!isHost}
            defaultValue={title}
            onBlur={(e) => {
              setTitle(e.target.value);
              hasCreatedRef.current = false;
            }}
          />
          {isHost && <DialogCloseButton link={roomId} />}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <VideoComponents token={token} delSession={delSession} />
        </div>
      </div>
    </div>
  );
};

export default VideoSession;
