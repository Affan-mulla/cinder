"use client";
import React, { useEffect } from "react";
import Folder from "./Folder";
import axios from "axios";
import useUserStore from "@/store/store";
import SkeletonBox from "../SkeletonBox";

const ProjectsDisplay = () => {
  const user = useUserStore((g) => g.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  
  const deleteProject = async (id : string) => {
    try {
      const response = await axios.delete(`/api/projects/delete`, {
        data: {
          projectId: id,
        },
      });
      if (response.status === 200) {
        await fetchProjects(); 
        console.log("Project deleted successfully");
      } else {
        console.error("Failed to delete project:", response.data);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("/api/projects/all-projects", {
        params: { studioId: user.studio_id },
      });
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
    <div className="relative flex-1">
      <div
        className="grid gap-4 px-2 pb-2 overflow-y-auto scroll-smooth custom-scroll flex-1"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {projects.length > 0 && projects ? (
          projects.map((project, index) => <Folder key={index} projectProp={project} deleteProject={deleteProject} />)
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-heading text-3xl">No projects available.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDisplay;
