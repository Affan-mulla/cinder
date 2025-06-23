"use client"
import { useSignIn } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Overlay = ({children} : {children: React.ReactNode}) => {
  const {isLoaded} = useSignIn()
  
  return (
     <div className='bg-neutral-950 w-full h-screen  py-16 px-10 flex justify-center bg-[url("/bg-login.svg")] bg-cover'>
      <div className="flex justify-center items-center h-full bg-blur-3xl overflow-hidden md:w-fit w-full bg-neutral-950 rounded-2xl border-[2px] border-neutral-700/90">
        <div className="md:dark:bg-secondary bg-neutral-900 px-5 py-4  h-full w-full flex-1 justify-center items-center flex">
         {isLoaded ? children : <Loader className="animate-spin text-white" />}
        </div>
        <div className="w-fit h-full  pl-5 py-5 justify-center items-center flex-1 md:flex hidden">
          <Image
            src="/login.png"
            alt="logo"
            className="  "
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
}

export default Overlay