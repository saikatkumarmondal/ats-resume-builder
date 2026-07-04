"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface SkillTagInputProps {
  category: string;
  skills: string[];
  onAdd: (skillName: string) => void;
  onRemove: (skillName: string) => void;
}

export function SkillTagInput({ category, skills, onAdd, onRemove }: SkillTagInputProps) {
  const [draftValue, setDraftValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = draftValue.trim();
      if (trimmedValue && !skills.includes(trimmedValue)) {
        onAdd(trimmedValue);
      }
      setDraftValue("");
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{category}</p>
      <div className="flex flex-wrap gap-2 rounded-md border p-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="gap-1 pr-1">
            {skill}
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="rounded-full p-0.5 hover:bg-muted-foreground/20"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="h-7 w-40 border-none px-1 shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}