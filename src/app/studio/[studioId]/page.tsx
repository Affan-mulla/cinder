"use client";

import { set, useForm } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Camera,
  CameraOff,
  ChevronLeft,
  LoaderCircle,
  Mic,
  MicOff,
  Tally1,
} from "lucide-react";
import useUserStore from "@/store/store";
import StoreLoader from "@/components/Loader/StoreLoader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoSession from "./VideoSession";

const Page = () => {
  const user = useUserStore((s) => s.user);
  const hasHydrated = useUserStore((s) => s.hasHydrated);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = useParams();
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identity: "",
      room: path.studioId,
    },
  });

  if (!hasHydrated || path.studioId === undefined || path.studioId === null) {
    return <StoreLoader />;
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const createSession = await axios.post(
        "http://localhost:3001/token",
        data
      );
      if (createSession.status === 200) {
        setToken(createSession.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (token) {
    return <VideoSession token={token} />;
  }

  return (
    <div className="bg-neutral-900 h-screen w-full flex flex-col text-white">
      <div className="w-full flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/home"
            className="p-1 hover:bg-neutral-800/60 rounded-lg"
          >
            <ChevronLeft />
          </Link>
          <p className="font-semibold text-lg">Cinder</p>
          <Tally1 />
          <p className="font-semibold">{user.name.split("-")[0] || path.studioId}'s Studio</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex justify-center items-center gap-20 p-8"
      >
        <div className="flex justify-center items-center gap-3 flex-col max-w-[400px] w-full">
          <h1 className="text-2xl font-bold">Enter Session details</h1>
          <Input
            placeholder="Enter your name"
            className="w-full bg-neutral-700/50 border-violet-500"
            {...register("identity", { required: true })}
          />
          {errors.identity && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
          <Button
            className="mt-2 w-full bg-violet-700 hover:bg-violet-600 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Studio"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
