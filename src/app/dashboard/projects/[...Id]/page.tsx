"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbWithCustomSeparator } from "@/components/ui/myComponents/BreadcrumbsFile";
import { Download } from "lucide-react";
import TrackItem from "@/components/ui/myComponents/TrackItem";
import axios from "axios";
import SkeletonBox from "@/components/ui/SkeletonBox";
import { Project } from "@/util/types";
import Folder from "@/components/ui/myComponents/Folder";
import ProjectVideo from "@/components/ui/myComponents/ProjectVideo";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  const getProjectDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/projects/get-project?id=${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const projectId = window.location.pathname.split("/").pop();
    if (projectId) {
      getProjectDetails(projectId);
    } else {
      console.error("Project ID not found in URL");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse h-full w-full p-4 rounded-lg mb-4">
            <SkeletonBox />
          </div>
        ))}
      </>
    );
  }

  if(project?.title.includes("Untitled") || project?.title === "") {
    project.title = project.participants.map((p) => p.name).join(" & ");
  }

  if (!project) {
    return <div className="p-4 text-muted-foreground">Project not found.</div>;
  }

  return (
    <div className="h-screen w-full py-2 pr-2 flex-1">
      <div className="h-full w-full rounded-2xl border border-border bg-card shadow-md p-4 flex flex-col gap-4">
        <BreadcrumbWithCustomSeparator id={project.id} name={project.title} />

        <div className="flex flex-col gap-4 p-5 h-full w-full bg-accent rounded-xl">
          <h1 className="font-heading text-2xl">Recordings</h1>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl hover:border-b w-fit">
                {project.title || "Untitled"}
              </h2>
              <Button variant="secondary" className="px-6">
                Share
              </Button>
            </div>

            {/* Folder Placeholder */}
            <div  className="grid gap-4 px-2 pb-2 overflow-y-auto scroll-smooth custom-scroll flex-1"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {/* Folder Component Here */}
              {
                project.participants.map((participant, index) => (
                  participant.recordings.map((recording, rIndex) => (
                    <ProjectVideo
                      key={`${index}-${rIndex}`}
                      link={recording.fileUrl}
                    />
                  ))
                ))
              }
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl">Tracks</h3>
                <Button variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>

              <div className="flex flex-col gap-2 w-full">
                {project.participants.length > 0 ? (
                  project.participants.map((participant, pIndex) =>
                    participant.recordings.map((rec, rIndex) => (
                      <TrackItem
                        key={`${pIndex}-${rIndex}`}
                        recordings={rec}
                        participant={participant}
                      />
                    ))
                  )
                ) : (
                  <div className="text-muted-foreground">No tracks available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
