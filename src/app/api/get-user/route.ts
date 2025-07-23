import { prisma } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  slug: string;
  studioId: string;
  studio_name: string
};
export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(
        JSON.stringify({
          status: 401,
          message: "User not authenticated.",
        }),
        { status: 401 }
      );
    }
    const userDetails = await prisma.profile.findUnique({
      where: {
        id: user.id,
      },
      include: {
        studio: {
          select: {
            id: true,
            slug: true,
            studio_name: true
          },
        },
      },
    });
    if (!userDetails) {
      return new Response(
        JSON.stringify({
          status: 404,
          message: "User not found.",
        }),
        { status: 404 }
      );
    }

    const filter = {
        id: userDetails.id,
        name : userDetails.name,
        email : userDetails.email,
        avatar_url : userDetails.avatar_url,
        slug : userDetails?.studio?.slug,
        studioId : userDetails?.studio?.id,
        studio_name : userDetails?.studio?.studio_name
    }

    

    return new Response(
      JSON.stringify({
        status: 200,
        message: "User found.",
        data: filter as UserData,
      }),
      { status: 200 }
    );
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
