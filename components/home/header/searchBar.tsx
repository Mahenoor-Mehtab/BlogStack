import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <form action="" className="relative">
      <div className="relative w-48 md:w-64 lg:w-80">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300 transition-colors" />
        <Input
          type="text"
          name="search"
          placeholder="Search articles"
          className="
            pl-10 
            w-full 
            rounded-full 
            border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-200 
            placeholder-gray-400 dark:placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            transition-all 
            shadow-sm hover:shadow-md
          "
        />
      </div>
    </form>
  );
};

export default SearchBar;
