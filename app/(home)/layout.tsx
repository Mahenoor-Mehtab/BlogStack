import  prisma  from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { redirect } from "next/navigation";

const layout =async ({children}:{children: React.ReactNode}) => {
    const user = await currentUser();
   if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {clerkUserId : user.id},
  })

  if(!loggedInUser){
    await prisma.user.create({
        data:{
            name: user.fullName ?? user.username ?? "User",
            clerkUserId:user.id,
            email:user.emailAddresses[0].emailAddress,
            imageUrl:user.imageUrl
        }
    })
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}

export default layout