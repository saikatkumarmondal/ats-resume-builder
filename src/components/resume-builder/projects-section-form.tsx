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
      <form className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Projects
          </h2>

          <div className="self-start sm:self-auto transition-all duration-300 ease-out">
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {fields.map((field, index) => (
            <div
              key={field.fieldKey}
              className="
                transition-all
                duration-300
                ease-out
                hover:-translate-y-0.5
                hover:scale-[1.01]
              "
            >
              <ProjectEntryCard
                control={form.control}
                setValue={form.setValue}
                index={index}
                techStack={watchedProjects[index]?.techStack ?? []}
                onRemove={() => remove(index)}
              />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append(EMPTY_PROJECT)}
          className="
            group
            w-full
            h-11
            sm:h-12
            rounded-xl
            border-dashed
            transition-all
            duration-300
            ease-out
            hover:scale-[1.01]
            hover:shadow-lg
            active:scale-[0.98]
            text-sm
            sm:text-base
          "
        >
          <Plus className="mr-2 size-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
          <span>Add Project</span>
        </Button>
      </form>
    </Form>
  );
}