import type { ExperienceEntry } from "@/schemas/experience.schema";
import type { EducationEntry } from "@/schemas/education.schema";
import type { SkillEntry } from "@/schemas/skill.schema";
import type { ProjectEntry } from "@/schemas/project.schema";
import type { CertificationEntry } from "@/schemas/certification.schema";
import type { LanguageEntry } from "@/schemas/language.schema";

export interface ResumePreviewData {
  fullName: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
  experiences?: ExperienceEntry[];
  educations?: EducationEntry[];
  skills?: SkillEntry[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
  languages?: LanguageEntry[];
}