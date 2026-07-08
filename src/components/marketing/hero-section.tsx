"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanningHeroCard } from "@/components/marketing/scanning-hero-card";

// Parent layout mounting stagger parameters
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Smooth, satisfying top-to-bottom sequence
    },
  },
};

// Text and component entry variants
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

// Right column visual card spring entry configuration
const visualCardVariants = {
  hidden: { opacity: 0, x: 20, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: 0.2, // Let the text headline lead the visual layout
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1F] pb-16 pt-24 sm:pb-24 sm:pt-28 md:pt-36 w-full">
      {/* Background Radial Ambient Flare Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] sm:h-[600px] sm:w-[900px] -translate-x-1/2 rounded-full bg-[#2E6BFF]/15 blur-[100px] sm:blur-[120px] transform-gpu" />

      {/* Main Structural Adaptive Grid */}
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:gap-16 px-4 sm:px-6 grid-cols-1 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        
        {/* Left Typography and Action Form Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col text-left items-start"
        >
          {/* Top Pill Feature Tagline */}
          <motion.span
            variants={itemVariants}
            className="font-mono text-[10px] sm:text-xs inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-cyan-300 tracking-wide select-none"
          >
            Built for ATS · Powered by Gemini AI
          </motion.span>

          {/* Main Hero Marketing Hook Title Header */}
          <motion.h1
            variants={itemVariants}
            className="font-display mt-5 sm:mt-6 text-4xl font-extrabold tracking-tight leading-[1.1] text-white sm:text-5xl md:text-6xl"
          >
            Land the interview.
            <br />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Not the reject pile.
            </span>
          </motion.h1>

          {/* Subtext Paragraph Narrative description */}
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-white/60 leading-relaxed font-normal"
          >
            Build a resume that passes Applicant Tracking Systems and
            impresses recruiters — with AI that improves your words without
            inventing your story.
          </motion.p>

          {/* Action Trigger Buttons Call Out Grid */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              className="group transition-all duration-300 hover:shadow-[0_0_20px_rgba(46,107,255,0.25)] active:scale-98 transform-gpu w-full sm:w-auto"
              asChild
            >
              <Link href="/register" className="inline-flex items-center justify-center">
                <span>Start Building Free</span>
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors duration-200 active:scale-98 transform-gpu w-full sm:w-auto"
              asChild
            >
              <Link href="#templates" className="inline-flex items-center justify-center">
                View Templates
              </Link>
            </Button>
          </motion.div>

          {/* Value Verification Trust Markers row */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm text-white/50 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400 shrink-0" /> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400 shrink-0" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400 shrink-0" /> AI-powered
            </span>
          </motion.div>
        </motion.div>

        {/* Right Animated Structural Application Showcase Card */}
        <motion.div
          variants={visualCardVariants}
          initial="hidden"
          animate="visible"
          className="w-full h-full flex items-center justify-center lg:justify-end transform-gpu"
        >
          <ScanningHeroCard />
        </motion.div>
        
      </div>
    </section>
  );
}