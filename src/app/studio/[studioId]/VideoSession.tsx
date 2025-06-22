"use client";

import { DialogCloseButton } from "@/components/Dialog/ShareLink";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import VideoComponents from "./VideoComponents";
import { createSession, deleteSession } from "@/actions/createSession";
import useUserStore from "@/store/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const VideoSession = ({ token, roomId, isHost }: { token: string; roomId: string; isHost: boolean }) => {
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
      if (res.status === 200) console.log(res);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="flex h-screen w-full p-4 bg-background">
      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1 bg-secondary shadow-md">
          <CardHeader className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Untitled Recording"
                className="text-xl font-bold w-[300px]  text-white"
                disabled={!isHost}
                defaultValue={title}
                onBlur={(e) => {
                  setTitle(e.target.value);
                  hasCreatedRef.current = false;
                }}
              />
              <span className="text-sm text-muted-foreground">Auto saved</span>
            </div>
            {isHost && <DialogCloseButton link={roomId} />}
          </CardHeader>

          <CardContent className="flex-1 relative overflow-hidden">
            <VideoComponents token={token} delSession={delSession} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoSession;
