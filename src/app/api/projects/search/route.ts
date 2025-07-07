import { prisma } from "@/lib/prismaClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.search) {
            return new Response(JSON.stringify({ error: "Search term is required" }), {
                status: 400,
            });
        }
        const projects = await prisma.session.findMany({
            where :{
                title : {
                    contains : body.search,
                    mode: 'insensitive', // Case-insensitive search
                }
            },
            include: {
                participants: {
                    select: {
                        name: true,
                        id: true,
                        recordings: {
                            select: {
                                fileUrl: true,
                                duration: true,
                                id: true,
                                createdAt: true,
                            }
                        }
                    }
                }
            },
        });
        return new Response(JSON.stringify(projects), {
            status: 200,
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to search projects" }), {
            status: 500,
        });
    }
}