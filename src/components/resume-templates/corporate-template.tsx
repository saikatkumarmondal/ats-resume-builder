import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bg-gray-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
      {children}
    </h2>
  );
}

export function CorporateTemplate({ data }: { data: ResumePreviewData }) {
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
      <header className="bg-gray-900 p-8 text-white">
        <h1 className="text-2xl font-bold">{fullName || "Your Name"}</h1>
        {jobTitle && <p className="mt-1 text-sm text-gray-300">{jobTitle}</p>}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300">
          {[...contactItems, ...linkItems].map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </header>

      <div className="space-y-4 p-8">
        {summary && (
          <section className="space-y-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Work Experience</SectionHeading>
            <div className="space-y-3 pt-1">
              {experiences.map((experience, index) => (
                <div key={experience.id ?? index}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900">{experience.position}</p>
                    <p className="shrink-0 text-xs font-medium text-gray-500">
                      {formatMonthYear(experience.startDate)} – {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">{experience.company}</p>
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
                <div key={education.id ?? index} className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {education.degree}{education.field && `, ${education.field}`} — {education.institution}
                  </p>
                  <p className="shrink-0 text-xs text-gray-500">
                    {formatMonthYear(education.startDate)} – {formatMonthYear(education.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {Object.keys(skillsByCategory).length > 0 && (
          <section className="space-y-2">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-1 pt-1">
              {Object.entries(skillsByCategory).map(([category, names]) => (
                <p key={category} className="text-sm text-gray-800">
                  <span className="font-semibold">{category}: </span>{names.join(", ")}
                </p>
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
          <section className="space-y-1 text-sm text-gray-800 pt-1">
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