export const suggestSkillsInputSchema = z.object({
  resumeId: z.string().cuid(),
  jobTitle: z.string().trim().max(100).optional().or(z.literal("")),
  existingSkills: z.array(z.string()).default([]),
});

export const fixGrammarInputSchema = z.object({
  resumeId: z.string().cuid(),
  text: z.string().trim().min(1, "Enter some text first").max(3000),
});

export type SuggestSkillsInput = z.infer<typeof suggestSkillsInputSchema>;
export type FixGrammarInput = z.infer<typeof fixGrammarInputSchema>;