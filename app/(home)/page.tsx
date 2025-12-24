"use client";
import Navbar from "@/components/home/header/navbar";
import HeroSection from "@/components/home/heroSection";
import { motion } from "framer-motion";
import TopArticles from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import RotatingText from "@/components/home/RotatingText";
import BlogFooter from "@/components/home/BlogFooter";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <HeroSection />
      <RotatingText />
      <section className="relative pb-5 pt-15">
        <div className="container mx-auto ">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2
              className="
  text-3xl sm:text-4xl font-bold tracking-tight
  bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
  bg-clip-text text-transparent
"
            >
              Featured Articles
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Discover our most popular and trending content
            </p>
          </motion.div>

          {/* Articles */}
          <TopArticles />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Link href="/article">
              <Button
                className="
                rounded-full
                px-8
                py-6
                text-sm
                font-medium
                transition-all
                hover:scale-105
                hover:bg-gray-900
                hover:text-white
                dark:bg-white
                dark:text-gray-900
                dark:hover:bg-gray-200
              "
              >
                View all articles
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <BlogFooter />
    </div>
  );
}
