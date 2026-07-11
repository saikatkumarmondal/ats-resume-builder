"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Saikat Kumar", role: "Backend Developer", quote: "The ATS score feature caught three formatting issues I never would have noticed." },
  { name: "Ashis Mondal", role: "Product Designer", quote: "AI improved my summary without making up experience I didn't have — exactly what I needed." },
  { name: "Kanika Rani Mondal", role: "Data Analyst", quote: "Went from zero callbacks to three interviews in two weeks after rebuilding my resume here." },
];

// Global container mount trigger orchestration parameters
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Coordinated sequential reveal delay
    },
  },
};

// Testimonial card item spring physics configs
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
    },
  },
};

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-24 w-full overflow-hidden border-b border-slate-200/40">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers organically when crossed within layout boundaries
        className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 sm:space-y-12"
      >
        {/* Labeled Header Group Column Shell */}
        <motion.div variants={cardVariants} className="max-w-xl space-y-2 sm:space-y-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#2E6BFF] font-semibold block">
            Results
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1226] sm:text-4xl leading-tight">
            Built by job seekers, for job seekers
          </h2>
        </motion.div>

        {/* Testimonials Adaptive Structure Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -4 }} // Delicate physical micro-translation lift
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-[#F5F6FA] p-6 transition-all duration-300 hover:bg-white hover:border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transform-gpu"
            >
              {/* Core Quote Content Text Node */}
              <p className="text-sm leading-relaxed text-[#0B1226]/80 font-medium italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              {/* Metadata Persona Block Column */}
              <div className="mt-6 pt-4 border-t border-slate-200/40">
                <p className="text-sm font-bold text-[#0B1226] tracking-tight group-hover:text-[#2E6BFF] transition-colors duration-200">
                  {testimonial.name}
                </p>
                <p className="text-xs font-medium text-[#0B1226]/50 mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </motion.div>
    </section>
  );
}