import { z } from "zod";

export const personalInfoSchema = z.object({
  resumeId: z.string().cuid(),
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  jobTitle: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  location: z.string().trim().max(100).optional().or(z.literal("")),
  website: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  github: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  summary: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;