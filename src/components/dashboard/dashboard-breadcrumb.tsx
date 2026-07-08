"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function toTitleCase(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Nav parent orchestration settings
const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Rapid consecutive flow for trail paths
    },
  },
};

// Breadcrumb node entries
const segmentVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
    },
  },
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-1.5 text-sm text-muted-foreground w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-1 mask-linear-gradient"
      aria-label="Breadcrumb"
    >
      {/* Root/Home Element */}
      <motion.div variants={segmentVariants} className="inline-flex items-center">
        <Link 
          href="/dashboard" 
          className="hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-0.5"
        >
          Home
        </Link>
      </motion.div>

      {segments.map((segment, index) => {
        // Skip adding dashboard again if root link covers it
        if (segment.toLowerCase() === "dashboard" && index === 0) return null;

        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <Fragment key={href}>
            {/* Animated Chevron Separator */}
            <motion.span 
              variants={segmentVariants} 
              className="flex items-center justify-center select-none opacity-60 transform-gpu"
            >
              <ChevronRight className="size-3.5" />
            </motion.span>

            {/* Path Node Wrapper */}
            <motion.div 
              variants={segmentVariants}
              className="inline-flex items-center transform-gpu"
              layoutId={`breadcrumb-${href}`}
            >
              {isLast ? (
                <span className="font-medium text-foreground tracking-tight px-1 py-0.5">
                  {toTitleCase(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-0.5"
                >
                  {toTitleCase(segment)}
                </Link>
              )}
            </motion.div>
          </Fragment>
        );
      })}
    </motion.nav>
  );
}