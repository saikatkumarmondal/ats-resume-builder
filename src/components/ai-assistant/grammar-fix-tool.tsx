"use client";

import { useState } from "react";
import { fixGrammar } from "@/actions/ai.actions";
import { AiActionButton } from "@/components/shared/ai-action-button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GrammarFixToolProps {
  resumeId: string;
}

export function GrammarFixTool({ resumeId }: GrammarFixToolProps) {
  const [text, setText] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Grammar Fix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste any resume text to check grammar and phrasing..."
          rows={6}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <AiActionButton
          label="Fix Grammar"
          onGenerate={() => fixGrammar({ resumeId, text })}
          onResult={(result) => setText(result)}
        />
      </CardContent>
    </Card>
  );
}