import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">
      {children}
    </h2>
  );
}

export function MinimalTemplate({ data }: { data: ResumePreviewData }) {
  const {
    fullName, jobTitle, email, phone, location, website, linkedin, github, portfolio,
    summary, experiences = [], educations = [], skills = [], projects = [],
    certifications = [], languages = [],
  } = data;

  const contactItems = buildContactLine(email, phone, location);
  const linkItems = buildLinkList(website, linkedin, github, portfolio);
  const skillsByCategory = groupSkillsByCategory(skills);

  return (
    <div className="mx-auto min-h-[842px] w-full max-w-[600px] bg-white p-12 text-black shadow-sm">
      <header>
        <h1 className="text-2xl font-light tracking-tight text-gray-900">{fullName || "Your Name"}</h1>
        {jobTitle && <p className="mt-1 text-sm text-gray-500">{jobTitle}</p>}
        <p className="mt-3 text-xs text-gray-400">{[...contactItems, ...linkItems].join("  /  ")}</p>
      </header>

      <div className="mt-8 space-y-6">
        {summary && (
          <section className="space-y-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm font-light leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="space-y-3">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-4">
              {experiences.map((experience, index) => (
                <div key={experience.id ?? index}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm text-gray-900">{experience.position}, {experience.company}</p>
                    <p className="text-xs text-gray-400">
                      {formatMonthYear(experience.startDate)}–{experience.isCurrent ? "Now" : formatMonthYear(experience.endDate)}
                    </p>
                  </div>
                  {experience.description && (
                    <p className="mt-1 whitespace-pre-line text-sm font-light leading-relaxed text-gray-600">
                      {experience.description}
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
            <div className="space-y-1">
              {educations.map((education, index) => (
                <p key={education.id ?? index} className="text-sm text-gray-700">
                  {education.degree}{education.field && `, ${education.field}`} — {education.institution}
                </p>
              ))}
            </div>
          </section>
        )}

        {Object.keys(skillsByCategory).length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Skills</SectionHeading>
            <p className="text-sm font-light text-gray-700">
              {Object.values(skillsByCategory).flat().join(", ")}
            </p>
          </section>
        )}

        {projects.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-1">
              {projects.map((project, index) => (
                <p key={project.id ?? index} className="text-sm text-gray-700">
                  {project.name}{project.description && ` — ${project.description}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <section className="space-y-1 text-sm font-light text-gray-600">
            {certifications.length > 0 && <p>{certifications.map((c) => c.name).join(", ")}</p>}
            {languages.length > 0 && <p>{languages.map((l) => l.name).join(", ")}</p>}
          </section>
        )}
      </div>
    </div>
  );
}