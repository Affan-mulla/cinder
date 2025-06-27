import React from "react";
import { Skeleton } from "./skeleton";

const SkeletonBox = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[250px] w-full max-w-md rounded-2xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonBox;
