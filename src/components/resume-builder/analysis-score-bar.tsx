import { Progress } from "@/components/ui/progress";

interface AnalysisScoreBarProps {
  label: string;
  score: number;
}

function getScoreColorClass(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-destructive";
}

export function AnalysisScoreBar({ label, score }: AnalysisScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className={`font-semibold ${getScoreColorClass(score)}`}>{score}/100</span>
      </div>
      <Progress value={score} />
    </div>
  );
}