"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillsSuggestionTool } from "@/components/ai-assistant/skills-suggestion-tool";
import { GrammarFixTool } from "@/components/ai-assistant/grammar-fix-tool";

interface AiAssistantWorkspaceProps {
  resumes: { id: string; title: string }[];
}

export function AiAssistantWorkspace({ resumes }: AiAssistantWorkspaceProps) {
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id ?? "");

  return (
    <div className="space-y-6">
      <div className="max-w-xs space-y-1.5">
        <label className="text-sm font-medium">Select resume</label>
        <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SkillsSuggestionTool resumeId={selectedResumeId} />
        <GrammarFixTool resumeId={selectedResumeId} />
      </div>
    </div>
  );
}