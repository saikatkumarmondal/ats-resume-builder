import { z } from "zod";

export const analyzeResumeInputSchema = z.object({
  resumeId: z.string().cuid(),
  jobDescription: z.string().trim().max(5000).optional().or(z.literal("")),
});

export const resumeAnalysisResultSchema = z.object({
  atsScore: z.number().min(0).max(100),
  keywordMatchScore: z.number().min(0).max(100),
  formattingScore: z.number().min(0).max(100),
  readabilityScore: z.number().min(0).max(100),
  grammarScore: z.number().min(0).max(100),
  suggestions: z.array(z.string()).default([]),
  missingSkills: z.array(z.string()).default([]),
  weakVerbs: z.array(z.string()).default([]),
  passiveVoiceInstances: z.array(z.string()).default([]),
});

export type AnalyzeResumeInput = z.infer<typeof analyzeResumeInputSchema>;
export type ResumeAnalysisResult = z.infer<typeof resumeAnalysisResultSchema>;