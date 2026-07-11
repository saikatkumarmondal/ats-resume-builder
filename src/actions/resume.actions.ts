"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createResumeSchema,
  renameResumeSchema,
  type CreateResumeInput,
  type RenameResumeInput,
} from "@/schemas/resume.schema";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

export async function getUserResumes() {
  const userId = await requireUserId();

  return prisma.resume.findMany({
    where: { userId, deletedAt: null },
    orderBy: { updatedAt: "desc" },
    include: {
      personalInfo: { select: { fullName: true, jobTitle: true } },
    },
  });
}

type CreateResumeResult =
  | { success: true; resumeId: string }
  | { success: false; error: string };

export async function createResume(
  input: CreateResumeInput
): Promise<CreateResumeResult> {
  const userId = await requireUserId();

  const parsed = createResumeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const resume = await prisma.resume.create({
    data: {
      userId,
      title: parsed.data.title,
      templateSlug: parsed.data.templateSlug,
    },
  });

  revalidatePath("/resumes");
  revalidatePath("/dashboard");

  return { success: true, resumeId: resume.id };
}

type ActionResult = { success: true } | { success: false; error: string };

export async function renameResume(
  input: RenameResumeInput
): Promise<ActionResult> {
  const userId = await requireUserId();

  const parsed = renameResumeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const resume = await prisma.resume.findFirst({
    where: { id: parsed.data.resumeId, userId, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.resume.update({
    where: { id: resume.id },
    data: { title: parsed.data.title },
  });

  revalidatePath("/resumes");
  return { success: true };
}

export async function duplicateResume(resumeId: string): Promise<ActionResult> {
  const userId = await requireUserId();

  const original = await prisma.resume.findFirst({
    where: { id: resumeId, userId, deletedAt: null },
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

  if (!original) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.resume.create({
    data: {
      userId,
      title: `${original.title} (Copy)`,
      templateSlug: original.templateSlug,
      personalInfo: original.personalInfo
        ? {
            create: (() => {
              const { id, resumeId: _r, ...rest } = original.personalInfo;
              return rest;
            })(),
          }
        : undefined,
      experiences: {
        create: original.experiences.map(({ id, resumeId: _r, ...rest }) => rest),
      },
      educations: {
        create: original.educations.map(({ id, resumeId: _r, ...rest }) => rest),
      },
      skills: {
        create: original.skills.map(({ id, resumeId: _r, ...rest }) => rest),
      },
      projects: {
        create: original.projects.map(({ id, resumeId: _r, ...rest }) => rest),
      },
      certifications: {
        create: original.certifications.map(({ id, resumeId: _r, ...rest }) => rest),
      },
      languages: {
        create: original.languages.map(({ id, resumeId: _r, ...rest }) => rest),
      },
    },
  });

  revalidatePath("/resumes");
  return { success: true };
}

export async function softDeleteResume(resumeId: string): Promise<ActionResult> {
  const userId = await requireUserId();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.resume.update({
    where: { id: resume.id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/resumes");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateResumeTemplate(
  resumeId: string,
  templateSlug: string
): Promise<ActionResult> {
  const userId = await requireUserId();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.resume.update({
    where: { id: resume.id },
    data: { templateSlug },
  });

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}

export async function getResumeForPrint(resumeId: string) {
  const userId = await requireUserId();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId, deletedAt: null },
    include: {
      personalInfo: true,
      experiences: { orderBy: { startDate: "desc" } },
      educations: { orderBy: { startDate: "desc" } },
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
    },
  });

  if (!resume) {
    return null;
  }

  return resume;
}