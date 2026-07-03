"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PersonalInfoForm } from "@/components/resume-builder/personal-info-form";
import { LivePreview } from "@/components/resume-builder/live-preview";
import type { PersonalInfoInput } from "@/schemas/personal-info.schema";

interface ResumeEditorProps {
  resumeId: string;
  initialPersonalInfo: Omit<PersonalInfoInput, "resumeId">;
}

export function ResumeEditor({ resumeId, initialPersonalInfo }: ResumeEditorProps) {
  const [previewData, setPreviewData] = useState(initialPersonalInfo);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-8rem)] rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto p-6">
          <PersonalInfoForm
            resumeId={resumeId}
            defaultValues={initialPersonalInfo}
            onValuesChange={setPreviewData}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto bg-muted/30 p-6">
          <LivePreview {...previewData} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}