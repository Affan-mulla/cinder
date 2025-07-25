import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

type Props = {
    name: string;
    link: string;
    params: string;
    Icon: any;
    index: number
    isOpen: boolean
    className?: string
    onclick?: () => void
}

const LinkBtn = ({name,link,params,Icon,index,isOpen, className, onclick} : Props) => {
  return (
    <Link onClick={
      onclick
    }
      key={index}
      href={link}
      className={`${className} flex items-center gap-3 text-lg font-semibold font-body  ${
        isOpen == false ? "p-0 justify-center " : " px-4"
      } py-2 rounded-md hover:bg-primary/70 transition-colors duration-200 w-full ${
        params.includes(link) ? "bg-primary text-white" : "text-foreground"
      }`}
    >
      <Icon width={24} height={24} />
      {isOpen && (
        <motion.h3
          className="text-[1rem]"
          transition={{
            delay: 0.2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {name}
        </motion.h3>
      )}
    </Link>
  );
};

export default LinkBtn;
