import { z } from "zod";

export const projectEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Project name is required").max(150),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  techStack: z.array(z.string()).default([]),
  githubUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  achievements: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const saveProjectsSchema = z.object({
  resumeId: z.string().cuid(),
  projects: z.array(projectEntrySchema),
});

export type ProjectEntry = z.infer<typeof projectEntrySchema>;
export type SaveProjectsInput = z.infer<typeof saveProjectsSchema>;