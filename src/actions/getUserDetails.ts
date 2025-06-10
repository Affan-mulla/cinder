"use server";
import { prisma } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

type GetUserDetailsResponse = {
  status: number;
  message: string;
  data?: UserData[];
};

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  slug: string;
};


export async function getUserDetails() : Promise<GetUserDetailsResponse> {
    const user = await currentUser();
    try {
        const userDetails = await prisma.$queryRaw<UserData[]>`SELECT profile.*, studio.slug FROM profile LEFT JOIN studio ON profile.id = studio.user_id WHERE Profile.id = ${user?.id}`;
        console.log(userDetails);
        if(userDetails) return {
            status : 200,
            message : "User found.",
            data : userDetails 
        }
        
        return {status : 404, message : "User not found."}
        
    } catch (error) {
        console.log(error);
        return {
            status : 500,
            message : "Something went wrong."+error
        }
    }
    
}