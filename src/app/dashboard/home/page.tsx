import Folder from "@/components/ui/myComponents/Folder";
import HomeButton from "@/components/ui/myComponents/HomeButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { studio } from "@/util/data";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="py-2 pr-2 h-screen w-full flex-1">
      <div className="h-full w-full rounded-2xl border border-border bg-card shadow-md">
        <div className="flex flex-col items-center justify-between h-full px-6 py-10 gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {studio.map(({ name, icon, href }, index) => (
              <HomeButton
                key={index}
                title={name}
                Icon={icon}
                link={href}
                className={
                  name === "Record"
                    ? "bg-[#231215] hover:bg-[#e43b58] text-[#e43b58] hover:text-white"
                    : ""
                }
              />
            ))}
          </div>

          <div className="w-full h-full mt-auto rounded-xl bg-accent p-4">
            <div className="h-full w-full">
              <h1 className="font-heading text-2xl mb-2">Recent</h1>
              <div className="flex gap-2">
               
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
