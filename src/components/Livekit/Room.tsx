"use client";

import { LiveKitRoom } from "@livekit/components-react";

export default function StudioRoom({ token }: { token: string }) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl="ws://localhost:7880" // your self-hosted server
      connect={true}
      video={true}
      audio={true}
      onConnected={() => {
      }}
      style={{ height: "100vh" }}
    />
  );
}
