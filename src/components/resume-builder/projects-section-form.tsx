"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  saveProjectsSchema,
  type SaveProjectsInput,
  type ProjectEntry,
} from "@/schemas/project.schema";
import { saveProjects } from "@/actions/project.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { ProjectEntryCard } from "@/components/resume-builder/project-entry-card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const EMPTY_PROJECT: ProjectEntry = {
  name: "",
  description: "",
  techStack: [],
  githubUrl: "",
  liveUrl: "",
  role: "",
  achievements: "",
};

interface ProjectsSectionFormProps {
  resumeId: string;
  defaultProjects: ProjectEntry[];
  onValuesChange: (projects: ProjectEntry[]) => void;
}

export function ProjectsSectionForm({
  resumeId,
  defaultProjects,
  onValuesChange,
}: ProjectsSectionFormProps) {
  const form = useForm<SaveProjectsInput>({
    resolver: zodResolver(saveProjectsSchema),
    defaultValues: { resumeId, projects: defaultProjects },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
    keyName: "fieldKey",
  });

  const watchedProjects = form.watch("projects");

  useEffect(() => {
    onValuesChange(watchedProjects);
  }, [watchedProjects, onValuesChange]);

  const autosaveStatus = useDebouncedAutosave(
    form.watch(),
    saveProjects,
    form.formState.isValid
  );

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Projects
          </h2>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <ProjectEntryCard
              key={field.fieldKey}
              control={form.control}
              setValue={form.setValue}
              index={index}
              techStack={watchedProjects[index]?.techStack ?? []}
              onRemove={() => remove(index)}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(EMPTY_PROJECT)}
        >
          <Plus className="mr-2 size-4" />
          Add Project
        </Button>
      </form>
    </Form>
  );
}