"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { analyzeResume } from "@/actions/analysis.actions";
import type { ResumeAnalysisResult } from "@/schemas/analysis.schema";
import { AnalysisScoreBar } from "@/components/resume-builder/analysis-score-bar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeAnalysisPanelProps {
  resumeId: string;
}

export function ResumeAnalysisPanel({ resumeId }: ResumeAnalysisPanelProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setErrorMessage(null);
    setIsAnalyzing(true);

    const response = await analyzeResume({ resumeId, jobDescription });
    setIsAnalyzing(false);

    if (response.success) {
      setAnalysisResult(response.result);
    } else {
      setErrorMessage(response.error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analyze this resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste a target job description here for keyword matching (optional)..."
            rows={5}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
          />
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 size-4" />
            )}
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnalysisScoreBar label="Overall ATS Score" score={analysisResult.atsScore} />
              <AnalysisScoreBar label="Keyword Match" score={analysisResult.keywordMatchScore} />
              <AnalysisScoreBar label="Formatting" score={analysisResult.formattingScore} />
              <AnalysisScoreBar label="Readability" score={analysisResult.readabilityScore} />
              <AnalysisScoreBar label="Grammar" score={analysisResult.grammarScore} />
            </CardContent>
          </Card>

          {analysisResult.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {analysisResult.missingSkills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Missing Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {analysisResult.missingSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )}

          {(analysisResult.weakVerbs.length > 0 ||
            analysisResult.passiveVoiceInstances.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Writing Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysisResult.weakVerbs.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Weak verbs to replace</p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {analysisResult.weakVerbs.map((verb, index) => (
                        <Badge key={index} variant="outline">
                          {verb}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {analysisResult.passiveVoiceInstances.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Passive voice instances</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-gray-700">
                      {analysisResult.passiveVoiceInstances.map((instance, index) => (
                        <li key={index}>{instance}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}