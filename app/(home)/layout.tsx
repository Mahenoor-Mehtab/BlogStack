import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const layout =async () => {
    const user = await currentUser();
  if(!user) return null;

  const loggedInUser = await prisma.user.findUnique({
    where: {clerkUserId : user.id},
  })

  if(!loggedInUser){
    await prisma.user.create({
        data:{
            name:user.fullName,
            clerkUserId:user.id,
            email:user.emailAddresses[0].emailAddress,
            imageUrl:user.imageUrl
        }
    })
  }


  return (
    <div>Layout</div>
  )
}

export default layout