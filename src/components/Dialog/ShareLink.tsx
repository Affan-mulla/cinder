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
        <Button  className="bg-violet-700 hover:bg-violet-800"><UserPlus/>Invite</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-950 text-white">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
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
              className=" selection:bg-violet-700"
              
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={()=> navigator.clipboard.writeText(url)}>
              Copy
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
