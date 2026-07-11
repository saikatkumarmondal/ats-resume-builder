"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  LayoutTemplate,
  Sparkles,
  Users,
  BarChart3,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// TODO: replace with your real feature data — consider moving to
// @/config/features.config.ts to mirror the FAQ_ITEMS pattern.
const FEATURES = [
  {
    icon: Zap,
    title: "Blazing fast",
    description: "Ship pages in seconds with instant, edge-cached rendering.",
    className: "sm:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description: "SOC 2-ready infrastructure with encryption at rest and in transit.",
    className: "",
  },
  {
    icon: LayoutTemplate,
    title: "Ready-made templates",
    description: "Start from a library of production-grade layouts.",
    className: "",
  },
  {
    icon: Sparkles,
    title: "AI-assisted editing",
    description: "Generate and refine content inline, without leaving the page.",
    className: "sm:col-span-2",
  },
  {
    icon: Users,
    title: "Built for teams",
    description: "Real-time collaboration with granular permissions.",
    className: "",
  },
  {
    icon: BarChart3,
    title: "Actionable analytics",
    description: "Understand what's converting, down to the section level.",
    className: "",
  },
];

export function FeaturesBento() {
  return (
    <section
      id="features"
      className="bg-[#F5F6FA] py-16 sm:py-24 w-full overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 sm:space-y-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-2 sm:space-y-3"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#2E6BFF] font-semibold block">
            Features
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1226] sm:text-4xl">
            Everything you need, built in
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`bg-background rounded-xl border p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${feature.className}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E6BFF]/10 text-[#2E6BFF]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm sm:text-base font-semibold text-[#0B1226]">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#0B1226]/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}