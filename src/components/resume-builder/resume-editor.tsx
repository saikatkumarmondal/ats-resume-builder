"use client";

import { useState, useTransition, useEffect } from "react";
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
import { DownloadPdfButton } from "@/components/resume-builder/download-pdf-button";

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

  // Responsive state logic to determine split orientation vs stacking
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      // 1024px matches Tailwind's 'lg' breakpoint
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleTemplateChange = (newSlug: string) => {
    setTemplateSlug(newSlug);
    startTemplateTransition(() => {
      updateResumeTemplate(resumeId, newSlug);
    });
  };

  return (
    <ResizablePanelGroup
      direction={isMobile ? "vertical" : "horizontal"}
      className="min-h-[calc(100vh-8rem)] rounded-xl border shadow-sm transition-all duration-300 ease-in-out"
    >
      {/* Editor Panel */}
      <ResizablePanel 
        defaultSize={isMobile ? 100 : 50} 
        minSize={isMobile ? 0 : 35}
        className="w-full transition-all duration-300"
      >
        <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <Tabs defaultValue="personal-info" className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto scrollbar-none flex gap-1 p-1 bg-muted/60 backdrop-blur-sm rounded-lg">
              {[
                { id: "personal-info", label: "Personal Info" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "certifications", label: "Certifications" },
                { id: "languages", label: "Languages" },
                { id: "analysis", label: "Analysis" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out hover:bg-background/80 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="transition-all duration-300 ease-in-out">
              <TabsContent value="personal-info" className="outline-none focus-visible:ring-0">
                <PersonalInfoForm
                  resumeId={resumeId}
                  defaultValues={initialPersonalInfo}
                  onValuesChange={setPersonalInfo}
                />
              </TabsContent>
              <TabsContent value="experience" className="outline-none focus-visible:ring-0">
                <ExperienceSectionForm
                  resumeId={resumeId}
                  defaultExperiences={initialExperiences}
                  onValuesChange={setExperiences}
                />
              </TabsContent>
              <TabsContent value="education" className="outline-none focus-visible:ring-0">
                <EducationSectionForm
                  resumeId={resumeId}
                  defaultEducations={initialEducations}
                  onValuesChange={setEducations}
                />
              </TabsContent>
              <TabsContent value="skills" className="outline-none focus-visible:ring-0">
                <SkillsSectionForm
                  resumeId={resumeId}
                  defaultSkills={initialSkills}
                  onValuesChange={setSkills}
                />
              </TabsContent>
              <TabsContent value="projects" className="outline-none focus-visible:ring-0">
                <ProjectsSectionForm
                  resumeId={resumeId}
                  defaultProjects={initialProjects}
                  onValuesChange={setProjects}
                />
              </TabsContent>
              <TabsContent value="certifications" className="outline-none focus-visible:ring-0">
                <CertificationsSectionForm
                  resumeId={resumeId}
                  defaultCertifications={initialCertifications}
                  onValuesChange={setCertifications}
                />
              </TabsContent>
              <TabsContent value="languages" className="outline-none focus-visible:ring-0">
                <LanguagesSectionForm
                  resumeId={resumeId}
                  defaultLanguages={initialLanguages}
                  onValuesChange={setLanguages}
                />
              </TabsContent>
              <TabsContent value="analysis" className="outline-none focus-visible:ring-0">
                <ResumeAnalysisPanel resumeId={resumeId} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ResizablePanel>

      {/* Responsive Separator Handle */}
      <ResizableHandle 
        withHandle 
        className={`bg-border/60 hover:bg-primary/40 transition-colors duration-200 ${isMobile ? "h-2 w-full cursor-row-resize" : "w-2 cursor-col-resize"}`} 
      />

      {/* Preview Panel */}
      <ResizablePanel 
        defaultSize={isMobile ? 100 : 50} 
        minSize={isMobile ? 0 : 35}
        className="w-full transition-all duration-300"
      >
        <div className="h-full overflow-y-auto bg-muted/20 p-4 sm:p-6 lg:p-8 border-t lg:border-t-0">
          <div className="mx-auto mb-6 flex flex-col sm:flex-row max-w-[600px] items-start sm:items-center justify-between gap-4">
            <Select value={templateSlug} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-full sm:w-48 bg-background border-muted-foreground/20 shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-accent/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-md">
                {RESUME_TEMPLATES.map((template) => (
                  <SelectItem 
                    key={template.slug} 
                    value={template.slug}
                    className="cursor-pointer transition-colors duration-150"
                  >
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="w-full sm:w-auto transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <DownloadPdfButton resumeId={resumeId} />
            </div>
          </div>
          
          <div className="rounded-xl bg-background p-2 sm:p-4 shadow-sm border border-muted-foreground/10 transition-shadow duration-300 hover:shadow-md">
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
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}