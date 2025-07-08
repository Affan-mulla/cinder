"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { FolderOpen, Trash2, Ellipsis } from "lucide-react";
import { Button } from "../button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

type Recording = {
  id: string;
  fileUrl: string;
  createdAt: string;
  duration: number;
};

type Participant = {
  id: string;
  name: string;
  recordings: Recording[];
};

type Project = {
  id: string;
  title: string;
  createdAt: string;
  endedAt: string | null;
  host_id: string;
  studio_id: string;
  participants: Participant[];
};

type Projects = Project[];

const Folder = ({ projectProp}: { projectProp: Project }) => {
  const [project, setProject] = React.useState<Project>({
    id: "",
    title: "",
    createdAt: "",
    endedAt: null,
    host_id: "",
    studio_id: "",
    participants: [],
  });

  useEffect(() => {
    setProject({
      id: projectProp.id,
      title: projectProp.title,
      createdAt: projectProp.createdAt,
      endedAt: projectProp.endedAt,
      host_id: projectProp.host_id,
      studio_id: projectProp.studio_id,
      participants: projectProp.participants,
    });
  }, [projectProp]);

  const deleteProject = async (id : string) => {
    try {
      const response = await axios.delete(`/api/projects/delete`, {
        data: {
          projectId: id,
        },
      });
      if (response.status === 200) {
        console.log("Project deleted successfully");
        toast.success("Project deleted successfully");
      } else {
        console.error("Failed to delete project:", response.data);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

    
    const rawDuration = project.participants[0]?.recordings[0]?.duration || 0;
    const formattedDuration = `00:${String(Math.floor(rawDuration)).padStart(
      2,
      "0"
    )}`;

    if (project.title === "Untitled Session") {
      setProject((prev) => ({
        ...prev,
        title:project.participants.map((p) => p.name).join(" & "),
      }));
    }
  

  return (
    <div className="bg-secondary border border-border rounded-2xl p-3 h-fit w-full max-w-md flex flex-col gap-4 shadow-md">
      <Link href={`/dashboard/projects/${project.id}`}>
        <div className="rounded-xl relative overflow-hidden w-full aspect-video hover:opacity-90 transition">
          <Image
            src="/goingmerry.png"
            alt="thumbnail"
            width={320}
            height={180}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <h2 className="text-foreground font-heading text-sm px-2 py-1/2 bg-secondary/80 rounded-xl w-fit">
              {formattedDuration}
            </h2>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-heading text-lg text-foreground">
            {project.title || "Untitled recording"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-1 rounded-md hover:bg-muted transition">
              <Ellipsis className="w-5 h-5 text-muted-foreground" />
            </button>
          </PopoverTrigger>

          <PopoverContent side="right" className="w-44 p-2 space-y-1">
            <Link href={`/dashboard/projects/${project.id}`}>
              <Button
                variant="ghost"
                className="w-full text-sm font-medium justify-start"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Go to project
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full text-sm text-destructive justify-start"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete
                    your project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-foreground hover:bg-destructive/90 cursor-pointer"
                    onClick={() => deleteProject(project.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Folder;
