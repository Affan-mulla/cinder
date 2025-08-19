"use client";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { ArrowLeft, Loader } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useSignIn();

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Button
        onClick={() => redirect("/")}
        variant={"link"}
        className=" text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Button>
      {isLoaded && children}
      {!isLoaded && (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Overlay;
