import { prisma } from "@/lib/prismaClient";

export async function POST(req : Request) {
    try {
        const { title, hostId, studioId } = await req.json();
        if (!hostId) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "Title and hostId are required.",
                }),
                { status: 400 }
            );
        }

        const res = await prisma.session.create({
            data: {
                title : title || "Untitled Session",
                host_id: hostId,
                studio_id: studioId
            },
        });
        if (res) {
            return new Response(
                JSON.stringify({
                    status: 200,
                    message: "Session created successfully",
                    data: res,
                }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({
                    status: 404,
                    message: "Session not created",
                }),
                { status: 404 }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: "Something went wrong.",
                error: error instanceof Error ? error.message : String(error),
            }),
            { status: 500 }
        );
    }
}