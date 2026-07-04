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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Skills
        </h2>
        <AutosaveIndicator status={autosaveStatus} />
      </div>

      <div className="space-y-4">
        {skillCategoryOptions.map((category) => (
          <SkillTagInput
            key={category}
            category={category}
            skills={skills.filter((skill) => skill.category === category).map((s) => s.name)}
            onAdd={(name) => addSkill(category, name)}
            onRemove={(name) => removeSkill(category, name)}
          />
        ))}
      </div>
    </div>
  );
}