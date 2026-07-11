"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Control } from "react-hook-form";
import type { SaveExperiencesFormValues } from "@/schemas/experience.schema";
import { ExperienceEntryCard } from "@/components/resume-builder/experience-entry-card";

interface SortableExperienceItemProps {
  id: string;
  control: Control<SaveExperiencesFormValues>;
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
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
    willChange: isDragging ? "transform, opacity" : "auto",
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`
        w-full 
        rounded-xl 
        transition-shadow 
        duration-300 
        ease-out
        ${isDragging 
          ? "opacity-60 scale-[1.01] sm:scale-[1.02] shadow-xl ring-2 ring-primary/20 z-50 cursor-grabbing" 
          : "opacity-100 scale-100 shadow-none"
        }
      `}
    >
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