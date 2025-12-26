import  prisma  from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Layout = async ({children}:{children: React.ReactNode}) => {
    const user = await currentUser();
   if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {clerkUserId : user.id},
    })

    if(!loggedInUser){
      const email = user.emailAddresses?.[0]?.emailAddress ?? user.primaryEmailAddress?.emailAddress ?? '';
      if (!email) {
        console.error('User has no email address');
        return (
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        );
      }
      
      await prisma.user.create({
          data:{
              name: user.fullName ?? user.username ?? "User",
              clerkUserId:user.id,
              email: email,
              imageUrl:user.imageUrl
          }
      })
    }
  } catch (error) {
    console.error('Error in layout:', error);
    // Return children even if database operations fail
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}

export default Layout