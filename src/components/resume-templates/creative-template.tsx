import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-800">
      {children}
    </h2>
  );
}

export function CreativeTemplate({ data }: { data: ResumePreviewData }) {
  const {
    fullName, jobTitle, email, phone, location, website, linkedin, github, portfolio,
    summary, experiences = [], educations = [], skills = [], projects = [],
    certifications = [], languages = [],
  } = data;

  const contactItems = buildContactLine(email, phone, location);
  const linkItems = buildLinkList(website, linkedin, github, portfolio);
  const skillsByCategory = groupSkillsByCategory(skills);

  return (
    <div className="mx-auto min-h-[842px] w-full max-w-[600px] bg-white text-black shadow-sm">
      <header className="bg-teal-700 p-10 text-white">
        <h1 className="text-3xl font-bold">{fullName || "Your Name"}</h1>
        {jobTitle && <p className="mt-1 text-sm text-teal-100">{jobTitle}</p>}
        <p className="mt-3 text-xs text-teal-100">{[...contactItems, ...linkItems].join("   ·   ")}</p>
      </header>

      <div className="space-y-5 p-10">
        {summary && (
          <section className="space-y-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-3 pt-1">
              {experiences.map((experience, index) => (
                <div key={experience.id ?? index} className="border-l-2 border-teal-200 pl-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">{experience.position}</p>
                    <p className="shrink-0 text-xs font-medium text-teal-700">
                      {formatMonthYear(experience.startDate)} – {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{experience.company}</p>
                  {experience.description && (
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">{experience.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-2 pt-1">
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
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.values(skillsByCategory).flat().map((skill) => (
                <span key={skill} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-2 pt-1">
              {projects.map((project, index) => (
                <p key={project.id ?? index} className="text-sm text-gray-800">
                  <span className="font-semibold">{project.name}</span>{project.description && ` — ${project.description}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <section className="space-y-1 text-sm text-gray-800">
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