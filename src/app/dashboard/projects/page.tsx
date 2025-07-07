"use client"
import { Input } from "@/components/ui/input";
import Folder from "@/components/ui/myComponents/Folder";
import ProjectsDisplay from "@/components/ui/myComponents/ProjectsDisplay";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import React from "react";

const page = () => {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  React.useEffect(() => {
    if (debouncedSearch) {
      const fetchProjects = async () => {
        try {
          const response = await axios.post("/api/projects/search", {
            search: debouncedSearch,
          });
          // Handle the response data as needed
          console.log("Search results:", response.data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      fetchProjects();
    }
  }, [debouncedSearch]);
  
  
  return (
    <div className="py-2 pr-2 h-screen w-full flex-1">
      <div className="h-full w-full rounded-2xl border border-border bg-card shadow-md p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-heading text-2xl">Projects</h1>
          <Input
            placeholder={"🔍 Find a project..."}
            className="w-fit font-body"
            onChange={(e)=> setSearch(e.target.value)}
          />
        </div>   
          <ProjectsDisplay />
      </div>
    </div>
  );
};

export default page;
