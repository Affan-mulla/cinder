'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"

export function DialogCloseButton({link} : {link : string}) {
  const url = window.location.href+`?t=${link}`;
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button  className="text-foreground cursor-pointer" variant="default"><UserPlus/>Invite</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="font-heading">Share link</DialogTitle>
          <DialogDescription className="font-body">
            Anyone who has this link will be able join the room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={url}
              readOnly
              className=" selection:bg-primary selection:text-white  text-white"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" className="text-foreground" onClick={()=> navigator.clipboard.writeText(url)}>
              Copy
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
