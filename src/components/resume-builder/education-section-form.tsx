"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  saveEducationsSchema,
  type SaveEducationsInput,
  type EducationEntry,
} from "@/schemas/education.schema";
import { saveEducations } from "@/actions/education.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { EducationEntryCard } from "@/components/resume-builder/education-entry-card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const EMPTY_EDUCATION: EducationEntry = {
  institution: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
};

interface EducationSectionFormProps {
  resumeId: string;
  defaultEducations: EducationEntry[];
  onValuesChange: (educations: EducationEntry[]) => void;
}

export function EducationSectionForm({
  resumeId,
  defaultEducations,
  onValuesChange,
}: EducationSectionFormProps) {
  const form = useForm<SaveEducationsInput>({
    resolver: zodResolver(saveEducationsSchema),
    defaultValues: { resumeId, educations: defaultEducations },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
    keyName: "fieldKey",
  });

  const watchedEducations = form.watch("educations");

  useEffect(() => {
    onValuesChange(watchedEducations);
  }, [watchedEducations, onValuesChange]);

  const autosaveStatus = useDebouncedAutosave(
    form.watch(),
    saveEducations,
    form.formState.isValid
  );

  return (
    <Form {...form}>
      <form className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Education
          </h2>

          <div className="self-start sm:self-auto transition-all duration-300 ease-out">
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {fields.map((field, index) => (
            <div
              key={field.fieldKey}
              className="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
            >
              <EducationEntryCard
                control={form.control}
                index={index}
                onRemove={() => remove(index)}
              />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append(EMPTY_EDUCATION)}
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
          <span>Add Education</span>
        </Button>
      </form>
    </Form>
  );
}