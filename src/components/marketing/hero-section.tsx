"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanningHeroCard } from "@/components/marketing/scanning-hero-card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1F] pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#2E6BFF]/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-utility inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-cyan-300"
          >
            Built for ATS · Powered by Gemini AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-6 text-5xl leading-[1.05] text-white sm:text-6xl"
          >
            Land the interview.
            <br />
            Not the reject pile.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-white/60"
          >
            Build a resume that passes Applicant Tracking Systems and
            impresses recruiters — with AI that improves your words without
            inventing your story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/register">
                Start Building Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <Link href="#templates">View Templates</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50"
          >
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400" /> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-emerald-400" /> AI-powered
            </span>
          </motion.div>
        </div>

        <ScanningHeroCard />
      </div>
    </section>
  );
}