"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";

const BlogFooter=()=> {
  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-to-b from-indigo-950 to-black">
      
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6 py-20"
      >
        {/* Main grid */}
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold text-white">
              MyBlog<span className="text-indigo-400">.</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-indigo-200">
              I write about modern UI, frontend architecture,
              and building clean, scalable experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-300">
              Navigation
            </h4>
            <ul className="space-y-3 text-indigo-200">
              {["Home", "Blog", "About", "Contact"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer hover:text-white"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-300">
              Connect
            </h4>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-full bg-indigo-900/50 p-3 text-indigo-200 hover:text-white"
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-indigo-800 pt-8 text-center text-sm text-indigo-300"
        >
          © {new Date().getFullYear()} MyBlog. Crafted with care & clean UI.
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default BlogFooter
