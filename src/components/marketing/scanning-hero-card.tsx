"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { SAMPLE_RESUME_DATA } from "@/config/sample-resume-data.config";

const EXTRACTED_KEYWORDS = ["React", "TypeScript", "Next.js", "Leadership", "REST APIs"];

export function ScanningHeroCard() {
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    // Smooth frame interpolation from 0 to 98
    const controls = animate(0, 98, {
      duration: 2,
      delay: 0.6,
      ease: "easeOut",
      onUpdate: (value) => setAtsScore(Math.round(value)),
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="relative [perspective:1600px] py-6 sm:py-8 select-none">
      {/* Inject custom keyframe directly to guarantee scanning animation runs without custom tailwind config */}
      <style jsx global>{`
        @keyframes scanSweep {
          0% { top: -10%; }
          50% { top: 100%; }
          100% { top: -10%; }
        }
        .animate-laser-scan {
          animation: scanSweep 4s ease-in-out infinite;
        }
      `}</style>

      {/* Main Interactive 3D Perspective Card Frame */}
      <motion.div
        initial={{ rotateY: 18, rotateX: 6, opacity: 0, y: 40 }}
        animate={{ rotateY: 12, rotateX: 4, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: 2, rotateX: 1, scale: 1.02 }}
        className="relative mx-auto w-[280px] sm:w-[340px] md:w-[360px] origin-center [transform-style:preserve-3d] transform-gpu"
      >
        {/* Underlay Ambient Drop Shadow Shield */}
        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-black/40 blur-2xl [transform:translateZ(-40px)] pointer-events-none" />

        {/* Outer Resume Paper Box Enclosure */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl [transform:translateZ(0px)]">
          {/* Scaled Component Viewport Node */}
          <div className="h-[380px] w-full overflow-hidden sm:h-[460px] bg-white">
            <div className="origin-top-left scale-[0.48] sm:scale-[0.58] md:scale-[0.62] p-4">
              <ModernTemplate data={SAMPLE_RESUME_DATA} />
            </div>
          </div>

          {/* Dynamic Floating Laser Beam Overlay */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
            <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-laser-scan shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
          </div>
        </div>

        {/* Staggered Extracted AI Keyword Tags */}
        {EXTRACTED_KEYWORDS.map((keyword, index) => (
          <motion.span
            key={keyword}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 + index * 0.12, duration: 0.4, type: "spring" }}
            whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.6)" }}
            className="font-mono absolute -right-3 sm:-right-6 md:-right-8 rounded-full border border-cyan-400/20 bg-[#0A0F1F]/95 backdrop-blur-sm px-2.5 py-1 text-[10px] sm:text-xs font-medium text-cyan-300 shadow-md transform-gpu transition-colors duration-200 z-10 whitespace-nowrap"
            style={{ top: `${15 + index * 15}%` }}
          >
            {keyword}
          </motion.span>
        ))}

        {/* Absolute Bottom-Left Floating Score Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 100 }}
          className="absolute -bottom-5 -left-4 sm:-left-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0A0F1F]/95 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 shadow-xl z-20 transform-gpu"
        >
          <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight leading-none">
            {atsScore}%
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1.5 whitespace-nowrap">
            ATS Score
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}