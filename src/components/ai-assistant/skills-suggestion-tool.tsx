"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { suggestSkills } from "@/actions/ai.actions";
import { AiActionButton } from "@/components/shared/ai-action-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsSuggestionToolProps {
  resumeId: string;
}

// Parent animation variants for container orchestration
const parentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Orchestrated staggering settings for badges grid
const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Rapid, satisfying cascade effect
    },
  },
};

// Micro-spring scale for single badge items on entry
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export function SkillsSuggestionTool({ resumeId }: SkillsSuggestionToolProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      layout // Smooth transitions for bounds updates across devices
      className="w-full"
    >
      <Card className="h-full border bg-card text-card-foreground shadow-sm transition-colors duration-200">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-semibold tracking-tight">
            Skills Suggestion
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          
          {/* Target Input Field */}
          <div className="w-full">
            <Input
              placeholder="Target job title (e.g. Backend Developer)"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              className="w-full text-sm transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>

          {/* Action Trigger Area */}
          <div className="flex w-full justify-end sm:justify-start">
            <AiActionButton
              label="Suggest Skills"
              onGenerate={() =>
                suggestSkills({ resumeId, jobTitle, existingSkills: suggestedSkills })
              }
              onResult={(result) => setSuggestedSkills(result)}
            />
          </div>

          {/* Dynamically Populated Badges Block */}
          <AnimatePresence mode="popLayout">
            {suggestedSkills.length > 0 && (
              <motion.div
                variants={badgeContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-wrap gap-2 pt-2"
                layout
              >
                {suggestedSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={badgeVariants}
                    layout // Maintains visual stability during wrap rearrangements
                    className="inline-flex transform-gpu"
                  >
                    <Badge 
                      variant="secondary"
                      className="px-2.5 py-1 text-xs font-medium cursor-default select-none select-none transition-colors duration-200 hover:bg-secondary/80"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
        </CardContent>
      </Card>
    </motion.div>
  );
}