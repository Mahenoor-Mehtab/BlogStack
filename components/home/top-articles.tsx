"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TopArticles = () => {
  return (
    <div className="mx-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          className={cn(
            "group relative overflow-hidden",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl",
            "transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
          )}
        >
          <Link href={`/articles/${1234}`} className="block p-6">
            
            {/* Image */}
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src="https://plus.unsplash.com/premium_photo-1664285637075-7bd8abe6d26f?w=600&auto=format&fit=crop&q=60"
                alt="article"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-indigo-600 text-white">
                  PM
                </AvatarFallback>
              </Avatar>
              <span>Patel Mernstack</span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white leading-snug transition-colors group-hover:text-indigo-500">
              How to become frontend web developer in 2026
            </h3>

            {/* Category */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Web Development
            </p>

            {/* Meta */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>12 Feb</span>
              <span>12 min read</span>
            </div>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
};

export default TopArticles;
