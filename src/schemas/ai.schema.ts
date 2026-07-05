import { z } from "zod";

export const generateSummaryInputSchema = z.object({
  resumeId: z.string().cuid(),
  jobTitle: z.string().trim().max(100).optional().or(z.literal("")),
  existingSummary: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const improveExperienceInputSchema = z.object({
  resumeId: z.string().cuid(),
  position: z.string().trim().min(1, "Add a position first"),
  company: z.string().trim().min(1, "Add a company first"),
  description: z.string().trim().min(1, "Add a description first"),
});

export const suggestSkillsInputSchema = z.object({
  resumeId: z.string().cuid(),
  jobTitle: z.string().trim().max(100).optional().or(z.literal("")),
  existingSkills: z.array(z.string()).default([]),
});

export const fixGrammarInputSchema = z.object({
  resumeId: z.string().cuid(),
  text: z.string().trim().min(1, "Enter some text first").max(3000),
});

export type GenerateSummaryInput = z.infer<typeof generateSummaryInputSchema>;
export type ImproveExperienceInput = z.infer<typeof improveExperienceInputSchema>;
export type SuggestSkillsInput = z.infer<typeof suggestSkillsInputSchema>;
export type FixGrammarInput = z.infer<typeof fixGrammarInputSchema>;