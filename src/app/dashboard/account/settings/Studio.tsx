import { Input } from "@/components/ui/input";
import DeleteAccountSection from "@/components/ui/myComponents/DeletePopover";
import axios from "axios";
import React from "react";
import { toast, useSonner } from "sonner";

const Studio = ({ studioName, id }: { studioName: string, id : string }) => {
  const handleStudioName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value.length > 0 && e.target.value !== studioName) {
 

        const res = await axios.put("/api/settings/studio", {
          id,
          name: e.target.value,
        });


        if (res.status === 200) {
          toast.success("Studio name updated successfully");
        }
      }
    } catch (error) {
      toast.error("Failed to update studio name");
    }
  };
  return (
    <div className="sm:flex-1 flex flex-col p-6 lg:p-10 bg-card rounded-2xl border border-border gap-5  shadow-md">
      {/* Page Header */}
      <div className="sm:mb-8 mb-2 max-w-3xl">
        <h1 className="text-3xl font-bold font-heading">Studio Settings</h1>
      </div>

      <div className="space-y-1 bg-accent border border-border rounded-2xl shadow-sm max-w-3xl w-full p-6">
        <h1 className="font-medium">Studio Name</h1>
        <Input
          type="text"
          defaultValue={studioName}
          onBlur={handleStudioName}
        />
      </div>

      <DeleteAccountSection />
    </div>
  );
};

export default Studio;
