"use client";

import { motion } from "framer-motion";

const STEPS = [
  { number: "01", title: "Create your account", description: "Sign up free — no credit card required." },
  { number: "02", title: "Fill in your resume", description: "Add experience, education, skills, and projects." },
  { number: "03", title: "Improve with AI", description: "Let Gemini sharpen your wording and suggest keywords." },
  { number: "04", title: "Download your PDF", description: "Export a clean, ATS-ready PDF in one click." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-mono-utility text-xs uppercase tracking-widest text-[#2E6BFF]">
            Process
          </span>
          <h2 className="font-display mt-3 text-4xl text-[#0B1226]">
            From blank page to offer letter
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="font-mono-utility text-3xl font-bold text-[#2E6BFF]/20">
                {step.number}
              </span>
              <h3 className="mt-3 font-semibold text-[#0B1226]">{step.title}</h3>
              <p className="mt-1.5 text-sm text-[#0B1226]/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}