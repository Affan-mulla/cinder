import { prisma } from "@/lib/prismaClient";

export async function POST(req: Request) {
  try {
    const { userId, slug } = await req.json();

    if (!userId || !slug) {
      return new Response(JSON.stringify({
        status: 400,
        message: "User ID and slug are required.",
      }), { status: 400 });
    }

    const studio = await prisma.studio.findFirst({
      where: {
        user_id: userId,
        slug: slug,
      },
      select: {
        user_id: true,
      },
    });

    if (studio) {
      return new Response(JSON.stringify({
        status: 200,
        message: "Host found.",
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({
        status: 404,
        message: "Host not found.",
      }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      message: "Something went wrong.",
      error: error instanceof Error ? error.message : String(error),
    }), { status: 500 });
  }
}
