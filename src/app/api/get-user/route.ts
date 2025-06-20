import { prisma } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  slug: string;
};
export async function GET(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new Response(JSON.stringify({
                status: 401,
                message: "User not authenticated.",
            }), { status: 401 });
        }
        const userDetails = await prisma.$queryRaw<UserData>`SELECT profile.*, studio.slug FROM profile LEFT JOIN studio ON profile.id = studio.user_id WHERE Profile.id = ${user.id}`;

        if (!userDetails) {
            return new Response(JSON.stringify({
                status: 404,
                message: "User not found.",
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            status: 200,
            message: "User found.",
            data: userDetails
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Something went wrong.",
            error: error instanceof Error ? error.message : String(error),
        }), { status: 500 });
        
    }
}