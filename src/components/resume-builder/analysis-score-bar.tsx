import { Progress } from "@/components/ui/progress";

interface AnalysisScoreBarProps {
  label: string;
  score: number;
}

// Map textual contextual colors safely
function getScoreTextColorClass(score: number): string {
  if (score >= 80) return "text-emerald-600 font-bold";
  if (score >= 50) return "text-amber-600 font-bold";
  return "text-destructive font-bold";
}

// Dynamically pass safe background Tailwind color tokens to inject into shadcn's indicators
function getScoreProgressColorClass(score: number): string {
  if (score >= 80) return "[&>div]:bg-emerald-500";
  if (score >= 50) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-destructive";
}

export function AnalysisScoreBar({ label, score }: AnalysisScoreBarProps) {
  // Clamp boundaries defensively to prevent progress bar layout overflows
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <div className="space-y-2 w-full transition-all duration-200">
      {/* Metrics Text Meta Shell */}
      <div className="flex items-center justify-between text-xs sm:text-sm tracking-tight">
        <span className="font-medium text-slate-700 select-none">
          {label}
        </span>
        <span className={`tabular-nums ${getScoreTextColorClass(clampedScore)}`}>
          {clampedScore}<span className="text-slate-400 font-normal text-xs">/100</span>
        </span>
      </div>
      
      {/* Enhanced Multi-State Progress Track */}
      <Progress 
        value={clampedScore} 
        className={`h-2 bg-slate-100 transition-all duration-300 ${getScoreProgressColorClass(clampedScore)}`} 
      />
    </div>
  );
}