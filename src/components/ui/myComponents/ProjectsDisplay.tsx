"use client";
import React, { useEffect } from "react";
import Folder from "./Folder";
import axios from "axios";
import useUserStore from "@/store/store";
import { Skeleton } from "../skeleton";
import SkeletonBox from "../SkeletonBox";

const ProjectsDisplay = () => {
  const user = useUserStore((g) => g.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);

  const fetchProjects = async () => {
    try {
      const result = await axios.get("/api/projects", {
        params: { studioId: user.studio_id },
      });
      console.log("Projects fetched successfully:", result);
      setProjects(result.data.data);
    } catch (error) {
      console.log("Error in display projects :", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.studio_id) {
      fetchProjects();
    } else {
      console.log("No studio ID found for the user.");
    }
  }, []);

  if (isLoading)
    return (
      <div
        className="grid gap-4 px-2 pb-2 overflow-y-auto scroll-smooth custom-scroll flex-1"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBox key={index} />
        ))}
      </div>
    );

  return (
    <div
      className="grid gap-4 px-2 pb-2 overflow-y-auto scroll-smooth custom-scroll flex-1"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {projects.length > 0 ? (
        projects.map((project, index) => <Folder key={index} />)
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="font-heading text-3xl">No projects available.</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectsDisplay;
