"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Tanvir Hasan", role: "Backend Developer", quote: "The ATS score feature caught three formatting issues I never would have noticed." },
  { name: "Priya Sharma", role: "Product Designer", quote: "AI improved my summary without making up experience I didn't have — exactly what I needed." },
  { name: "Daniel Osei", role: "Data Analyst", quote: "Went from zero callbacks to three interviews in two weeks after rebuilding my resume here." },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-mono-utility text-xs uppercase tracking-widest text-[#2E6BFF]">
            Results
          </span>
          <h2 className="font-display mt-3 text-4xl text-[#0B1226]">
            Built by job seekers, for job seekers
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-black/5 bg-[#F5F6FA] p-6"
            >
              <p className="text-sm leading-relaxed text-[#0B1226]/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[#0B1226]">{testimonial.name}</p>
                <p className="text-xs text-[#0B1226]/50">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}