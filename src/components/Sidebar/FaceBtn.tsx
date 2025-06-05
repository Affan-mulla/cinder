import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import LinkBtn from './linkBtn'
import { LogOut, UserRound } from 'lucide-react'

const FaceBtn = () => {


  
  return (
      <Popover>
            <PopoverTrigger >
              <Tooltip>
                <TooltipTrigger asChild className="bg-violet-700 h-8 w-8 p-2 rounded-full hover:bg-violet-600 ">
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M0.777832 6.65076C0.777832 7.86318 1.43339 9.02594 2.60028 9.88325C3.76717 10.7406 5.34982 11.2222 7.00005 11.2222C8.65029 11.2222 10.2329 10.7406 11.3998 9.88325C12.5667 9.02594 13.2223 7.86318 13.2223 6.65076"
                          fill="black"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M2.6445 1.77459C2.6445 1.10133 2.22663 0.555542 1.71117 0.555542C1.1957 0.555542 0.777832 1.10133 0.777832 1.77459C0.777832 2.44785 1.1957 2.99364 1.71117 2.99364C2.22663 2.99364 2.6445 2.44785 2.6445 1.77459Z"
                          fill="black"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M12.6001 1.77459C12.6001 1.10133 12.1822 0.555542 11.6667 0.555542C11.1513 0.555542 10.7334 1.10133 10.7334 1.77459C10.7334 2.44785 11.1513 2.99364 11.6667 2.99364C12.1822 2.99364 12.6001 2.44785 12.6001 1.77459Z"
                          fill="black"
                        ></path>
                      </g>
                    </svg>
                  
                </TooltipTrigger>
                <TooltipContent  side='right' className='bg-neutral-800 border-[1px] border-neutral-700'>
                  <p className='font-semibold'>{"Affan"}</p>
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-900 border-[1px] shadow-lg shadow-neutral-800 ml-6 mb-4 border-neutral-700 text-white'>
                <div className='flex flex-col gap-2 w-full items-center justify-center'>

               <LinkBtn name='Manage Account' link='/' params='/' Icon={UserRound} index={0} isOpen={true} className='bg-neutral-900' />
               <LinkBtn name='Log Out' link='/' params='/' Icon={LogOut} index={0} isOpen={true}  className='bg-neutral-900 hover:bg-neutral-100' onclick={() => {}}/>
                </div>
            </PopoverContent>
          </Popover>
  )
}

export default FaceBtn