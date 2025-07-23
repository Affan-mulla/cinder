"use client";
import { PanelRightOpen, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { page } from "../../util/data";
import LinkBtn from "@/components/Sidebar/linkBtn";
import useUserStore from "@/store/store";
import Link from "next/link";
import { ModeToggle } from "@/components/Theme/ThemeToggle";
import MobileNav from "@/components/ui/myComponents/SidebarMob";

// Animation Variants
const sidebarVariants = {
  open: { width: 260, transition: { duration: 0.2, ease: "easeInOut" } },
  closed: { width: 72, transition: { duration: 0.2, ease: "easeInOut" } },
};

const navVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.2 },
  }),
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const params = usePathname();
  const { user } = useUserStore();

  return (
    <>
     <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="h-screen overflow-hidden border-r border-border shadow-right shadow-md transition-width duration-300 md:block hidden"
      >
        <div className="p-4 flex flex-col justify-between h-full w-full">
          {/* Header */}
          <div>
            <div
              className={`flex items-center mb-6 ${
                isOpen ? "justify-between" : "justify-center"
              }`}
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="logo"
                    initial={{ opacity: 0, scale: 0.85, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href="/dashboard/home"
                      className="flex items-center gap-2 text-2xl text-primary font-heading"
                    >
                      <motion.span
                        initial={{ rotate: -20 }}
                        animate={{ rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        🔥
                      </motion.span>
                      <h3 className="font-bold tracking-tight">Cinder</h3>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="p-1.5 rounded-full hover:bg-accent-foreground hover:text-background transition-colors"
              >
                <PanelRightOpen strokeWidth={1.9} />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2 font-body font-light">
              {page.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={navVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <LinkBtn
                    name={item.name}
                    link={
                      item.name === "Studio"
                        ? `/studio/${user.slug}`
                        : item.href
                    }
                    params={params}
                    Icon={item.icon}
                    index={i}
                    isOpen={isOpen}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex flex-col gap-4 w-full my-3 ${
              isOpen ? "items-start" : "items-center"
            }`}
          >
            <LinkBtn
              name="Settings"
              link="/dashboard/account/settings"
              params={params}
              Icon={Settings}
              index={0}
              isOpen={isOpen}
            />
            <div className={isOpen ? "ml-3" : ""}>
              <ModeToggle />
            </div>
          </motion.div>
        </div>
      </motion.div>
      <MobileNav/>
    </>
     

  );
};

export default Sidebar;
