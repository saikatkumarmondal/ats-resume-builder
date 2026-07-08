"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Parent text staging containers
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Smooth staggered cascade for typography elements
    },
  },
};

// Typography fade up properties
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

// Subtle background glow pulsing layout configuration
const glowVariants = {
  initial: { scale: 0.9, opacity: 0.8 },
  animate: {
    scale: [0.9, 1.1, 0.9],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1F] py-20 sm:py-24 md:py-32 text-center w-full">
      {/* Premium Ambient Floating Glow */}
      <motion.div 
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[500px] sm:h-[500px] sm:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2E6BFF]/15 blur-[80px] sm:blur-[120px] transform-gpu" 
      />
      
      {/* Text Context and Action Block */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers smoothly when scrolling into view
        className="relative mx-auto max-w-2xl px-4 sm:px-6 z-10 space-y-4 sm:space-y-6"
      >
        {/* Animated Main Heading text */}
        <motion.h2 
          variants={itemVariants}
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight sm:leading-none"
        >
          Your next offer starts with a resume that gets seen.
        </motion.h2>
        
        {/* Subtext description wrapper */}
        <motion.p 
          variants={itemVariants}
          className="text-base text-white/60 tracking-wide font-normal max-w-md mx-auto"
        >
          Free forever. No credit card. Ready in minutes.
        </motion.p>
        
        {/* Dynamic Action Trigger Button */}
        <motion.div 
          variants={itemVariants}
          className="pt-4"
        >
          <Button 
            size="lg" 
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(46,107,255,0.3)] active:scale-98 transform-gpu"
            asChild
          >
            <Link href="/register" className="inline-flex items-center justify-center">
              <span>Start Building Free</span>
              <motion.span
                className="inline-flex ml-2"
                whileHover={{ x: 4 }} // Move arrow right on button hover
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}