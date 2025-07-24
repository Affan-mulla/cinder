'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import useUserStore from '@/store/store';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DeleteAccountSection() {
  
  const user = useUserStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async() => {
    // Replace with actual delete logic 
    try {
      setIsLoading(true);
      const res = await axios.delete('/api/delete-account', { data: { userId: user?.id } });
      
    } catch (error) {
     
      
    }
    finally {
      setIsLoading(false);
      useUserStore.setState({ user: undefined });
    }
  }

  return (
    <div className="space-y-3 bg-accent border border-border rounded-2xl shadow-sm max-w-3xl w-full p-6 mb-14 md:mb-0">
      <h1 className="font-heading text-2xl text-destructive">Dangerous Zone</h1>
      <p className="font-body font-bold">Delete your account</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button  className="w-fit text-white cursor-pointer bg-destructive hover:bg-destructive/90 ">
            {isLoading ? <Loader2 className='animate-spin' /> : 'Delete Account'}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='bg-destructive hover:bg-destructive/90 text-foreground'>{isLoading ? <Loader2 className='animate-spin' /> : 'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
