import type { ResumePreviewData } from "@/types/resume-preview";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { ProfessionalTemplate } from "@/components/resume-templates/professional-template";
import { ExecutiveTemplate } from "@/components/resume-templates/executive-template";
import { MinimalTemplate } from "@/components/resume-templates/minimal-template";
import { CreativeTemplate } from "@/components/resume-templates/creative-template";
import { CorporateTemplate } from "@/components/resume-templates/corporate-template";

const TEMPLATE_COMPONENTS = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
} as const;

interface LivePreviewProps extends ResumePreviewData {
  templateSlug?: string;
}

export function LivePreview({
  templateSlug = "modern",
  ...data
}: LivePreviewProps) {
  const TemplateComponent =
    TEMPLATE_COMPONENTS[
      templateSlug as keyof typeof TEMPLATE_COMPONENTS
    ] ?? ModernTemplate;

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-xl
        transition-all
        duration-300
        ease-out
        motion-safe:animate-in
        motion-safe:fade-in-0
        motion-safe:zoom-in-[0.98]
      "
    >
      <TemplateComponent data={data} />
    </div>
  );
}