import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-gray-300 pb-1 text-[11px] font-bold uppercase tracking-widest text-gray-800">
      {children}
    </h2>
  );
}

export function ModernTemplate({ data }: { data: ResumePreviewData }) {
  const {
    fullName, jobTitle, email, phone, location, website, linkedin, github, portfolio,
    summary, experiences = [], educations = [], skills = [], projects = [],
    certifications = [], languages = [],
  } = data;

  const contactItems = buildContactLine(email, phone, location);
  const linkItems = buildLinkList(website, linkedin, github, portfolio);
  const skillsByCategory = groupSkillsByCategory(skills);

  return (
    <div className="mx-auto min-h-[842px] w-full max-w-[600px] bg-white p-10 text-black shadow-sm">
      <header className="border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{fullName || "Your Name"}</h1>
        {jobTitle && <p className="mt-1 text-sm font-medium text-gray-600">{jobTitle}</p>}
        {(contactItems.length > 0 || linkItems.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {contactItems.map((item, index) => (
              <span key={index} className="flex items-center gap-1 text-xs text-gray-600">
                {index === 0 ? <Mail className="size-3" /> : index === 1 ? <Phone className="size-3" /> : <MapPin className="size-3" />}
                {item}
              </span>
            ))}
            {linkItems.map((item, index) => (
              <span key={`link-${index}`} className="flex items-center gap-1 text-xs text-gray-600">
                <LinkIcon className="size-3" />
                {item}
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
                    <p className="text-sm font-semibold text-gray-900">{experience.position || "Position"}</p>
                    <p className="shrink-0 text-xs font-medium text-gray-500">
                      {formatMonthYear(experience.startDate)} – {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {experience.company}{experience.location && ` · ${experience.location}`}
                  </p>
                  {experience.description && (
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">{experience.description}</p>
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
                    {project.name}{project.role && <span className="font-normal text-gray-600"> — {project.role}</span>}
                  </p>
                  {project.techStack.length > 0 && <p className="text-xs font-medium text-gray-600">{project.techStack.join(" · ")}</p>}
                  {project.description && <p className="mt-1 text-sm leading-relaxed text-gray-700">{project.description}</p>}
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
                      {education.degree}{education.field && `, ${education.field}`}
                    </p>
                    <p className="shrink-0 text-xs font-medium text-gray-500">
                      {formatMonthYear(education.startDate)} – {formatMonthYear(education.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {education.institution}{education.grade && ` · ${education.grade}`}
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
                  <span className="font-semibold text-gray-900">{category}: </span>{names.join(", ")}
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
                </p>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Languages</SectionHeading>
            <p className="text-sm text-gray-800">
              {languages.map((language) => `${language.name} (${language.proficiency})`).join("  ·  ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}