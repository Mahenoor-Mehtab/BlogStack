import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import SearchBar from "./searchBar";
import ToggleMode from "./toggle-mode";
import { Menu, X } from "lucide-react";
import { 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,} from '@clerk/nextjs';

const Navbar = () => {
   const [isMobileMenuOpen , setIsMobileMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-gray-900/30 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                Byte
              </span>
              <span className="text-gray-900 dark:text-white">Code</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {["Articles", "Tutorial", "About", "Dashboard"].map((item, i) => (
              <Link
                key={i}
                href={`/${item.toLowerCase()}`}
                className="relative text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <ToggleMode />

            {/* User action */}
            

           <SignedOut>
             <div className="hidden md:flex items-center gap-3">
              <SignInButton mode="modal">
  <button className="px-5 py-2 text-sm bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-400 hover:scale-105 transition">
    Sign In
  </button>
</SignInButton>

<SignUpButton mode="modal">
  <button className="px-5 py-2 text-sm border border-indigo-400 hover:bg-indigo-500">
    Sign Up
  </button>
</SignUpButton>
            </div>
           </SignedOut>
             <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

 {/* Mobile menu button  */}
 <Button variant={"ghost"} size={"icon"} className="md:hidden text-muted-foreground hover:text-foreground" onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}>
{
  isMobileMenuOpen ? (<X className="h-5 w-5"/>):
  (   <Menu className="h-5 w-5" />)
}

 </Button>


        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
  <div className="md:hidden border-t border-gray-200/20 dark:border-gray-700/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
    <div className="px-4 py-4 space-y-4">
      
      {/* Links */}
      {["Articles", "Tutorial", "About", "Dashboard"].map((item, i) => (
        <Link
          key={i}
          href={`/${item.toLowerCase()}`}
          onClick={() => setIsMobileMenuOpen(false)}
          className="block text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
        >
          {item}
        </Link>
      ))}

      {/* Auth buttons */}
      <div className="pt-4 border-t border-gray-200/20 dark:border-gray-700/30 flex flex-col gap-3">
        <Button className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-400">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Sign Up
        </Button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Navbar;
