"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/actions/resume.actions";
import { LivePreview } from "@/components/resume-builder/live-preview";
import { SAMPLE_RESUME_DATA } from "@/config/sample-resume-data.config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TemplateGalleryCardProps {
  slug: string;
  name: string;
  description: string;
}

export function TemplateGalleryCard({ slug, name, description }: TemplateGalleryCardProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleUseTemplate = async () => {
    setIsCreating(true);
    const result = await createResume({ title: `${name} Resume`, templateSlug: slug });
    setIsCreating(false);

    if (result.success) {
      router.push(`/resumes/${result.resumeId}/edit`);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
        <div className="absolute left-1/2 top-0 w-[600px] origin-top -translate-x-1/2 scale-[0.32]">
          <LivePreview templateSlug={slug} {...SAMPLE_RESUME_DATA} />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleUseTemplate} disabled={isCreating}>
          {isCreating ? "Creating..." : "Use this template"}
        </Button>
      </CardFooter>
    </Card>
  );
}