import { prisma } from "@/lib/prismaClient";

export async function POST(req : Request) {
    try {
        const {fileUrl,participant_id,session_id,duration} = await req.json()

        if(!fileUrl || !participant_id || !session_id || !duration) {
            return new Response(JSON.stringify({
                status: 400,
                message : "Missing required fields: fileUrl, participant_id, session_id, or duration.",
            }), { status: 400 });
        }
        
        const res = await prisma.recording.create({
            data : {
                fileUrl,
                participant_id,
                session_id,
                duration
            }
        })
        
        if(!res) {
            return new Response(JSON.stringify({
                status: 404,
                message: "Recording not added.",
            }), { status: 404 });
        }
        return new Response(JSON.stringify({
            status: 200,
            message: "Recording added successfully.",
            data: res,
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Something went wrong.",
            error: error instanceof Error ? error.message : String(error),
        }), { status: 500 });
    }
}