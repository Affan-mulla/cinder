"use client";
import useUserStore from "@/store/store";
import Studio from "./Studio";
import Profile from "./Profile";

const Page = () => {
  const user = useUserStore((g) => g.user);
  return (
    <div className="w-full h-full flex flex-col md:flex-row md:flex-wrap gap-2 p-4">
      <Profile user={user} />
      <Studio id={user.studio_id} studioName={user.studio_name} />
    </div>
  );
};

export default Page;
