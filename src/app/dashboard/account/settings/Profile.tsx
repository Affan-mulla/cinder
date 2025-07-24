import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
type FormData = {
  id: string;
  name: string;
  avatar_url: string | File;
};

const Profile = ({ user }: any) => {
    const inputFile = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(user.avatar_url || "/user.svg");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      id: user.id,
      name: user.name,
      avatar_url: user.avatar_url || "",
    },
  });

  const uploadImage = async () => {
    const file = inputFile.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileImg");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/deehox5kc/image/upload",
      formData
    );
    return res;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const avatar = await uploadImage();

      
      data.avatar_url = avatar?.data.url;
      const res = await axios.put("/api/settings", data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = () => {
    const file = inputFile.current?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="sm:flex-1 flex flex-col p-6 lg:p-10 bg-card rounded-2xl border border-border shadow-md">
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
          <p className="text-sm text-muted-foreground">
            Click to change picture
          </p>
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
          <Button
            type="submit"
            disabled={isLoading}
            className="w-fit text-white cursor-pointer"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile