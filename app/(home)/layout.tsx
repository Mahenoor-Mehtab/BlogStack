import  prisma  from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Layout = async ({children}:{children: React.ReactNode}) => {
    const user = await currentUser(); // return profile data
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

    return (
      <div>
        {children}
      </div>
    );
  } catch (error) {
    console.error('Error in layout:', error);
    // If database connection fails, still render children
    // This prevents the app from crashing when DB is unavailable
    if (error instanceof Error) {
      if (error.message.includes("Can't reach database server")) {
        console.error('⚠️ Database server is unreachable. Please check:');
        console.error('1. Is your Neon database active? (Neon databases pause after inactivity)');
        console.error('2. Is your DATABASE_URL correct in .env file?');
        console.error('3. Check your Neon dashboard and wake up the database if needed');
      }
    }
    // Return children even if database operations fail
    return (
      <div>
        {children}
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}

export default Layout