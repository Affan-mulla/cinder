"use server"
import { prisma } from "@/lib/prismaClient"

type session = {
    title : string,
    hostId : string
    sessionId? : string
}

export const createSession = async({title,hostId,sessionId} : session) : Promise<{status : number, message : string, data? : any}> => {
    try {
        const session = await prisma.session.upsert({
            where : {
                id : sessionId,
            },
            update : {
                title : title
            },
            create : {
                title : title || "Untitled Recording",
                host_id : hostId
            }
        })
console.log(session);

        if(session) return {
            status : 200,
            message : "Session created successfully",
            data : session
        }
        
        return {
            status : 404,
            message : "Session not created"
        }
    } catch (error) {
        return {
            status : 500,
            message : "Something went wrong."+error 
        }
    }
}