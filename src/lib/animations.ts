import { Variants } from "framer-motion";

// Container for staggered text animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Individual item fade up animation
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Subtle background glow pulsing animation
export const glowVariants: Variants = {
  initial: { scale: 0.9, opacity: 0.8 },
  animate: {
    scale: [0.9, 1.1, 0.9],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// FAQ items staggered animation
export const faqContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FAQ item individual animation
export const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};