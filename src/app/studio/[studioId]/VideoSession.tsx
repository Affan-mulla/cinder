"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRoundPlus } from "lucide-react";
import React, { useEffect } from "react";
import LivekitComponents from "./livekitComponents";

const VideoSession = ({ token }: { token: string }) => {

  return (
    <div className="h-screen w-full flex bg-neutral-900 p-2">
      <div className="flex-1/2 flex flex-col gap-3">
        <div className="flex justify-between">
          <Input
            className="w-50 bg-neutral-800 border-0 text-white font-bold text-xl"
            placeholder="Untitled Recording"
          />
          <Button className="bg-neutral-800 hover:bg-neutral-700/70 cursor-pointer">
            <UserRoundPlus />
            <p>Invite</p>
          </Button>
        </div>
        <LivekitComponents token={token} />
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default VideoSession;
