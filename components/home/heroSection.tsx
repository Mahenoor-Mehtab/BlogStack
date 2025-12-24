"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[650px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950 w-[100%]">
      
      {/* Glow background */}
     {/* <div className="absolute inset-0 overflow-hidden">
  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[300px] w-[300px] sm:h-[500px] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />

  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl" />
</div> */}


      <div className="container relative mx-auto flex min-h-[650px] flex-col items-center justify-between px-6 py-24 md:flex-row md:py-32">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Explore the World <br />
            Through{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Words
            </span>
          </h1>

          <p className="max-w-xl text-sm text-gray-300 sm:text-base">
            Discover insightful articles, thought-provoking stories, and expert
            perspectives on technology, lifestyle and innovation.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg"
            >
              Start Reading
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white backdrop-blur"
            >
              Explore Topics
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex justify-center gap-10 md:justify-start">
            {[
              { value: "1k+", label: "Published Articles" },
              { value: "50+", label: "Expert Writers" },
              { value: "10M", label: "Monthly Readers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.2 }}
                className="text-center"
              >
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-14 flex-1 md:mt-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl bg-white/10 p-3 backdrop-blur-xl shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Laptop"
              width={340}
              height={340}
              className="rounded-xl object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
