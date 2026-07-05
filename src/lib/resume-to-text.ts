import type { Prisma } from "@prisma/client";

type ResumeWithRelations = Prisma.ResumeGetPayload<{
  include: {
    personalInfo: true;
    experiences: true;
    educations: true;
    skills: true;
    projects: true;
    certifications: true;
    languages: true;
  };
}>;

export function buildResumeText(resume: ResumeWithRelations): string {
  const sections: string[] = [];

  if (resume.personalInfo) {
    const { fullName, jobTitle, summary } = resume.personalInfo;
    sections.push(`Name: ${fullName}\nTarget role: ${jobTitle ?? "Not specified"}`);
    if (summary) sections.push(`Summary:\n${summary}`);
  }

  if (resume.experiences.length > 0) {
    const experienceText = resume.experiences
      .map(
        (experience) =>
          `- ${experience.position} at ${experience.company}: ${experience.description ?? "No description"}`
      )
      .join("\n");
    sections.push(`Experience:\n${experienceText}`);
  }

  if (resume.educations.length > 0) {
    const educationText = resume.educations
      .map((education) => `- ${education.degree} in ${education.field ?? "N/A"}, ${education.institution}`)
      .join("\n");
    sections.push(`Education:\n${educationText}`);
  }

  if (resume.skills.length > 0) {
    sections.push(`Skills:\n${resume.skills.map((skill) => skill.name).join(", ")}`);
  }

  if (resume.projects.length > 0) {
    const projectText = resume.projects
      .map((project) => `- ${project.name}: ${project.description ?? "No description"}`)
      .join("\n");
    sections.push(`Projects:\n${projectText}`);
  }

  return sections.join("\n\n");
}