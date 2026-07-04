"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Control } from "react-hook-form";
import type { SaveExperiencesInput } from "@/schemas/experience.schema";
import { ExperienceEntryCard } from "@/components/resume-builder/experience-entry-card";

interface SortableExperienceItemProps {
  id: string;
  control: Control<SaveExperiencesInput>;
  index: number;
  isCurrent: boolean;
  onRemove: () => void;
}

export function SortableExperienceItem({
  id,
  control,
  index,
  isCurrent,
  onRemove,
}: SortableExperienceItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ExperienceEntryCard
        control={control}
        index={index}
        isCurrent={isCurrent}
        onRemove={onRemove}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}