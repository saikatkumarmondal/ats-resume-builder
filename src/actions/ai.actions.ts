import {
  suggestSkillsInputSchema,
  fixGrammarInputSchema,
  type SuggestSkillsInput,
  type FixGrammarInput,
} from "@/schemas/ai.schema";

type AiListResult =
  | { success: true; result: string[] }
  | { success: false; error: string };

export async function suggestSkills(input: SuggestSkillsInput): Promise<AiListResult> {
  const userId = await requireUserId();

  const parsed = suggestSkillsInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const rateLimit = await checkAiRateLimit(userId);
  if (!rateLimit.allowed) {
    return { success: false, error: "Daily AI limit reached. Please try again tomorrow." };
  }

  const { jobTitle, existingSkills } = parsed.data;

  const prompt = `Suggest 8 relevant, in-demand resume skills for this job title, that are NOT already in the existing skills list. Return ONLY a comma-separated list of skill names, nothing else — no numbering, no explanation.

Job title: ${jobTitle || "General professional"}
Existing skills: ${existingSkills.length > 0 ? existingSkills.join(", ") : "None"}`;

  try {
    const rawResult = await generateWithGemini(prompt);
    const skills = rawResult
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0 && !existingSkills.includes(skill));

    await logAiUsage(userId, "suggest_skills", prompt, rawResult);
    return { success: true, result: skills };
  } catch {
    return { success: false, error: "AI request failed. Please try again." };
  }
}

export async function fixGrammar(input: FixGrammarInput): Promise<AiResult> {
  const userId = await requireUserId();

  const parsed = fixGrammarInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const rateLimit = await checkAiRateLimit(userId);
  if (!rateLimit.allowed) {
    return { success: false, error: "Daily AI limit reached. Please try again tomorrow." };
  }

  const { text } = parsed.data;

  const prompt = `Fix grammar, spelling, and punctuation errors in this resume text. Do not change the meaning, do not add new information, keep the same tone and length.

Text: "${text}"

Return only the corrected text, no preamble, no quotation marks.`;

  try {
    const result = await generateWithGemini(prompt);
    await logAiUsage(userId, "fix_grammar", prompt, result);
    return { success: true, result: result.trim() };
  } catch {
    return { success: false, error: "AI request failed. Please try again." };
  }
}