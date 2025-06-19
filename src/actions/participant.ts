"use server"
import { prisma } from "@/lib/prismaClient"

export async function createParticipant({sessionId} : {sessionId : string}) {
    try {
        const res = await prisma.participant.create({
            data : {
                session_id : sessionId
            }
        })
        console.log(res);
        
        if(res) return {
            status : 200,
            message : "Participant created successfully",
            data : res
        }
        return {
            status : 404,
            message : "Participant not created"
        }
    } catch (error) {
        return {
            status : 500,
            message : "Something went wrong."+error
        }
    }
}


