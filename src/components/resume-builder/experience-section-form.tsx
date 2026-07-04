"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  saveExperiencesSchema,
  type SaveExperiencesInput,
  type ExperienceEntry,
} from "@/schemas/experience.schema";
import { saveExperiences } from "@/actions/experience.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { SortableExperienceItem } from "@/components/resume-builder/sortable-experience-item";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const EMPTY_EXPERIENCE: ExperienceEntry = {
  company: "",
  position: "",
  location: "",
  employmentType: undefined,
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

interface ExperienceSectionFormProps {
  resumeId: string;
  defaultExperiences: ExperienceEntry[];
  onValuesChange: (experiences: ExperienceEntry[]) => void;
}

export function ExperienceSectionForm({
  resumeId,
  defaultExperiences,
  onValuesChange,
}: ExperienceSectionFormProps) {
  const form = useForm<SaveExperiencesInput>({
    resolver: zodResolver(saveExperiencesSchema),
    defaultValues: { resumeId, experiences: defaultExperiences },
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "experiences",
    keyName: "fieldKey",
  });

  const watchedExperiences = form.watch("experiences");

  useEffect(() => {
    onValuesChange(watchedExperiences);
  }, [watchedExperiences, onValuesChange]);

  const autosaveStatus = useDebouncedAutosave(
    form.watch(),
    saveExperiences,
    form.formState.isValid
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.fieldKey === active.id);
    const newIndex = fields.findIndex((field) => field.fieldKey === over.id);
    move(oldIndex, newIndex);
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Experience
          </h2>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((field) => field.fieldKey)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {fields.map((field, index) => (
                <SortableExperienceItem
                  key={field.fieldKey}
                  id={field.fieldKey}
                  control={form.control}
                  index={index}
                  isCurrent={watchedExperiences[index]?.isCurrent ?? false}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(EMPTY_EXPERIENCE)}
        >
          <Plus className="mr-2 size-4" />
          Add Experience
        </Button>
      </form>
    </Form>
  );
}