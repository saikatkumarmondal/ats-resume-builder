"use client";

import { motion } from "framer-motion";
import { Sparkles, ScanSearch, LayoutTemplate, FileDown, Save, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI that enhances, never invents",
    description:
      "Gemini improves your wording and phrasing — it never fabricates experience you didn't provide.",
    size: "lg",
  },
  {
    icon: ScanSearch,
    title: "ATS Score & Analysis",
    description: "See keyword match, formatting, readability, and grammar scores before you apply.",
    size: "md",
  },
  {
    icon: LayoutTemplate,
    title: "6 ATS-safe templates",
    description: "Modern, Professional, Executive, Minimal, Creative, Corporate.",
    size: "md",
  },
  { icon: FileDown, title: "One-click PDF export", description: "Print-ready, multi-page, consistent typography.", size: "sm" },
  { icon: Save, title: "Autosave everything", description: "Never lose an edit — every field saves as you type.", size: "sm" },
  { icon: Smartphone, title: "Fully responsive", description: "Build and edit from your phone, tablet, or desktop.", size: "sm" },
];

export function FeaturesBento() {
  return (
    <section id="features" className="bg-[#F5F6FA] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-mono-utility text-xs uppercase tracking-widest text-[#2E6BFF]">
            Features
          </span>
          <h2 className="font-display mt-3 text-4xl text-[#0B1226]">
            Everything a hiring algorithm looks for
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-2xl border border-black/5 bg-white p-6 shadow-sm ${
                  feature.size === "lg" ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#2E6BFF]/10">
                  <Icon className="size-5 text-[#2E6BFF]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0B1226]">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-[#0B1226]/60">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}