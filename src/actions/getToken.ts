'use server'
import { AccessToken } from "livekit-server-sdk";
export async function getToken({identity, room, isHost}: {identity: string, room: string, isHost: boolean}) : Promise<{token:  string}> {
    try {
        if(isHost) {
           
            
            const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, { identity });
            at.addGrant({
                roomCreate: true,
                roomAdmin: true,
                roomJoin: true,
                room: room,
                canPublish: true,
                canSubscribe: true
            });
            const t= await at.toJwt();
            return {
                token : t
            }
            
        } else {
           
            const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, { identity });
            at.addGrant({
                roomCreate: false,
                roomJoin: true,
                room: room,
                canPublish: true,
                canSubscribe: true
            });
            const t=  await at.toJwt();
            
            return {
                token : t
            };
        }
    } catch (error) {
       
       return {
        token : ''
       }
       
    }
}

