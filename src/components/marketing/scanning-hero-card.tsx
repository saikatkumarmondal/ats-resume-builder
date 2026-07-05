"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { SAMPLE_RESUME_DATA } from "@/config/sample-resume-data.config";

const EXTRACTED_KEYWORDS = ["React", "TypeScript", "Next.js", "Leadership", "REST APIs"];

export function ScanningHeroCard() {
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, 98, {
      duration: 2,
      delay: 0.6,
      ease: "easeOut",
      onUpdate: (value) => setAtsScore(Math.round(value)),
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="relative [perspective:1600px]">
      <motion.div
        initial={{ rotateY: 18, rotateX: 6, opacity: 0, y: 40 }}
        animate={{ rotateY: 12, rotateX: 4, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: 4, rotateX: 0 }}
        className="relative mx-auto w-[300px] origin-center [transform-style:preserve-3d] sm:w-[360px]"
      >
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-black/30 blur-2xl [transform:translateZ(-40px)]" />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
          <div className="h-[400px] w-full overflow-hidden sm:h-[480px]">
            <div className="origin-top-left scale-[0.52] sm:scale-[0.62]">
              <ModernTemplate data={SAMPLE_RESUME_DATA} />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 h-24 animate-scan-sweep bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent" />
          </div>
        </div>

        {EXTRACTED_KEYWORDS.map((keyword, index) => (
          <motion.span
            key={keyword}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.15, duration: 0.5 }}
            className="font-mono-utility absolute right-[-1.5rem] rounded-full border border-cyan-400/30 bg-[#0A0F1F] px-3 py-1 text-xs text-cyan-300 shadow-lg"
            style={{ top: `${14 + index * 16}%` }}
          >
            {keyword}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-6 -left-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0A0F1F] px-5 py-4 shadow-xl"
        >
          <span className="font-mono-utility text-2xl font-bold text-emerald-400">
            {atsScore}%
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/50">
            ATS Score
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}