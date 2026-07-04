"use client";

import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import type { ExperienceEntry } from "@/schemas/experience.schema";
import type { EducationEntry } from "@/schemas/education.schema";
import type { SkillEntry } from "@/schemas/skill.schema";
import type { ProjectEntry } from "@/schemas/project.schema";
import type { CertificationEntry } from "@/schemas/certification.schema";
import type { LanguageEntry } from "@/schemas/language.schema";

interface LivePreviewProps {
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

function formatMonthYear(value: string | undefined): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-gray-300 pb-1 text-[11px] font-bold uppercase tracking-widest text-gray-800">
      {children}
    </h2>
  );
}

export function LivePreview({
  fullName,
  jobTitle,
  email,
  phone,
  location,
  website,
  linkedin,
  github,
  portfolio,
  summary,
  experiences = [],
  educations = [],
  skills = [],
  projects = [],
  certifications = [],
  languages = [],
}: LivePreviewProps) {
  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] ?? []), skill.name];
    return acc;
  }, {});

  const contactItems = [
    { icon: Mail, value: email },
    { icon: Phone, value: phone },
    { icon: MapPin, value: location },
  ].filter((item) => item.value);

  const linkItems = [
    { value: website, label: website ? stripProtocol(website) : "" },
    { value: linkedin, label: linkedin ? stripProtocol(linkedin) : "" },
    { value: github, label: github ? stripProtocol(github) : "" },
    { value: portfolio, label: portfolio ? stripProtocol(portfolio) : "" },
  ].filter((item) => item.value);

  return (
    <div className="mx-auto min-h-[842px] w-full max-w-[600px] bg-white p-10 text-black shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {fullName || "Your Name"}
        </h1>
        {jobTitle && (
          <p className="mt-1 text-sm font-medium text-gray-600">{jobTitle}</p>
        )}

        {(contactItems.length > 0 || linkItems.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <span
                  key={index}
                  className="flex items-center gap-1 text-xs text-gray-600"
                >
                  <Icon className="size-3" />
                  {item.value}
                </span>
              );
            })}
            {linkItems.map((item, index) => (
              <span
                key={`link-${index}`}
                className="flex items-center gap-1 text-xs text-gray-600"
              >
                <LinkIcon className="size-3" />
                {item.label}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-5 space-y-5">
        {summary && (
          <section className="space-y-1.5">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-3">
              {experiences.map((experience, index) => (
                <div key={experience.id ?? index}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {experience.position || "Position"}
                    </p>
                    <p className="shrink-0 text-xs font-medium text-gray-500">
                      {formatMonthYear(experience.startDate)}
                      {" – "}
                      {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {experience.company}
                    {experience.location && ` · ${experience.location}`}
                  </p>
                  {experience.description && (
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                      {experience.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={project.id ?? index}>
                  <p className="text-sm font-semibold text-gray-900">
                    {project.name}
                    {project.role && (
                      <span className="font-normal text-gray-600"> — {project.role}</span>
                    )}
                  </p>
                  {project.techStack.length > 0 && (
                    <p className="text-xs font-medium text-gray-600">
                      {project.techStack.join(" · ")}
                    </p>
                  )}
                  {project.description && (
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      {project.description}
                    </p>
                  )}
                  {project.achievements && (
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-700">
                      {project.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-3">
              {educations.map((education, index) => (
                <div key={education.id ?? index}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {education.degree}
                      {education.field && `, ${education.field}`}
                    </p>
                    <p className="shrink-0 text-xs font-medium text-gray-500">
                      {formatMonthYear(education.startDate)}
                      {" – "}
                      {formatMonthYear(education.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {education.institution}
                    {education.grade && ` · ${education.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {Object.keys(skillsByCategory).length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-1">
              {Object.entries(skillsByCategory).map(([category, names]) => (
                <p key={category} className="text-sm text-gray-800">
                  <span className="font-semibold text-gray-900">{category}: </span>
                  {names.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Certifications</SectionHeading>
            <div className="space-y-1">
              {certifications.map((certification, index) => (
                <p key={certification.id ?? index} className="text-sm text-gray-800">
                  <span className="font-medium text-gray-900">{certification.name}</span>
                  {certification.issuer && ` — ${certification.issuer}`}
                  {certification.issueDate &&
                    ` (${formatMonthYear(certification.issueDate)})`}
                </p>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Languages</SectionHeading>
            <p className="text-sm text-gray-800">
              {languages
                .map((language) => `${language.name} (${language.proficiency})`)
                .join("  ·  ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}