"use client";
import {
  FlameIcon,
  PanelRightClose,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { page } from "../util/data";
import LinkBtn from "@/components/Sidebar/linkBtn";
import FaceBtn from "@/components/Sidebar/FaceBtn";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const params = usePathname();

  return (
    <motion.div
      animate={{
        width: isOpen ? "calc(var(--spacing) * 75)" : "72px",
      }}
      transition={{
        ease: "linear",
      }}
      className={` h-screen  transition-width duration-300`}
    >
      <div className=" p-4 flex justify-between h-full flex-col ">
        <div className="h-fit w-full ">
          <div
            className={`${
              isOpen === false ? "justify-center" : ""
            } flex items-center justify-between mb-4`}
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="flex items-center gap-2 w-full"
                  transition={{
                    duration: 0.2,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <FlameIcon className=" text-neutral-300" />
                  <h3 className="text-neutral-300 font-bold text-2xl">
                    Cinder
                  </h3>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ y: 1 }}
              className="p-1.5 rounded-full hover:bg-neutral-800"
            >
              {isOpen ? (
                <PanelRightOpen
                  className="text-neutral-300 "
                  strokeWidth={1.5}
                />
              ) : (
                <PanelRightClose
                  className="text-neutral-300"
                  strokeWidth={1.5}
                />
              )}
            </motion.button>
          </div>
          <motion.div className="flex flex-col gap-2">
            {page.map((item, index) => (
              <LinkBtn
                key={index}
                name={item.name}
                link={item.href}
                params={params}
                Icon={item.icon}
                index={index}
                isOpen={isOpen}
              />
            ))}
          </motion.div>
        </div>
        <div
          className={`${
            isOpen ? "items-start" : "justify-center items-center"
          } flex flex-col gap-4 w-full my-3 `}
        >
          <LinkBtn
            name="Settings"
            link="/dashboard/account/studio-settings"
            params={params}
            Icon={Settings}
            index={0}
            isOpen={isOpen}
          />
          <div className={`${isOpen ? "ml-3" : ""}`}>
            <UserButton />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
