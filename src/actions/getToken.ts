'use server';
import { AccessToken } from "livekit-server-sdk";

export async function getToken({ identity, room }: { identity: string; room: string }) {
  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      { identity }
    );

    token.addGrant({
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      room,
    });

    const jwt = await token.toJwt();
    if(jwt) return { token: jwt };
  } catch (error) {
    return error;
  }
}
