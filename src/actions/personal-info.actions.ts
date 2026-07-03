"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { personalInfoSchema, type PersonalInfoInput } from "@/schemas/personal-info.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveInstructionData(): Promise<never> {
  throw new Error("unused");
}

export async function savePersonalInfo(
  input: PersonalInfoInput
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = personalInfoSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, ...personalInfoFields } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.personalInfo.upsert({
    where: { resumeId },
    create: { resumeId, ...personalInfoFields },
    update: personalInfoFields,
  });

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}