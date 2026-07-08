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
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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
      <form className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Experience
          </h2>

          <div className="self-start sm:self-auto transition-all duration-300 ease-out">
            <AutosaveIndicator status={autosaveStatus} />
          </div>
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
                  <SortableExperienceItem
                    id={field.fieldKey}
                    control={form.control}
                    index={index}
                    isCurrent={watchedExperiences[index]?.isCurrent ?? false}
                    onRemove={() => remove(index)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          type="button"
          variant="outline"
          onClick={() => append(EMPTY_EXPERIENCE)}
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
          <span>Add Experience</span>
        </Button>
      </form>
    </Form>
  );
}