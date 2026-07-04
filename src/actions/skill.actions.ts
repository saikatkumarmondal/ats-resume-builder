"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveSkillsSchema, type SaveSkillsInput } from "@/schemas/skill.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveSkills(input: SaveSkillsInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveSkillsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, skills } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.skill.deleteMany({ where: { resumeId } }),
    prisma.skill.createMany({
      data: skills.map((skill, index) => ({
        resumeId,
        category: skill.category,
        name: skill.name,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}