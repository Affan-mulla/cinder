import { prisma } from "@/lib/prismaClient";

export async function  DELETE(req : Request) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return new Response(JSON.stringify({ error: "Session ID is required" }), {
                status: 400,
            });
        }
        const res = await prisma.session.delete({
            where: {    
                id: sessionId,
            },
        });
        if (res) {
            return new Response(JSON.stringify({ message: "Session deleted successfully" }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ error: "Session not found" }), {
                status: 404,
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete session" }), {
            status: 500,
        });
    }
}