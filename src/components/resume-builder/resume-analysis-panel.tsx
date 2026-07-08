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

export function ResumeAnalysisPanel({
  resumeId,
}: ResumeAnalysisPanelProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<ResumeAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setErrorMessage(null);
    setIsAnalyzing(true);

    const response = await analyzeResume({
      resumeId,
      jobDescription,
    });

    setIsAnalyzing(false);

    if (response.success) {
      setAnalysisResult(response.result);
    } else {
      setErrorMessage(response.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Analyze Card */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg">
            Analyze this resume
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <Textarea
            placeholder="Paste a target job description here for keyword matching (optional)..."
            rows={6}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            className="
              resize-none
              transition-all
              duration-300
              focus-visible:ring-2
            "
          />

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="
              group
              w-full
              sm:w-auto
              h-11
              rounded-xl
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            {isAnalyzing ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            )}

            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>

          {errorMessage && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive animate-in fade-in">
              {errorMessage}
            </p>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Scores */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Scores
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <AnalysisScoreBar
                label="Overall ATS Score"
                score={analysisResult.atsScore}
              />

              <AnalysisScoreBar
                label="Keyword Match"
                score={analysisResult.keywordMatchScore}
              />

              <AnalysisScoreBar
                label="Formatting"
                score={analysisResult.formattingScore}
              />

              <AnalysisScoreBar
                label="Readability"
                score={analysisResult.readabilityScore}
              />

              <AnalysisScoreBar
                label="Grammar"
                score={analysisResult.grammarScore}
              />
            </CardContent>
          </Card>

          {/* Suggestions */}
          {analysisResult.suggestions.length > 0 && (
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Suggestions
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Missing Skills */}
          {analysisResult.missingSkills.length > 0 && (
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Missing Skills
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2">
                {analysisResult.missingSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                  >
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Writing Quality */}
          {(analysisResult.weakVerbs.length > 0 ||
            analysisResult.passiveVoiceInstances.length > 0) && (
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Writing Quality
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {analysisResult.weakVerbs.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold">
                      Weak verbs to replace
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {analysisResult.weakVerbs.map((verb, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="
                            transition-all
                            duration-300
                            hover:scale-105
                          "
                        >
                          {verb}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResult.passiveVoiceInstances.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold">
                      Passive voice instances
                    </p>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {analysisResult.passiveVoiceInstances.map(
                        (instance, index) => (
                          <li key={index}>{instance}</li>
                        )
                      )}
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