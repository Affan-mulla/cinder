import { prisma } from "@/lib/prismaClient";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");

  try {
    if(!id) {
        return new Response(JSON.stringify({ error: "Project ID is required" }), {
          status: 400,
        });
    }
    const result = await prisma.session.findUnique({
        where : {
            id,
        },
        include : {
            participants : {
                select : {
                    name : true,
                    id : true,
                    recordings : {
                        select : {
                            fileUrl : true,
                            duration : true,
                            id : true,
                            createdAt : true,
                        }
                    }
                }
            }
        }
    })

    if(!result) {
        return new Response(JSON.stringify({ error: "Project not found" }), {
          status: 404,
        });
    }
   return new Response(JSON.stringify(result), {
      status: 200,
    });
    
  } catch (error) {
    
    return new Response(JSON.stringify({ error: "Failed to fetch project data" }), {
      status: 500,
    });
  }
}