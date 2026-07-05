"use client";

import { useState } from "react";
import { suggestSkills } from "@/actions/ai.actions";
import { AiActionButton } from "@/components/shared/ai-action-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsSuggestionToolProps {
  resumeId: string;
}

export function SkillsSuggestionTool({ resumeId }: SkillsSuggestionToolProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Skills Suggestion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Target job title (e.g. Backend Developer)"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
        />
        <AiActionButton
          label="Suggest Skills"
          onGenerate={() =>
            suggestSkills({ resumeId, jobTitle, existingSkills: suggestedSkills })
          }
          onResult={(result) => setSuggestedSkills(result)}
        />
        {suggestedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}