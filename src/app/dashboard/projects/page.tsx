"use client";
import { Input } from "@/components/ui/input";
import ProjectsDisplay from "@/components/ui/myComponents/ProjectsDisplay";
import useDebounce from "@/hooks/useDebounce";
import useUserStore from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const user = useUserStore((g) => g.user);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllProjects = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/projects/all-projects", {
        params: { studioId: user.studio_id },
      });
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching all projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchedProjects = async (query: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/projects/search", { search: query });
      setProjects(res.data);
    } catch (error) {
      console.error("Error searching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user.studio_id) return;
    if (debouncedSearch) {
      fetchSearchedProjects(debouncedSearch);
    } else {
      fetchAllProjects();
    }
  }, [debouncedSearch, user.studio_id]);

  return (
    <div className="py-2 px-2 h-screen w-full flex-1">
      <div className="h-full w-full rounded-2xl border border-border bg-card shadow-md p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-heading text-2xl">Projects</h1>
          <Input
            placeholder="🔍 Find a project..."
            className="w-fit font-body"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <ProjectsDisplay isLoading={isLoading} projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default Page;
