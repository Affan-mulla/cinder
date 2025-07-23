"use client";
import useUserStore from "@/store/store";
import Studio from "./Studio";
import Profile from "./Profile";

const Page = () => {
  const user = useUserStore((g) => g.user);
  return (
   <div className="w-full h-full flex gap-2 p-4 flex-wrap md:flex-row flex-col">
     <Profile user={user} />
    <Studio id={user.studio_id} studioName={user.studio_name} />
   </div>
  );
};

export default Page;
