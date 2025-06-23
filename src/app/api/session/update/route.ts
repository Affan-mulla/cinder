import { prisma } from "@/lib/prismaClient";

export async function POST(req : Request) {
    try {
        const { title, sessionId } = await req.json();
        console.log("Updating session with title:", title, "and sessionId:", sessionId);
        
        if (!title || !sessionId) {
            return new Response(JSON.stringify({ error: "Title and sessionId are required." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const res = await prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                title : title || "Untitled Session",
            },
        });
        if (res) {
            return new Response(JSON.stringify({ message: "Session updated successfully", data: res }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error: "Session not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong." + error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}