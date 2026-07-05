"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateWithGemini } from "@/lib/gemini";
import { checkAiRateLimit } from "@/lib/rate-limit";
import {
  generateSummaryInputSchema,
  improveExperienceInputSchema,
  suggestSkillsInputSchema,
  fixGrammarInputSchema,
  type GenerateSummaryInput,
  type ImproveExperienceInput,
  type SuggestSkillsInput,
  type FixGrammarInput,
} from "@/schemas/ai.schema";

type AiResult =
  | { success: true; result: string }
  | { success: false; error: string };

type AiListResult =
  | { success: true; result: string[] }
  | { success: false; error: string };

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

async function logAiUsage(
  userId: string,
  feature: string,
  inputSnapshot: string,
  outputSnapshot: string
): Promise<void> {
  await prisma.aIHistory.create({
    data: { userId, feature, inputSnapshot, outputSnapshot },
  });
}

export async function generateSummary(
  input: GenerateSummaryInput
): Promise<AiResult> {
  const userId = await requireUserId();

  const parsed = generateSummaryInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const rateLimit = await checkAiRateLimit(userId);
  if (!rateLimit.allowed) {
    return { success: false, error: "Daily AI limit reached. Please try again tomorrow." };
  }

  const { jobTitle, existingSummary } = parsed.data;

  const prompt = existingSummary
    ? `Improve this professional resume summary. Only enhance wording, clarity, tone, and impact — do not invent new facts, roles, or experience that aren't already implied.

Job title: ${jobTitle || "Not specified"}
Current summary: "${existingSummary}"

Return only the improved summary text (2-3 sentences), no preamble, no quotation marks.`
    : `Write a professional resume summary (2-3 sentences) for a candidate with this job title: ${jobTitle || "Not specified"}.

Return only the summary text, no preamble, no quotation marks.`;

  try {
    const result = await generateWithGemini(prompt);
    await logAiUsage(userId, "generate_summary", prompt, result);
    return { success: true, result: result.trim() };
  } catch {
    return { success: false, error: "AI request failed. Please try again." };
  }
}

export async function improveExperienceDescription(
  input: ImproveExperienceInput
): Promise<AiResult> {
  const userId = await requireUserId();

  const parsed = improveExperienceInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const rateLimit = await checkAiRateLimit(userId);
  if (!rateLimit.allowed) {
    return { success: false, error: "Daily AI limit reached. Please try again tomorrow." };
  }

  const { position, company, description } = parsed.data;

  const prompt = `Improve this resume work experience description. Use strong action verbs and ATS-friendly bullet-style phrasing. Do NOT invent facts, numbers, or achievements that are not already implied by the original text — only rewrite and enhance what's given.

Position: ${position}
Company: ${company}
Original description: "${description}"

Return only the improved description text, no preamble, no quotation marks.`;

  try {
    const result = await generateWithGemini(prompt);
    await logAiUsage(userId, "improve_experience", prompt, result);
    return { success: true, result: result.trim() };
  } catch {
    return { success: false, error: "AI request failed. Please try again." };
  }
}

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