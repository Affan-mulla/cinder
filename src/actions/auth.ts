"use server";

import { prisma } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";

export async function onAuthenticateUser() {
    
    try {
        const user = await currentUser();
        if(!user) {
            return {
                status: 401,
                message : "User not found in clerk."
            }
        }

        const findUser = await prisma.profile.findUnique({
            where: {
                id: user.id
            }
        })
        if(findUser) {
            return {
                status: 200,
                message : "User exist in DB."
            }
        }

        const createUser = await prisma.profile.create({
            data: {
                id : user.id,
                name : user.username || user.firstName+" "+user.lastName,
                email : user.emailAddresses[0].emailAddress,
                avatar_url : user.imageUrl || null
            }
        })
        if(createUser) {

            const createStudio = await prisma.studio.create({
                data: {
                    studio_name : createUser.name+" Studio",
                    slug : createUser.name.toLowerCase().replace(/\s+/g, '-').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '')+"-studio-"+Math.random().toString(36).substring(2,7),
                    user_id : user.id,
                    logo_url : createUser.avatar_url || null,
                }
            })

            if(!createStudio) {
                return {
                    status: 502,
                    message : "Something went wrong while creating studio."
                }
            }
            return {
                status: 201,
                message : "User created in DB."
            }
        }

        return {
            status: 500,
            message : "Something went wrong."
        }
    } catch (error) {
        return {
            status: 500,
            message : "Something went wrong."+error
        }
    }
}