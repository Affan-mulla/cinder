import { prisma } from "@/lib/prismaClient";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

export async function PUT(req: Request) {
  try {
    const data  = await req.json();
    console.log(data);
    

    if (!data) {
      return new Response(JSON.stringify({ error: "Data is required" }), {
        status: 400,
      });
    }

    const res = await prisma.profile.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      },
    });

    if (!res) {
      return new Response(
        JSON.stringify({ error: "Failed to update settings" }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Settings updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update settings" }),
      {
        status: 500,
      }
    );
  }
}
