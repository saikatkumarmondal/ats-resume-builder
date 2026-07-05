import { RESUME_TEMPLATES } from "@/config/templates.config";
import { TemplateGalleryCard } from "@/components/resume-templates/template-gallery-card";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Choose an ATS-friendly template to start a new resume.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RESUME_TEMPLATES.map((template) => (
          <TemplateGalleryCard
            key={template.slug}
            slug={template.slug}
            name={template.name}
            description={template.description}
          />
        ))}
      </div>
    </div>
  );
}