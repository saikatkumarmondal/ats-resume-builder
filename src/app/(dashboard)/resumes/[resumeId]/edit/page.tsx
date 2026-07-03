import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResumeEditor } from "@/components/resume-builder/resume-editor";

interface EditResumePageProps {
  params: Promise<{ resumeId: string }>;
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const { resumeId } = await params;
  const session = await auth();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session?.user?.id, deletedAt: null },
    include: { personalInfo: true },
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
    />
  );
}