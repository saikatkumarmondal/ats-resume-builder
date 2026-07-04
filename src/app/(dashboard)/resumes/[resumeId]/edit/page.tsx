import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResumeEditor } from "@/components/resume-builder/resume-editor";

interface EditResumePageProps {
  params: Promise<{ resumeId: string }>;
}

function toDateInputValue(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 7);
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const { resumeId } = await params;
  const session = await auth();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session?.user?.id, deletedAt: null },
    include: {
      personalInfo: true,
      experiences: { orderBy: { sortOrder: "asc" } },
      educations: { orderBy: { sortOrder: "asc" } },
      skills: { orderBy: { sortOrder: "asc" } },
      projects: { orderBy: { sortOrder: "asc" } },
      certifications: { orderBy: { sortOrder: "asc" } },
      languages: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <ResumeEditor
      resumeId={resume.id}
      initialPersonalInfo={{
        fullName: resume.personalInfo?.fullName ?? "",
        jobTitle: resume.personalInfo?.jobTitle ?? "",
        email: resume.personalInfo?.email ?? "",
        phone: resume.personalInfo?.phone ?? "",
        location: resume.personalInfo?.location ?? "",
        website: resume.personalInfo?.website ?? "",
        linkedin: resume.personalInfo?.linkedin ?? "",
        github: resume.personalInfo?.github ?? "",
        portfolio: resume.personalInfo?.portfolio ?? "",
        summary: resume.personalInfo?.summary ?? "",
      }}
      initialExperiences={resume.experiences.map((experience) => ({
        id: experience.id,
        company: experience.company,
        position: experience.position,
        location: experience.location ?? "",
        employmentType: experience.employmentType ?? undefined,
        startDate: toDateInputValue(experience.startDate),
        endDate: toDateInputValue(experience.endDate),
        isCurrent: experience.isCurrent,
        description: experience.description ?? "",
      }))}
      initialEducations={resume.educations.map((education) => ({
        id: education.id,
        institution: education.institution,
        degree: education.degree,
        field: education.field ?? "",
        location: education.location ?? "",
        startDate: toDateInputValue(education.startDate),
        endDate: toDateInputValue(education.endDate),
        grade: education.grade ?? "",
        description: education.description ?? "",
      }))}
      initialSkills={resume.skills.map((skill) => ({
        id: skill.id,
        category: skill.category,
        name: skill.name,
      }))}
      initialProjects={resume.projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description ?? "",
        techStack: project.techStack,
        githubUrl: project.githubUrl ?? "",
        liveUrl: project.liveUrl ?? "",
        role: project.role ?? "",
        achievements: project.achievements ?? "",
      }))}
      initialCertifications={resume.certifications.map((certification) => ({
        id: certification.id,
        name: certification.name,
        issuer: certification.issuer ?? "",
        issueDate: toDateInputValue(certification.issueDate),
        credentialUrl: certification.credentialUrl ?? "",
      }))}
      initialLanguages={resume.languages.map((language) => ({
        id: language.id,
        name: language.name,
        proficiency: language.proficiency as "Basic" | "Conversational" | "Fluent" | "Native",
      }))}
    />
  );
}