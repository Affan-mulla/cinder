import { prisma } from "@/lib/prismaClient";

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        console.log(data);

        if (!data) {
            return new Response(JSON.stringify({ error: "Studio Name is required" }), {
                status: 400,
            });
        }

        const res = await prisma.studio.update({
            where: {
                id: data.id,
            },
            data: {
                studio_name: data.studio_name,
            },
        });

        if (!res) {
            return new Response(JSON.stringify({ error: "Failed to update settings" }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ message: "Settings updated successfully" }), {
            status: 200,
        })

    } catch (error) {

        return new Response(JSON.stringify({ error: "Failed to update settings" }), {
            status: 500,
        })
    }
}