import { prisma } from "@/lib/prismaClient";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  try {
    const currUser = await currentUser();
    if (!currUser?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { userId } = await req.json();
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    if (userId !== currUser.id) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    // Step 1: Delete from DB first
    const deletedProfile = await prisma.profile.delete({ where: { id: userId } });

    // Step 2: Delete from Clerk
    const clerk = await clerkClient();
    await clerk.users.deleteUser(userId);

    return new Response(JSON.stringify({ message: "Account deleted successfully" }), { status: 200 });

  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete account", details: error.message }),
      { status: 500 }
    );
  }
}
