"use client";
import HomeButton from "@/components/ui/myComponents/HomeButton";
import ProjectsDisplay from "@/components/ui/myComponents/ProjectsDisplay";
import SkeletonBox from "@/components/ui/SkeletonBox";
import useUserStore from "@/store/store";
import { studio } from "@/util/data";
import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const user = useUserStore((g) => g.user);

  useEffect(()=>{
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/projects/all-projects",{
          params: { studioId: user.studio_id },
        });
        setProjects(res.data.data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  },[])

  return (
    <div className=" md:p-2 h-full w-full flex-1">
      <div className="h-full w-full sm:rounded-2xl sm:border border-border bg-card shadow-md">
        <div className="flex flex-col items-center h-full px-6 py-10 gap-5">
          <div className="flex md:gap-16 gap-6">
            {studio.map(({ name, icon, href }, index) => (
              <HomeButton
                key={index}
                title={name}
                Icon={icon}
                link={href}
                className={
                  name === "Record"
                    ? "bg-[#231215] hover:bg-[#e43b58] text-[#e43b58] hover:text-white"
                    : ""
                }
              />
            ))}
          </div>

          <div className="w-full sm:h-fit  sm:flex-1 rounded-xl bg-background p-4 border border-border flex">
            <div className="h-full w-full">
              <h1 className="font-heading text-2xl mb-2">Recent</h1>
              <div className="relative flex-1 ">
                <ProjectsDisplay isLoading={isLoading} projects={projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;