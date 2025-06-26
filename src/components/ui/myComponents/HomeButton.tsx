import Link from "next/link";
import React from "react";

interface Props {
    title: string;
    Icon: any ;
    link: string;
    className?: string
}

const HomeButton = ({title , Icon,link, className} : Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link href={link} className={ `${className || 'bg-secondary hover:bg-accent'} p-5  rounded-full transition-colors duration-200 }`}>
        <Icon strokeWidth={className ? 4 :2} />
      </Link>
      <p className="font-body text-sm font-semibold">{title}</p>
    </div>
  );
};

export default HomeButton;
