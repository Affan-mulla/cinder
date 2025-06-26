import Image from "next/image";
import Link from "next/link";
import React from "react";
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

const Folder = () => {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 w-[320px] flex flex-col gap-4 shadow-md">
      <Link href="">
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
              00:30
            </h2>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-heading text-lg text-foreground">Affan</h1>
          <p className="text-xs text-muted-foreground">June 28</p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-1 rounded-md hover:bg-muted transition">
              <Ellipsis className="w-5 h-5 text-muted-foreground" />
            </button>
          </PopoverTrigger>

          <PopoverContent side="right" className="w-44 p-2 space-y-1">
            <Link href="/dashboard/projects/affan">
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
                  <AlertDialogAction className="bg-destructive text-white">
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
