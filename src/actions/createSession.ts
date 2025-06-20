"use server";
import { prisma } from "@/lib/prismaClient";

type session = {
  title: string;
  hostId: string;
  sessionId: string;
};

export const createSession = async ({
  title,
  hostId,
  sessionId,
}: session): Promise<{ status: number; message: string; data?: any }> => {
  try {
    if (sessionId) {
      const session = await prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          title,
        },
      });
      if (session)
        return {
          status: 200,
          message: "Session created successfully",
          data: session,
        };
    } else {
      const session = await prisma.session.create({
        data: {
          title,
          host_id: hostId,
        },
      });
      if (session)
        return {
          status: 200,
          message: "Session created successfully",
          data: session,
        };
    }

    return {
      status: 404,
      message: "Session not created",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong." + error,
    };
  }
};

export const deleteSession = async ({ sessionId }: { sessionId?: string }) => {
  try {
    const session = await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    if (session)
      return {
        status: 200,
        message: "Session deleted successfully",
      };
    return {
      status: 404,
      message: "Session not found",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong." + error,
    };
  }
};
