import { prisma } from "@/lib/prismaClient";
export async function GET(req: Request) {
  const studioId = new URL(req.url).searchParams.get("id");
  console.log("Requested ID:", studioId);
  try {
    const res = await prisma.studio.findUnique({
      where: { 
        slug : studioId || undefined
       },
       include : {
        profile: {
          select: {
            name: true,
          }
        },
        sessions : {
          select : {
            title : true
          }
        }
       }
    });
    if (!res) {
      return new Response(JSON.stringify({ error: "Studio not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({
      status: 200,
      message: "Studio details fetched successfully",
      data: res
    }),{status: 200});
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch studio details" }), {
      status: 500,
    });
  }
}