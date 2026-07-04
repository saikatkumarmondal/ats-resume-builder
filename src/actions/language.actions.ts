"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveLanguagesSchema, type SaveLanguagesInput } from "@/schemas/language.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveLanguages(input: SaveLanguagesInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveLanguagesSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, languages } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.language.deleteMany({ where: { resumeId } }),
    prisma.language.createMany({
      data: languages.map((language, index) => ({
        resumeId,
        name: language.name,
        proficiency: language.proficiency,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}