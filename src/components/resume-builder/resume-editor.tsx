"use client";

import { useState, useTransition, useEffect } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Award,
  Languages as LanguagesIcon,
  ScanSearch,
} from "lucide-react";
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
import { DownloadPdfButton } from "@/components/resume-builder/download-pdf-button";
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

const SECTIONS = [
  { id: "personal-info", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "languages", label: "Languages", icon: LanguagesIcon },
  { id: "analysis", label: "Analysis", icon: ScanSearch },
] as const;

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
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("personal-info");

  useEffect(() => {
    const checkViewport = () => {
      // 1024px matches Tailwind's 'lg' breakpoint
      setIsDesktop(window.innerWidth >= 1024);
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

  const activeSectionMeta = SECTIONS.find((section) => section.id === activeSection) ?? SECTIONS[0];
  const ActiveIcon = activeSectionMeta.icon;

  // Mobile section switcher — a Select dropdown instead of cramped scrolling tabs
  const mobileSectionSwitcher = (
    <Select value={activeSection} onValueChange={setActiveSection}>
      <SelectTrigger className="mb-10 h-11 w-full border-muted-foreground/20 bg-muted/40 shadow-sm">
        <div className="flex items-center gap-2">
          <ActiveIcon className="size-4 text-muted-foreground" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-72 overflow-y-auto">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <SelectItem key={section.id} value={section.id} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground" />
                {section.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );

  // Desktop tab bar — 4-column grid so 8 sections always wrap into exactly 2 clean rows
  const desktopTabList = (
    <TabsList className="mb-10 grid h-auto w-full grid-cols-4 gap-1.5 rounded-lg bg-muted/60 p-1.5 backdrop-blur-sm">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        return (
          <TabsTrigger
            key={section.id}
            value={section.id}
            className="flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium leading-tight transition-all duration-200 ease-out hover:bg-background/80 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-sm"
          >
            <Icon className="size-3.5 shrink-0" />
            <span className="truncate">{section.label}</span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );

  const sectionContent = (
    <>
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
    </>
  );

  const previewToolbar = (
    <div className="mx-auto mb-6 flex max-w-[600px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Select value={templateSlug} onValueChange={handleTemplateChange}>
        <SelectTrigger className="w-full border-muted-foreground/20 bg-background shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-accent/10 sm:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-72 overflow-y-auto">
          {RESUME_TEMPLATES.map((template) => (
            <SelectItem key={template.slug} value={template.slug} className="cursor-pointer">
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full sm:w-auto">
        <DownloadPdfButton resumeId={resumeId} />
      </div>
    </div>
  );

  const previewPanel = (
    <div className="rounded-xl border border-muted-foreground/10 bg-background p-2 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-4">
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
  );

  // Mobile / tablet (< lg): Select-based section switcher, stacked layout, normal page scroll
  if (!isDesktop) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border bg-background p-4 shadow-sm sm:p-6">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            {mobileSectionSwitcher}
            {sectionContent}
          </Tabs>
        </div>
        <div className="rounded-xl border bg-muted/20 p-4 sm:p-6">
          {previewToolbar}
          {previewPanel}
        </div>
      </div>
    );
  }

  // Desktop (>= lg): resizable horizontal split with full tab bar
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-8rem)] rounded-xl border shadow-sm"
    >
      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto bg-background p-6 lg:p-8">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            {desktopTabList}
            {sectionContent}
          </Tabs>
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="w-2 cursor-col-resize bg-border/60 transition-colors duration-200 hover:bg-primary/40"
      />

      <ResizablePanel defaultSize={50} minSize={35}>
        <div className="h-full overflow-y-auto bg-muted/20 p-6 lg:p-8">
          {previewToolbar}
          {previewPanel}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}