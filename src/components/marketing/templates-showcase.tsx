"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LivePreview } from "@/components/resume-builder/live-preview";
import { SAMPLE_RESUME_DATA } from "@/config/sample-resume-data.config";
import { RESUME_TEMPLATES } from "@/config/templates.config";
import { Button } from "@/components/ui/button";

export function TemplatesShowcase() {
  return (
    <section id="templates" className="bg-[#F5F6FA] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="font-mono-utility text-xs uppercase tracking-widest text-[#2E6BFF]">
              Templates
            </span>
            <h2 className="font-display mt-3 text-4xl text-[#0B1226]">
              Six designs. Zero ATS risk.
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/register">Browse all templates</Link>
          </Button>
        </div>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4">
          {RESUME_TEMPLATES.map((template, index) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="w-56 shrink-0 [perspective:1000px]"
            >
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-md transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:rotateY(-6deg)]">
                <div className="h-72 w-full overflow-hidden">
                  <div className="origin-top-left scale-[0.28]">
                    <LivePreview templateSlug={template.slug} {...SAMPLE_RESUME_DATA} />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-[#0B1226]">{template.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}