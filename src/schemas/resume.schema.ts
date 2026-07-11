import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  templateSlug: z.string().trim().min(1).default("modern"),
});

export const renameResumeSchema = z.object({
  resumeId: z.string().cuid(),
  title: z.string().trim().min(1, "Title is required").max(100),
});

export type CreateResumeInput = z.input<typeof createResumeSchema>;
export type CreateResumeData = z.output<typeof createResumeSchema>;
export type RenameResumeInput = z.input<typeof renameResumeSchema>;