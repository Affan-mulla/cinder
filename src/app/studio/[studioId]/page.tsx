"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getToken } from "@/actions/getToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/store";
import { ChevronLeft, FlameKindling, Loader, Tally1 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import VideoSession from "./VideoSession";
import axios from "axios";
import StoreLoader from "@/components/Loader/StoreLoader";

type StudioDetails = {
  id: string;
  profile: {
    name: string | null;
  };
  studio_name: string;
  sessions: [{ title: string }];
  slug: string;
  user_id: string;
  logo_url: string | null;
  created_at: string;
};

const Page = () => {
  const user = useUserStore((s) => s.user);
  const { studioId } = useParams<{ studioId: string }>();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const guestRoom = searchParams.get("t");
  const [roomId, setRoomId] = useState("");
  const [token, setToken] = useState("");

  const [isHost, setIsHost] = useState(false);
  const [studioDetails, setStudioDetails] = useState<StudioDetails | null>(
    null
  );

  const [isCheckingHost, setIsCheckingHost] = useState(true);
  const [isFetchingStudio, setIsFetchingStudio] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { name: "", sessionName: "" } });

  useEffect(() => {
    if (studioDetails?.sessions?.[0]?.title) {
      reset({
        sessionName: studioDetails.sessions[0].title || "",
      });
    }
  }, [studioDetails, reset]);

  // Assign room if guest
  useEffect(() => {
    if (guestRoom) setRoomId(guestRoom);
  }, [guestRoom]);

  // Check if user is host
  useEffect(() => {
    async function checkHost() {
      if (user?.id && !guestRoom) {
        try {
          const res = await axios.post("/api/check-host", {
            userId: user.id,
            slug: studioId,
          });
          if (res.status === 200) {
            setIsHost(true);
          }
        } catch (err) {
          console.error("Host check failed", err);
        }
      }
      setIsCheckingHost(false);
    }

    checkHost();
  }, [user, guestRoom, studioId]);

  // Fetch studio details if guest
  useEffect(() => {
    async function fetchStudio() {
      try {
        setIsFetchingStudio(true);
        const res = await axios.get(`/api/get-studio`, {
          params: { id: studioId },
        });
        if (res.status === 200) {
          setStudioDetails(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch studio details", err);
      } finally {
        setIsFetchingStudio(false);
      }
    }

    if (guestRoom && !isHost) fetchStudio();
  }, [guestRoom, isHost, studioId]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsJoining(true);
      let finalRoomId = roomId || Math.random().toString(36).substring(2, 10);
      setRoomId(finalRoomId);
      setTitle(data.sessionName);

      const tokenRes = await getToken({
        identity: data.name,
        room: finalRoomId,
        isHost,
      });

      if (tokenRes.token) {
        setToken(tokenRes.token);
      }
    } catch (err) {
      console.error("Error joining room:", err);
    } finally {
      setIsJoining(false);
    }
  };

  // Show loading screen for guests until studio details are fetched
  if (guestRoom && (isCheckingHost || isFetchingStudio)) {
    return <StoreLoader />;
  }

  // Show session if joined
  if (token) {
    return (
      <VideoSession
        token={token}
        roomId={roomId}
        isHost={isHost}
        titleProp={title}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col p-2 bg-background text-foreground">
      {/* Header */}
      <div className="w-full flex items-center p-2 gap-2 text-xl ">
        <Link
          href="/dashboard/home"
          className="p-1 rounded-lg hover:bg-foreground hover:text-accent transition-colors"
        >
          <ChevronLeft className="size-7" />
        </Link>
        <div className="flex text-3xl items-center h-full">
          <p>&#128293;</p>
          <h1 className="font-heading align-text-bottom h-fit">Cinder</h1>
        </div>
        <div className="flex items-center">
          <Tally1 className="size-9" />
          <h1 className="font-heading font-stretch-50%">
            {user?.name || studioDetails?.profile?.name}'s Studio
          </h1>
        </div>
      </div>
      {/* Join Form */}

      <div className="flex-1 flex justify-center items-center w-full">
        <Card className="bg-card max-w-[30rem] w-full py-6 rounded-2xl">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <h1 className="text-3xl font-heading w-full text-center mb-2">
                Enter your name to continue...
              </h1>
              <Input
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="font-body text-lg font-medium w-full"
              />

              <Input
                placeholder="Enter session name"
                {...register("sessionName", { required: isHost })}
                className="font-body text-lg font-medium w-full"
                disabled={!isHost}
              />

              {errors.name && <p className="text-red-500">Name is required</p>}
              <Button
                type="submit"
                disabled={isJoining}
                className="w-full text-foreground font-heading text-lg font-light cursor-pointer"
              >
                {isJoining ? "Joining..." : "Join"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
