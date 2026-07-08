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
        {...personalInfo}
        experiences={experiences}
        educations={educations}
        skills={skills}
        projects={projects}
        certifications={certifications}
        languages={languages}
      />
    </div>
  );
}