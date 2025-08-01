"use client";

import { DialogCloseButton } from "@/components/Dialog/ShareLink";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import VideoComponents from "./VideoComponents";
import useUserStore from "@/store/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";

const VideoSession = ({ token, roomId, isHost,titleProp }: { token: string; roomId: string; isHost: boolean, titleProp : string }) => {
  const [title, setTitle] = useState(titleProp || "");
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    if (hasCreatedRef.current) return;
    hasCreatedRef.current = true;
    async function sessionCreate() {
      try {

        if (isHost) {
          if (
            user.session_id === "" ||
            user.session_id === null ||
            user.session_id === undefined ||
            !user.session_id
          ) {
            const res = await axios.post("/api/session/create", {
              title,
              hostId: user.id,
              studioId: user.studio_id,
            });
            if (res.status === 200) {
              useUserStore.setState((state) => ({
                user: {
                  ...state.user,
                  session_id: res.data.data.id,
                },
              }));
            }
          } else {
            const res = await axios.post("/api/session/update", {
              title,
              sessionId: user.session_id,
            });
            
          }
        }
      } catch (error) {
        console.error("Error creating session:", error);
      }
    }
    sessionCreate();
  }, [title]);

  const delSession = async () => {
    try {
      const res = await axios.delete("/api/session/delete", {
        data: {
          sessionId: user.session_id,
        },
      });
      if (res.status === 200) {
        useUserStore.setState((state) => ({
          user: {
            ...state.user,
            session_id: "",
          },
        }));
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="flex h-screen w-full sm:p-4 bg-background">
      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1 bg-secondary shadow-md relative">
          <CardHeader className="flex justify-between items-center gap-2 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap ">
              <Input
                placeholder="Untitled Recording"
                className="text-xl font-bold sm:w-[300px] w-[200px]  text-foreground"
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

          <CardContent className="flex-1 overflow-hidden">
            <VideoComponents token={token} delSession={delSession} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoSession;
