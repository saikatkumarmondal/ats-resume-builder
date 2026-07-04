"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type AiActionResponse<TResult> =
  | { success: true; result: TResult }
  | { success: false; error: string };

interface AiActionButtonProps<TResult> {
  label: string;
  onGenerate: () => Promise<AiActionResponse<TResult>>;
  onResult: (result: TResult) => void;
}

export function AiActionButton<TResult>({
  label,
  onGenerate,
  onResult,
}: AiActionButtonProps<TResult>) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setErrorMessage(null);
    setIsGenerating(true);
    const response = await onGenerate();
    setIsGenerating(false);

    if (response.success) {
      onResult(response.result);
    } else {
      setErrorMessage(response.error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="mr-1.5 size-3.5 animate-spin" />
        ) : (
          <Sparkles className="mr-1.5 size-3.5" />
        )}
        {isGenerating ? "Generating..." : label}
      </Button>
      {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  );
}