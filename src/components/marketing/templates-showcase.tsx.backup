"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LivePreview } from "@/components/resume-builder/live-preview";
import { SAMPLE_RESUME_DATA } from "@/config/sample-resume-data.config";
import { RESUME_TEMPLATES } from "@/config/templates.config";
import { Button } from "@/components/ui/button";

// Parent entry stagger orchestration setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Elastic spring physics configuration for card entry
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
};

export function TemplatesShowcase() {
  return (
    <section 
      id="templates" 
      className="bg-[#F5F6FA] py-16 sm:py-24 w-full overflow-hidden border-b border-slate-200/40"
    >
      {/* Inject scrollbar hidden style rules inline to keep code decoupled from global CSS */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* Header Block Alignment Shell */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl space-y-2 sm:space-y-3">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#2E6BFF] font-semibold block">
              Templates
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1226] sm:text-4xl">
              Six designs. Zero ATS risk.
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="border-slate-200 bg-white text-[#0B1226] hover:bg-slate-50 transition-colors duration-200 self-start sm:self-auto shadow-sm active:scale-98 transform-gpu"
            asChild
          >
            <Link href="/register">Browse all templates</Link>
          </Button>
        </div>

        {/* Horizontal Slider Area wrapper with interactive 3D perspectives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory transform-gpu"
        >
          {RESUME_TEMPLATES.map((template) => (
            <motion.div
              key={template.slug}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-[220px] sm:w-[240px] shrink-0 snap-start [perspective:1200px]"
            >
              {/* Animated 3D Interactive Card Foundation Shield */}
              <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 [transform-style:preserve-3d] hover:[transform:rotateY(-5deg)] transform-gpu">
                
                {/* Fixed Aspect Preview Box Viewport viewport */}
                <div className="h-[290px] sm:h-[310px] w-full overflow-hidden bg-white relative pointer-events-none select-none">
                  <div className="origin-top-left scale-[0.29] sm:scale-[0.31] p-4">
                    <LivePreview templateSlug={template.slug} {...SAMPLE_RESUME_DATA} />
                  </div>
                  {/* Subtle inner cover overlay mesh layer */}
                  <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-transparent transition-colors duration-300" />
                </div>
                
              </div>
              
              {/* Template Metatag Label Text */}
              <p className="mt-3.5 text-sm font-semibold text-[#0B1226] tracking-tight group-hover:text-[#2E6BFF] transition-colors duration-200 px-0.5">
                {template.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}