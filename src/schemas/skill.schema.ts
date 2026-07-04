import { z } from "zod";

export const skillCategoryOptions = [
  "Programming Languages",
  "Frameworks",
  "Libraries",
  "Databases",
  "Cloud",
  "DevOps",
  "Tools",
  "Soft Skills",
] as const;

export const skillEntrySchema = z.object({
  id: z.string().optional(),
  category: z.string().trim().min(1, "Category is required"),
  name: z.string().trim().min(1, "Skill name is required").max(50),
});

export const saveSkillsSchema = z.object({
  resumeId: z.string().cuid(),
  skills: z.array(skillEntrySchema),
});

export type SkillEntry = z.infer<typeof skillEntrySchema>;
export type SaveSkillsInput = z.infer<typeof saveSkillsSchema>;