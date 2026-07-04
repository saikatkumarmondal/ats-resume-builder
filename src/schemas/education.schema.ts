import { z } from "zod";

export const educationEntrySchema = z.object({
  id: z.string().optional(),
  institution: z.string().trim().min(1, "Institution is required").max(150),
  degree: z.string().trim().min(1, "Degree is required").max(150),
  field: z.string().trim().max(150).optional().or(z.literal("")),
  location: z.string().trim().max(100).optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  grade: z.string().trim().max(50).optional().or(z.literal("")),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const saveEducationsSchema = z.object({
  resumeId: z.string().cuid(),
  educations: z.array(educationEntrySchema),
});

export type EducationEntry = z.infer<typeof educationEntrySchema>;
export type SaveEducationsInput = z.infer<typeof saveEducationsSchema>;