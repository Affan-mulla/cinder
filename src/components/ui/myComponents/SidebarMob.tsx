"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Icon, PlusCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import { Mobilepage, page } from "@/util/data";
import useUserStore from "@/store/store";


export default function MobileNav() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t border-muted flex justify-around items-center md:hidden">

      {Mobilepage.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={
                      item.name === "Studio"
                        ? `/studio/${user.slug}`
                        : item.href
                    } className="flex flex-col items-center text-muted-foreground hover:text-primary transition">
            <motion.div
              animate={isActive ? { scale: 1.2 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={isActive ? "text-primary" : ""}
            >
              <item.icon />
            </motion.div>
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
      
    </div>
  );
}
