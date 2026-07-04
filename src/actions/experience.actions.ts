"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveExperiencesSchema, type SaveExperiencesInput } from "@/schemas/experience.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveExperiences(
  input: SaveExperiencesInput
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveExperiencesSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, experiences } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.experience.deleteMany({ where: { resumeId } }),
    prisma.experience.createMany({
      data: experiences.map((experience, index) => ({
        resumeId,
        company: experience.company,
        position: experience.position,
        location: experience.location || null,
        employmentType: experience.employmentType,
        startDate: new Date(experience.startDate),
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        isCurrent: experience.isCurrent,
        description: experience.description || null,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}