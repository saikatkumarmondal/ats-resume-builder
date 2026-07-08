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
    <div className="space-y-2 w-full transition-all duration-200">
      <p className="text-sm font-semibold tracking-tight text-foreground/90">{category}</p>
      
      {/* Container adapts cleanly across small viewports, ensuring elements wrap perfectly without overflowing */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-xl border border-input bg-background/50 p-2 transition-all duration-300 ease-in-out focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 hover:border-muted-foreground/30">
        
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="group gap-1 py-1 pl-2.5 pr-1.5 text-xs font-medium transition-all duration-200 ease-out select-none animate-in fade-in-0 zoom-in-95 hover:bg-secondary/80 hover:scale-[1.02]"
          >
            <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs">{skill}</span>
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="rounded-full p-0.5 text-muted-foreground transition-all duration-150 ease-in-out hover:bg-destructive hover:text-destructive-foreground focus:outline-none focus:ring-1 focus:ring-destructive/40"
              aria-label={`Remove ${skill}`}
            >
              <X className="size-3 transition-transform duration-200 group-hover:rotate-45" />
            </button>
          </Badge>
        ))}
        
        <Input
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="h-7 min-w-[140px] flex-1 border-none px-1 shadow-none bg-transparent text-sm transition-all placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}