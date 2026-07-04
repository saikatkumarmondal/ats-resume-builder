import type { employmentTypeOptions } from "@/schemas/experience.schema";

export const EMPLOYMENT_TYPE_LABELS: Record<(typeof employmentTypeOptions)[number], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};