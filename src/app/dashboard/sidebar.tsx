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
import { page } from "../../util/data";
import LinkBtn from "@/components/Sidebar/linkBtn";
import { UserButton, useUser } from "@clerk/nextjs";
import useUserStore from "@/store/store";
import Link from "next/link";
import { ModeToggle } from "@/components/Theme/ThemeToggle";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const params = usePathname();
  const { user } = useUserStore();
  return (
    <motion.div
      animate={{
        width: isOpen ? "calc(var(--spacing) * 65)" : "72px",
      }}
      transition={{
        ease: "linear",
      }}
      className={` h-screen  transition-width duration-300`}
    >
      <div className=" p-4 flex justify-between h-full flex-col w-full border-r border-border shadow-right shadow-md">
        <div className="h-fit w-full ">
          <div
            className={`${
              isOpen === false ? "justify-center" : ""
            } flex items-center justify-between mt-2 mb-6`}
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  
                  transition={{
                    duration: 0.2,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Link href="/dashboard/home" className="flex items-baseline-last  w-full accent-accent text-2xl">
                    <p>&#128293;</p>
                    <h3 className=" font-bold font-heading align-text-bottom ">
                      Cinder
                    </h3>
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ y: 1 }}
              className="p-1.5 rounded-full hover:bg-accent-foreground hover:text-background cursor-pointer transition-colors duration-200"
            >
              {isOpen ? (
                <PanelRightOpen strokeWidth={1.9} />
              ) : (
                <PanelRightClose strokeWidth={1.9} />
              )}
            </motion.button>
          </div>
          <motion.div className="flex flex-col gap-2 font-body font-light">
            {page.map((item, index) => (
              <LinkBtn
                key={index}
                name={item.name}
                link={
                  item.name === "Studio" ? `/studio/${user.slug}` : item.href
                }
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
            link="/dashboard/account/settings"
            params={params}
            Icon={Settings}
            index={0}
            isOpen={isOpen}
          />
          <div className={`${isOpen ? "ml-3" : ""}`}>
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
