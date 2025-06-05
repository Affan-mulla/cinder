"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

import { redirect, usePathname } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  email: string;
  password: string;
  user_name?: string;
};

type Props = {
  title: string;
  description: string;
  link: string;
};

const schema = z.object({
  user_name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

const Form = ({ title, description, link }: Props) => {
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function signInWithGithub() {
   
  

   
    
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    
    
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-4 py-5 text-white">
      <div className="flex flex-col gap-2 w-full text-center">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <p className="text-sm font-semibold">
          {description}{" "}
          <Link href={`${link}`} className="text-violet-600">
            {path === "/register" ? "Login" : "Sign up"}
          </Link>
        </p>
      </div>
      <div className="w-full px-8 mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-center items-center"
        >
          {path === "/register" && (
            <>
              <Input
                {...register("user_name", { required: true })}
                className="border-transparent max-w-[400px] focus-visible:border-violet-600 bg-neutral-800"
                placeholder="Name"
              />
              {errors.user_name && (
                <span className="text-sm text-destructive">
                  This field is required
                </span>
              )}
            </>
          )}
          <Input
            {...register("email", { required: true })}
            className="border-transparent focus-visible:border-violet-600 bg-neutral-800 max-w-[400px]"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-sm text-destructive">
              This field is required
            </span>
          )}
          <Input
            {...register("password", { required: true })}
            placeholder="Password"
            className="border-transparent max-w-[400px] focus-visible:border-violet-600 bg-neutral-800"
          />
          {errors.password && (
            <span className="text-sm text-destructive">
              This field is required
            </span>
          )}

          <Button className="bg-violet-700 hover:bg-violet-800 cursor-pointer w-full max-w-[400px]">
            {loading ? (
              <Loader className="rotate animate-spin" />
            ) : path === "/register" ? (
              "Sign up"
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-2 mt-4 justify-center items-center">
        <p className="text-neutral-400 text-sm">Or</p>
        <Button
          className="bg-neutral-800 hover:bg-neutral-800/70 py-6 cursor-pointer"
          onClick={signInWithGithub}
        >
          <Image
            src="/github-mark-white.svg"
            alt="logo"
            width={25}
            height={25}
          />
          <p>Continue with Github</p>
        </Button>
      </div>
    </div>
  );
};

export default Form;
