"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "I write about modern UI & UX",
  "I build clean and scalable interfaces",
  "I share advanced frontend insights",
  "I turn ideas into elegant experiences"
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-14 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            mx-auto
            max-w-7xl
            px-6
            text-center
            font-semibold
            tracking-tight
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            text-indigo-100
          "
        >
          {texts[index]}
        </motion.h2>
      </AnimatePresence>
    </section>
  );
}
