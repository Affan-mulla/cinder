"use server";
import { prisma } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

export async function getSlug() {
    const user = await currentUser();
    const slug = await prisma.studio.findUnique({
        where : {
            user_id : user?.id
        },
        select : {
            slug : true
        }
    })
    return slug
}