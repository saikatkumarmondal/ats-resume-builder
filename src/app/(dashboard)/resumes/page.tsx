import { FileText } from "lucide-react";
import { getUserResumes } from "@/actions/resume.actions";
import { CreateResumeDialog } from "@/components/resume-builder/create-resume-dialog";
import { ResumeCard } from "@/components/resume-builder/resume-card";
import { EmptyState } from "@/components/shared/empty-state";

export default async function ResumesPage() {
  const resumes = await getUserResumes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Resumes</h1>
          <p className="text-sm text-muted-foreground">
            Manage, edit, and download your resumes.
          </p>
        </div>
        <CreateResumeDialog />
      </div>

      {resumes.length === 0 ? (
        <EmptyStateWrapper />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resumeId={resume.id}
              title={resume.title}
              templateSlug={resume.templateSlug}
              status={resume.status}
              updatedAt={resume.updatedAt}
              fullName={resume.personalInfo?.fullName ?? null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyStateWrapper() {
  return (
    <EmptyState
      icon={FileText}
      title="No resumes yet"
      description="Create your first ATS-friendly resume to get started."
    />
  );
}