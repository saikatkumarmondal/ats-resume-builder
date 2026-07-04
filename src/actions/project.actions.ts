"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveProjectsSchema, type SaveProjectsInput } from "@/schemas/project.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function saveProjects(input: SaveProjectsInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = saveProjectsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { resumeId, projects } = parsed.data;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
  });
  if (!resume) {
    return { success: false, error: "Resume not found" };
  }

  await prisma.$transaction([
    prisma.project.deleteMany({ where: { resumeId } }),
    prisma.project.createMany({
      data: projects.map((project, index) => ({
        resumeId,
        name: project.name,
        description: project.description || null,
        techStack: project.techStack,
        githubUrl: project.githubUrl || null,
        liveUrl: project.liveUrl || null,
        role: project.role || null,
        achievements: project.achievements || null,
        sortOrder: index,
      })),
    }),
  ]);

  revalidatePath(`/resumes/${resumeId}/edit`);
  return { success: true };
}