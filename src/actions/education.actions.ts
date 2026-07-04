"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveEducationsSchema, type SaveEducationsInput } from "@/schemas/education.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveEducations(
  input: SaveEducationsInput
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveEducationsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, educations } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.education.deleteMany({ where: { resumeId } }),
    prisma.education.createMany({
      data: educations.map((education, index) => ({
        resumeId,
        institution: education.institution,
        degree: education.degree,
        field: education.field || null,
        location: education.location || null,
        startDate: education.startDate ? new Date(education.startDate) : null,
        endDate: education.endDate ? new Date(education.endDate) : null,
        grade: education.grade || null,
        description: education.description || null,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}