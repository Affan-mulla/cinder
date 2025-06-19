"use server"

import { prisma } from "@/lib/prismaClient"

type Recording = {
    fileUrl : string
    participant_id : string
    duration : number
    session_id : string
}
export async function addRecording({fileUrl, participant_id, session_id, duration} : Recording) {
    try {
        console.log("adding recording",{fileUrl, participant_id, session_id, duration});
        
        const res = await prisma.recording.create({
            data:{
                fileUrl,
                participant_id,
                session_id,
                duration
            }
        })
        console.log(res);
        
        if(res) return {
            status : 200,
            message : "Recording added successfully",
            data : res
        }
        return {
            status : 404,
            message : "Recording not added"
        }
    } catch (error) {
        return {
            status : 500,
            message : "Something went wrong."+error
        }
    }
}