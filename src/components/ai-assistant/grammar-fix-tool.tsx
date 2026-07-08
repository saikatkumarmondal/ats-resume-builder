"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fixGrammar } from "@/actions/ai.actions";
import { AiActionButton } from "@/components/shared/ai-action-button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GrammarFixToolProps {
  resumeId: string;
}

// Fade in and lift animation variants for entry orchestration
const itemVariants = {
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

export function GrammarFixTool({ resumeId }: GrammarFixToolProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      layout // Animates size changes cleanly across all viewport widths
      className="w-full"
    >
      <Card className="h-full border bg-card text-card-foreground shadow-sm transition-colors duration-200">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-semibold tracking-tight">
            Grammar Fix
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          
          {/* Animated Textarea Wrapper */}
          <motion.div
            animate={{
              scale: isFocused ? 1.005 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full transform-gpu"
          >
            <Textarea
              placeholder="Paste any resume text to check grammar and phrasing..."
              rows={6}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full min-h-[150px] resize-y text-sm transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </motion.div>

          {/* Action Trigger Area */}
          <div className="flex w-full justify-end sm:justify-start">
            <AiActionButton
              label="Fix Grammar"
              onGenerate={() => fixGrammar({ resumeId, text })}
              onResult={(result) => setText(result)}
            />
          </div>
          
        </CardContent>
      </Card>
    </motion.div>
  );
}