import { prisma } from "@/lib/prismaClient";
import { useSearchParams } from "next/navigation";

export async function GET(req: Request) {
  try {
    const studioId = new URL(req.url).searchParams.get("studioId");
    if (!studioId) {
      return new Response(JSON.stringify({ error: "Studio ID is required." }), {
        status: 400,
      });
    }

    const projects = await prisma.session.findMany({
      where: { studio_id: studioId },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            recordings: {
              select: {
                id: true,
                fileUrl: true,
                createdAt: true,
                duration: true,
              },
            },
          },
        },
      },
    });

    console.log(projects);
    

    return new Response(
      JSON.stringify({
        data: projects,
        message:
          projects.length > 0
            ? "Projects fetched successfully."
            : "No projects found.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
      }
    );
  }
}
