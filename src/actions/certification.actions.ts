"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  saveCertificationsSchema,
  type SaveCertificationsInput,
} from "@/schemas/certification.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveCertifications(
  input: SaveCertificationsInput
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveCertificationsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, certifications } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.certification.deleteMany({ where: { resumeId } }),
    prisma.certification.createMany({
      data: certifications.map((certification, index) => ({
        resumeId,
        name: certification.name,
        issuer: certification.issuer || null,
        issueDate: certification.issueDate ? new Date(certification.issueDate) : null,
        credentialUrl: certification.credentialUrl || null,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}