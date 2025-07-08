"use client";
import React from "react";
import Folder from "./Folder";
import SkeletonBox from "../SkeletonBox";

const ProjectsDisplay = ({
  isLoading,
  projects,
}: {
  isLoading: boolean;
  projects: any[];
}) => {
  return (
    <div
      className="grid gap-4 px-2 pb-2 overflow-y-auto scroll-smooth custom-scroll flex-1"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <SkeletonBox key={i} />)
      ) : projects?.length > 0 ? (
        projects.map((project, index) => (
          <Folder key={index} projectProp={project} />
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center">
          <h1 className="font-heading text-3xl">No projects available.</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectsDisplay;
