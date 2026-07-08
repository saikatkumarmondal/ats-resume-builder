"use client";

import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/config/faq.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Staged header section and layout block entry parameters
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Smooth consecutive cascading delays
    },
  },
};

// Interactive accordion row lift configurations
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-[#F5F6FA] py-16 sm:py-24 w-full overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl px-4 sm:px-6 space-y-8 sm:space-y-10"
      >
        {/* Labeled Header Intro Column Block */}
        <motion.div variants={itemVariants} className="text-center space-y-2 sm:space-y-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#2E6BFF] font-semibold block">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1226] sm:text-4xl">
            Questions, answered
          </h2>
        </motion.div>

        {/* Core Accordion Structure Block */}
        <motion.div variants={itemVariants} className="w-full transform-gpu">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-background rounded-xl border px-4 sm:px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-[#0B1226] hover:no-underline py-4 sm:py-5 transition-colors duration-200 hover:text-[#2E6BFF]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-[#0B1226]/70 leading-relaxed pb-4 sm:pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}