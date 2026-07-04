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
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Education
          </h2>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <EducationEntryCard
              key={field.fieldKey}
              control={form.control}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(EMPTY_EDUCATION)}
        >
          <Plus className="mr-2 size-4" />
          Add Education
        </Button>
      </form>
    </Form>
  );
}