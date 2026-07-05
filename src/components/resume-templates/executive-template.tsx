import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-800">
      {children}
    </h2>
  );
}

export function ExecutiveTemplate({ data }: { data: ResumePreviewData }) {
  const {
    fullName, jobTitle, email, phone, location, website, linkedin, github, portfolio,
    summary, experiences = [], educations = [], skills = [], projects = [],
    certifications = [], languages = [],
  } = data;

  const contactItems = buildContactLine(email, phone, location);
  const linkItems = buildLinkList(website, linkedin, github, portfolio);
  const skillsByCategory = groupSkillsByCategory(skills);

  return (
    <div className="mx-auto min-h-[842px] w-full max-w-[600px] bg-white p-10 font-serif text-black shadow-sm">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900">{fullName || "Your Name"}</h1>
        {jobTitle && <p className="mt-1 text-sm italic text-gray-600">{jobTitle}</p>}
        <div className="mx-auto mt-3 h-px w-24 bg-gray-400" />
        <p className="mt-3 text-xs text-gray-600">{[...contactItems, ...linkItems].join("   ·   ")}</p>
      </header>

      <div className="mt-7 space-y-6">
        {summary && (
          <section className="space-y-2">
            <SectionHeading>Executive Summary</SectionHeading>
            <p className="text-center text-sm italic leading-relaxed text-gray-800">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="space-y-3">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-4">
              {experiences.map((experience, index) => (
                <div key={experience.id ?? index} className="text-center">
                  <p className="text-sm font-bold text-gray-900">{experience.position}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
                    {experience.company} — {formatMonthYear(experience.startDate)} to {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                  </p>
                  {experience.description && (
                    <p className="mx-auto mt-2 max-w-md whitespace-pre-line text-sm leading-relaxed text-gray-700">
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
            <div className="space-y-1 text-center">
              {educations.map((education, index) => (
                <p key={education.id ?? index} className="text-sm text-gray-800">
                  <span className="font-semibold">{education.degree}{education.field && `, ${education.field}`}</span> — {education.institution}
                </p>
              ))}
            </div>
          </section>
        )}

        {Object.keys(skillsByCategory).length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Core Strengths</SectionHeading>
            <p className="text-center text-sm text-gray-800">
              {Object.values(skillsByCategory).flat().join("  ·  ")}
            </p>
          </section>
        )}

        {projects.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Key Projects</SectionHeading>
            <div className="space-y-1 text-center">
              {projects.map((project, index) => (
                <p key={project.id ?? index} className="text-sm text-gray-800">
                  <span className="font-semibold">{project.name}</span>{project.description && ` — ${project.description}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <section className="space-y-1 text-center text-sm text-gray-800">
            {certifications.length > 0 && <p>{certifications.map((c) => c.name).join("  •  ")}</p>}
            {languages.length > 0 && (
              <p>{languages.map((l) => `${l.name} (${l.proficiency})`).join("  •  ")}</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}