"use client";

import { useEffect, useState } from "react";
import { saveSkillsSchema, type SkillEntry } from "@/schemas/skill.schema";
import { skillCategoryOptions } from "@/schemas/skill.schema";
import { saveSkills } from "@/actions/skill.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { SkillTagInput } from "@/components/resume-builder/skill-tag-input";

interface SkillsSectionFormProps {
  resumeId: string;
  defaultSkills: SkillEntry[];
  onValuesChange: (skills: SkillEntry[]) => void;
}

export function SkillsSectionForm({
  resumeId,
  defaultSkills,
  onValuesChange,
}: SkillsSectionFormProps) {
  const [skills, setSkills] = useState<SkillEntry[]>(defaultSkills);

  useEffect(() => {
    onValuesChange(skills);
  }, [skills, onValuesChange]);

  const payload = { resumeId, skills };
  const autosaveStatus = useDebouncedAutosave(
    payload,
    saveSkills,
    saveSkillsSchema.safeParse(payload).success
  );

  const addSkill = (category: string, name: string) => {
    setSkills((previous) => [...previous, { category, name }]);
  };

  const removeSkill = (category: string, name: string) => {
    setSkills((previous) =>
      previous.filter((skill) => !(skill.category === category && skill.name === name))
    );
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in-50 duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-muted pb-3">
        <div className="space-y-0.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
            Skills Inventory
          </h2>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Organize and manage your professional capabilities by domain.
          </p>
        </div>
        <div className="transition-all duration-200 ease-in-out">
          <AutosaveIndicator status={autosaveStatus} />
        </div>
      </div>

      {/* Responsive Structural Grid Layout */}
      {/* Stacks vertically on mobile (sm), and splits into 2 balanced columns on md/lg viewports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {skillCategoryOptions.map((category, index) => (
          <div 
            key={category}
            style={{ animationDelay: `${index * 50}ms` }}
            className="p-4 rounded-xl border border-muted/60 bg-card/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-muted-foreground/20 hover:shadow-md hover:bg-card/80 animate-in fade-in-0 slide-in-from-bottom-2"
          >
            <SkillTagInput
              category={category}
              skills={skills.filter((skill) => skill.category === category).map((s) => s.name)}
              onAdd={(name) => addSkill(category, name)}
              onRemove={(name) => removeSkill(category, name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}