"use client";

import { useState, useTransition } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalInfoForm } from "@/components/resume-builder/personal-info-form";
import { ExperienceSectionForm } from "@/components/resume-builder/experience-section-form";
import { EducationSectionForm } from "@/components/resume-builder/education-section-form";
import { SkillsSectionForm } from "@/components/resume-builder/skills-section-form";
import { ProjectsSectionForm } from "@/components/resume-builder/projects-section-form";
import { CertificationsSectionForm } from "@/components/resume-builder/certifications-section-form";
import { LanguagesSectionForm } from "@/components/resume-builder/languages-section-form";
import { ResumeAnalysisPanel } from "@/components/resume-builder/resume-analysis-panel";
import { LivePreview } from "@/components/resume-builder/live-preview";
import { RESUME_TEMPLATES } from "@/config/templates.config";
import { updateResumeTemplate } from "@/actions/resume.actions";
import type { PersonalInfoInput } from "@/schemas/personal-info.schema";
import type { ExperienceEntry } from "@/schemas/experience.schema";
import type { EducationEntry } from "@/schemas/education.schema";
import type { SkillEntry } from "@/schemas/skill.schema";
import type { ProjectEntry } from "@/schemas/project.schema";
import type { CertificationEntry } from "@/schemas/certification.schema";
import type { LanguageEntry } from "@/schemas/language.schema";

interface ResumeEditorProps {
  resumeId: string;
  initialTemplateSlug: string;
  initialPersonalInfo: Omit<PersonalInfoInput, "resumeId">;
  initialExperiences: ExperienceEntry[];
  initialEducations: EducationEntry[];
  initialSkills: SkillEntry[];
  initialProjects: ProjectEntry[];
  initialCertifications: CertificationEntry[];
  initialLanguages: LanguageEntry[];
}

export function ResumeEditor({
  resumeId,
  initialTemplateSlug,
  initialPersonalInfo,
  initialExperiences,
  initialEducations,
  initialSkills,
  initialProjects,
  initialCertifications,
  initialLanguages,
}: ResumeEditorProps) {
  const [templateSlug, setTemplateSlug] = useState(initialTemplateSlug);
  const [, startTemplateTransition] = useTransition();
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [educations, setEducations] = useState(initialEducations);
  const [skills, setSkills] = useState(initialSkills);
  const [projects, setProjects] = useState(initialProjects);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [languages, setLanguages] = useState(initialLanguages);

  const handleTemplateChange = (newSlug: string) => {
    setTemplateSlug(newSlug);
    startTemplateTransition(() => {
      updateResumeTemplate(resumeId, newSlug);
    });
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-8rem)] rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto p-6">
          <Tabs defaultValue="personal-info">
            <TabsList className="mb-4 w-full justify-start overflow-x-auto">
              <TabsTrigger value="personal-info" className="shrink-0">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="experience" className="shrink-0">
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="shrink-0">
                Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="shrink-0">
                Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="shrink-0">
                Projects
              </TabsTrigger>
              <TabsTrigger value="certifications" className="shrink-0">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="languages" className="shrink-0">
                Languages
              </TabsTrigger>
              <TabsTrigger value="analysis" className="shrink-0">
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal-info">
              <PersonalInfoForm
                resumeId={resumeId}
                defaultValues={initialPersonalInfo}
                onValuesChange={setPersonalInfo}
              />
            </TabsContent>
            <TabsContent value="experience">
              <ExperienceSectionForm
                resumeId={resumeId}
                defaultExperiences={initialExperiences}
                onValuesChange={setExperiences}
              />
            </TabsContent>
            <TabsContent value="education">
              <EducationSectionForm
                resumeId={resumeId}
                defaultEducations={initialEducations}
                onValuesChange={setEducations}
              />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsSectionForm
                resumeId={resumeId}
                defaultSkills={initialSkills}
                onValuesChange={setSkills}
              />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsSectionForm
                resumeId={resumeId}
                defaultProjects={initialProjects}
                onValuesChange={setProjects}
              />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsSectionForm
                resumeId={resumeId}
                defaultCertifications={initialCertifications}
                onValuesChange={setCertifications}
              />
            </TabsContent>
            <TabsContent value="languages">
              <LanguagesSectionForm
                resumeId={resumeId}
                defaultLanguages={initialLanguages}
                onValuesChange={setLanguages}
              />
            </TabsContent>
            <TabsContent value="analysis">
              <ResumeAnalysisPanel resumeId={resumeId} />
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto bg-muted/30 p-6">
          <div className="mx-auto mb-4 max-w-[600px]">
            <Select value={templateSlug} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESUME_TEMPLATES.map((template) => (
                  <SelectItem key={template.slug} value={template.slug}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <LivePreview
            templateSlug={templateSlug}
            {...personalInfo}
            experiences={experiences}
            educations={educations}
            skills={skills}
            projects={projects}
            certifications={certifications}
            languages={languages}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}