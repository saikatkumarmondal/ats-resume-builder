import { Sparkles } from "lucide-react";
import { getUserResumes } from "@/actions/resume.actions";
import { AiAssistantWorkspace } from "@/components/ai-assistant/ai-assistant-workspace";
import { EmptyState } from "@/components/shared/empty-state";

export default async function AiAssistantPage() {
  const resumes = await getUserResumes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Get AI-powered suggestions to strengthen your resume — powered by Gemini.
        </p>
      </div>

      {resumes.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No resumes yet"
          description="Create a resume first, then come back here for AI-powered suggestions."
        />
      ) : (
        <AiAssistantWorkspace
          resumes={resumes.map((resume) => ({ id: resume.id, title: resume.title }))}
        />
      )}
    </div>
  );
}