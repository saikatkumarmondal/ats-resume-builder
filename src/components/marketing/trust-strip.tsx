"use client";

import { motion } from "framer-motion";

const COMPATIBLE_SYSTEMS = [
  "Workday",
  "Greenhouse",
  "Lever",
  "iCIMS",
  "Taleo",
  "BambooHR",
  "Ashby",
  "SuccessFactors"
];

export function TrustStrip() {
  // Duplicate array slightly to ensure seamless seamless loop width regardless of screen sizes
  const doubleSystems = [...COMPATIBLE_SYSTEMS, ...COMPATIBLE_SYSTEMS];

  return (
    <section className="border-b border-slate-200/50 bg-[#F5F6FA] py-8 w-full overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
        
        {/* Caption Label */}
        <p className="font-mono text-[10px] sm:text-xs text-center uppercase tracking-widest text-[#0B1226]/50 font-medium">
          Formatted to parse cleanly on the systems recruiters actually use
        </p>

        {/* Endless Sliding Marquee Framework Shell */}
        <div 
          className="relative w-full overflow-hidden flex items-center py-2"
          style={{
            maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
          }}
        >
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 22, // Tweak duration value up/down to modify scrolling speeds
            }}
            className="flex items-center shrink-0 gap-12 sm:gap-16 transform-gpu"
          >
            {doubleSystems.map((system, index) => (
              <span
                key={`${system}-${index}`}
                className="text-sm sm:text-base font-semibold tracking-tight text-[#0B1226]/40 select-none hover:text-[#2E6BFF]/70 transition-colors duration-200 cursor-default"
              >
                {system}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}