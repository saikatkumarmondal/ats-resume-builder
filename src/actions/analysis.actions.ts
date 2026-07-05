"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateWithGemini } from "@/lib/gemini";
import { checkAiRateLimit } from "@/lib/rate-limit";
import { buildResumeText } from "@/lib/resume-to-text";
import {
  analyzeResumeInputSchema,
  resumeAnalysisResultSchema,
  type AnalyzeResumeInput,
  type ResumeAnalysisResult,
} from "@/schemas/analysis.schema";

type AnalysisActionResult =
  | { success: true; result: ResumeAnalysisResult }
  | { success: false; error: string };

function extractJson(rawText: string): string {
  return rawText.replace(/```json|```/g, "").trim();
}

export async function analyzeResume(
  input: AnalyzeResumeInput
): Promise<AnalysisActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = analyzeResumeInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const rateLimit = await checkAiRateLimit(session.user.id);
  if (!rateLimit.allowed) {
    return { success: false, error: "Daily AI limit reached. Please try again tomorrow." };
  }

  const { resumeId, jobDescription } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
    include: {
      personalInfo: true,
      experiences: true,
      educations: true,
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
    },
  });

  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  const resumeText = buildResumeText(resume);

  const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer and Senior Technical Recruiter.

Your task is to analyze the provided resume and evaluate how well it would perform in modern ATS software used by employers.

Scoring Guidelines:
- atsScore: Overall ATS compatibility (0-100).
- keywordMatchScore: Match against the provided job description. If no job description is supplied, evaluate the resume's general keyword relevance for its target profession.
- formattingScore: Evaluate ATS-friendly formatting, section organization, headings, font consistency, tables, columns, graphics, and parseability.
- readabilityScore: Evaluate clarity, organization, sentence structure, and ease of reading.
- grammarScore: Evaluate grammar, spelling, punctuation, and professional writing quality.

Analysis Requirements:
1. Identify missing or underrepresented skills commonly expected for the target role.
2. Detect weak or generic action verbs that should be replaced with stronger alternatives.
3. Detect phrases written in passive voice.
4. Provide 3-6 concise, specific, and actionable recommendations that would improve ATS performance and recruiter appeal.
5. Base every evaluation solely on the provided resume and job description. Never invent information.

Output Rules:
- Return ONLY valid JSON.
- Do NOT return Markdown.
- Do NOT use code fences.
- Do NOT include explanations, comments, or extra text.
- Every score must be an integer between 0 and 100.
- Arrays must always be present. Use empty arrays when nothing is found.

Return exactly this JSON schema:

{
  "atsScore": number,
  "keywordMatchScore": number,
  "formattingScore": number,
  "readabilityScore": number,
  "grammarScore": number,
  "suggestions": string[],
  "missingSkills": string[],
  "weakVerbs": string[],
  "passiveVoiceInstances": string[]
}
`;

  try {
    const rawResult = await generateWithGemini(prompt);
    const jsonText = extractJson(rawResult);
    const parsedJson = JSON.parse(jsonText);

    const validated = resumeAnalysisResultSchema.safeParse(parsedJson);
    if (!validated.success) {
      return { success: false, error: "AI returned an unexpected format. Please try again." };
    }

    await prisma.aIHistory.create({
      data: {
        userId: session.user.id,
        feature: "analyze_resume",
        inputSnapshot: prompt,
        outputSnapshot: jsonText,
      },
    });

    return { success: true, result: validated.data };
  } catch {
    return { success: false, error: "AI request failed. Please try again." };
  }
}