import { prisma } from "@/lib/prismaClient";

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    

    if (!data.sessionId) {
      return new Response(JSON.stringify({ error: "Session Id is required" }), {
        status: 400,
      });
    }

    const res = await prisma.session.update({
      where: {
        id: data.sessionId,
      },
      data: {
        isLive: false,
      },
    });

    if (!res) {
      return new Response(
        JSON.stringify({ error: "Failed to update session state" }),
        { status: 500 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Session state updated successfully" }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update session state" }),
      { status: 500 }
    );
  }
}
