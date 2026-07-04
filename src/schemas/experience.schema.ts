import { z } from "zod";

export const employmentTypeOptions = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "FREELANCE",
  "INTERNSHIP",
] as const;

export const experienceEntrySchema = z.object({
  id: z.string().optional(),
  company: z.string().trim().min(1, "Company is required").max(100),
  position: z.string().trim().min(1, "Position is required").max(100),
  location: z.string().trim().max(100).optional().or(z.literal("")),
  employmentType: z.enum(employmentTypeOptions).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const saveExperiencesSchema = z.object({
  resumeId: z.string().cuid(),
  experiences: z.array(experienceEntrySchema),
});

export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type SaveExperiencesInput = z.infer<typeof saveExperiencesSchema>;