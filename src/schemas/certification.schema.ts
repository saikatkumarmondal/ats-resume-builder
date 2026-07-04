import { z } from "zod";

export const certificationEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Certification name is required").max(150),
  issuer: z.string().trim().max(150).optional().or(z.literal("")),
  issueDate: z.string().optional().or(z.literal("")),
  credentialUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
});

export const saveCertificationsSchema = z.object({
  resumeId: z.string().cuid(),
  certifications: z.array(certificationEntrySchema),
});

export type CertificationEntry = z.infer<typeof certificationEntrySchema>;
export type SaveCertificationsInput = z.infer<typeof saveCertificationsSchema>;