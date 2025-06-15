"use client";

import { getToken } from "@/actions/getToken";
import { checkHost } from "@/actions/getUserDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/store";
import { ChevronLeft, FlameKindling, Tally1 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import VideoSession from "./VideoSession";

const Page = () => {
  const user = useUserStore((s) => s.user);
  const { studioId } = useParams();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [token, setToken] = useState("");

  const guestRoom = searchParams.get("t");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } });

  // Assign guest room if present
  useEffect(() => {
    if (guestRoom) setRoomId(guestRoom);
  }, [guestRoom]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      let finalRoomId = roomId;

      if (!finalRoomId) {
        // Generate random room ID if host
        finalRoomId = Math.random().toString(36).substring(2, 10);
        setRoomId(finalRoomId);
      }

      // Check if user is host
      let isUserHost = false;
      if (user?.id && !guestRoom) {
        const check = await checkHost({ userId: user.id, slug: studioId as string });
        if (check.status === 200) {
          isUserHost = true;
          setIsHost(true);
        }
      }

      // Get token
      const tokenRes = await getToken({
        identity: data.name,
        room: finalRoomId,
        isHost: isUserHost,
      });

      if (tokenRes.token) {
        setToken(tokenRes.token);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render video session if token is set
  if (token) {
    return <VideoSession token={token} roomId={roomId} isHost={isHost} />;
  }

  // Render join form
  return (
    <div className="flex h-screen flex-col p-2 bg-neutral-900 text-white">
      {/* Header */}
      <div className="w-full flex items-center p-2 gap-2 text-xl">
        <Link href="/dashboard/home" className="p-1 rounded-lg hover:bg-neutral-800">
          <ChevronLeft className="size-7" />
        </Link>
        <div className="flex gap-1 items-center">
          <FlameKindling className="size-7" />
          <h1>Cinder</h1>
        </div>
        <div className="flex items-center">
          <Tally1 className="size-7" />
          <h1>{user?.name}'s Studio</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="bg-neutral-800 max-w-[30rem] w-full p-4 rounded-2xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold">Enter your name to continue...</h1>
            <Input
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="text-black"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
