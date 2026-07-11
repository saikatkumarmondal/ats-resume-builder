import { notFound } from "next/navigation";
import { getResumeForPrint } from "@/actions/resume.actions";
import { LivePreview } from "@/components/resume-builder/live-preview";

interface PrintPageProps {
  params: Promise<{ resumeId: string }>;
}

export default async function PrintPage({ params }: PrintPageProps) {
  const { resumeId } = await params;
  const resume = await getResumeForPrint(resumeId);

  if (!resume) {
    notFound();
  }

  const { personalInfo, experiences, educations, skills, projects, certifications, languages, templateSlug } = resume;

  return (
    <div className="mx-auto max-w-[210mm] print:max-w-none">
      <LivePreview
        templateSlug={templateSlug ?? "modern"}
        fullName={personalInfo?.fullName ?? ""}
        jobTitle={personalInfo?.jobTitle ?? undefined}
        email={personalInfo?.email ?? undefined}
        phone={personalInfo?.phone ?? undefined}
        location={personalInfo?.location ?? undefined}
        website={personalInfo?.website ?? undefined}
        linkedin={personalInfo?.linkedin ?? undefined}
        github={personalInfo?.github ?? undefined}
        portfolio={personalInfo?.portfolio ?? undefined}
        summary={personalInfo?.summary ?? undefined}
        experiences={experiences.map((exp) => ({
          ...exp,
          location: exp.location ?? undefined,
          employmentType: exp.employmentType ?? undefined,
          description: exp.description ?? undefined,
          startDate: exp.startDate.toISOString(),
          endDate: exp.endDate ? exp.endDate.toISOString() : undefined,
        }))}
        educations={educations.map((edu) => ({
          ...edu,
          location: edu.location ?? undefined,
          description: edu.description ?? undefined,
          field: edu.field ?? undefined,
          grade: edu.grade ?? undefined,
          startDate: edu.startDate ? edu.startDate.toISOString() : undefined,
          endDate: edu.endDate ? edu.endDate.toISOString() : undefined,
        }))}
        skills={skills}
        projects={projects.map((proj) => ({
          ...proj,
          role: proj.role ?? undefined,
          description: proj.description ?? undefined,
          githubUrl: proj.githubUrl ?? undefined,
          liveUrl: proj.liveUrl ?? undefined,
          achievements: proj.achievements ?? undefined,
        }))}
        certifications={certifications.map((cert) => ({
          ...cert,
          issuer: cert.issuer ?? undefined,
          issueDate: cert.issueDate ? cert.issueDate.toISOString() : undefined,
          credentialUrl: cert.credentialUrl ?? undefined,
        }))}
        languages={languages.map((lang) => ({
          ...lang,
          proficiency: lang.proficiency as "Basic" | "Conversational" | "Fluent" | "Native",
        }))}
      />
    </div>
  );
}