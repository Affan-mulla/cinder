import { prisma } from "@/lib/prismaClient";

export async function POST(req: Request) {
    try {
        const {sessionId} = await req.json();
        if (!sessionId) {
            return new Response(JSON.stringify({
                status: 400,
                message: "Session ID is required.",
            }), { status: 400 });
        }

        const res = await prisma.participant.create({
            data: {
                session_id: sessionId,
            },
        });
        if(!res) {
            return new Response(JSON.stringify({
                status: 404,
                message: "Participant not created.",
            }), { status: 404 });
        }
        return new Response(JSON.stringify({
            status: 200,
            message: "Participant created successfully.",
            data: res,
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Error creating session.",
        }), { status: 500 });
    }
}