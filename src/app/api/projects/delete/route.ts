import { prisma } from "@/lib/prismaClient";

export async function DELETE(req: Request) {
    try{
        const { projectId } = await req.json();

        if (!projectId) {
            return new Response(JSON.stringify({ error: "Project ID is required" }), {
                status: 400,
            });
        }
        const project = await prisma.session.delete({
            where: {
                id: projectId,
            },
        });
        if (project) {
            return new Response(JSON.stringify({ message: "Project deleted successfully" }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ error: "Project not found" }), {
                status: 404,
            });
        }
    }catch (error) {
        console.error("Error deleting project:", error);
        return new Response(JSON.stringify({ error: "Failed to delete project" }), {
            status: 500,
        });
    }
}