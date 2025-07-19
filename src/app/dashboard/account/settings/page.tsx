"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/store/store";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  logo: string | File;
};

const Page = () => {
  const user = useUserStore((g) => g.user);
  const inputFile = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(user.avatar_url || "/user.svg");

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      logo: user.avatar_url || "",
    },
  });

  const onSubmit = (data: FormData) => {
    data.logo = inputFile.current?.files?.[0] || "";
    console.log(data);

    

  };

  const handleFileChange = () => {
    const file = inputFile.current?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="w-full p-6 lg:p-10 bg-card rounded-2xl h-full">
      {/* Page Header */}
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold font-heading">Profile Settings</h1>
        <p className="text-muted-foreground text-sm mt-1 font-body">
          Update your personal info and avatar.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-accent border border-border rounded-2xl shadow-sm max-w-3xl w-full p-6 space-y-6"
      >
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => inputFile.current?.click()}
            className="relative w-24 h-24 rounded-full overflow-hidden border border-border bg-muted hover:scale-105 transition-transform duration-200 cursor-pointer shadow"
          >
            <Image src={preview} alt="Avatar" fill className="object-cover" />
            <Input
              type="file"
              ref={inputFile}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <p className="text-sm text-muted-foreground">Click to change picture</p>
        </div>

        {/* Name Field */}
        <div className="space-y-1">
          <Label className="font-medium">Name</Label>
          <Input {...register("name")} />
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Label className="font-medium">Email</Label>
          <Input value={user.email} disabled />
        </div>

        {/* Submit */}
        <div>
          <Button type="submit" className="w-fit text-foreground cursor-pointer">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
