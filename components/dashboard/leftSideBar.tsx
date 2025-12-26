import React from 'react'
import { SheetTrigger , Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { BarChart, FileText, LayoutDashboard, MessageCircle, Settings } from 'lucide-react'
import Link from 'next/link'

const LeftSidebar = () => {
  return (
    <div>
       <Sheet>
        <SheetTrigger>
            <Button className='md:hidden m-4' >
                <LayoutDashboard className='h-5 w-5'/>
            </Button>
        </SheetTrigger>
        <SheetContent>
            <DashboardSidebar/>
        </SheetContent>
        
        </Sheet> 

    </div>
  )
}

export default LeftSidebar


const DashboardSidebar = ()=>{
    return(

        <div className='h-full px-4 py-5'>
            <div className='flex items-center gap-2 mb-8 px-2'>
                <Link href={"/"}>
                <span className='text-xl font-bold'>ByteCode</span>
                
                </Link>

            </div>

            <nav>
                <Link href={"/dashboard"}>
                <Button variant={"ghost"} className='w-full justify-start'>
                    <LayoutDashboard className='w-5 h-5 mr-2'/>
                    Overview

                </Button>
                </Link>
                 <Link href={"/article"}>
                <Button variant={"ghost"} className='w-full justify-start'>
                    <FileText className='w-5 h-5 mr-2'/>
                   Articles

                </Button>
                </Link>
                 <Link href={"/comments"}>
                <Button variant={"ghost"} className='w-full justify-start'>
                    <MessageCircle className='w-5 h-5 mr-2'/>
                    Comments

                </Button>
                </Link>
                 <Link href={"/analytics"}>
                <Button variant={"ghost"} className='w-full justify-start'>
                    <BarChart className='w-5 h-5 mr-2'/>
                    Analytics

                </Button>
                </Link>
                 <Link href={"/settings"}>
                <Button variant={"ghost"} className='w-full justify-start'>
                    <Settings className='w-5 h-5 mr-2'/>
                    Settings

                </Button>
                </Link>
            </nav>

        </div>
    )
}

