import { z } from "zod";

export const proficiencyLevelOptions = [
  "Basic",
  "Conversational",
  "Fluent",
  "Native",
] as const;

export const languageEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Language name is required").max(50),
  proficiency: z.enum(proficiencyLevelOptions),
});

export const saveLanguagesSchema = z.object({
  resumeId: z.string().cuid(),
  languages: z.array(languageEntrySchema),
});

export type LanguageEntry = z.infer<typeof languageEntrySchema>;
export type SaveLanguagesInput = z.infer<typeof saveLanguagesSchema>;