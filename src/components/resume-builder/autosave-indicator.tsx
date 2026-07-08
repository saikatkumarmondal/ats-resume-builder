import { Check, Loader2, AlertCircle } from "lucide-react";
import type { AutosaveStatus } from "@/hooks/use-debounced-autosave";

interface AutosaveIndicatorProps {
  status: AutosaveStatus;
}

export function AutosaveIndicator({ status }: AutosaveIndicatorProps) {
  // Return immediately if idle or if status parameter is completely falsy
  if (!status || status === "idle") return null;

  // Strongly typed visual dictionary configuration map
  const statusConfig = {
    saving: { 
      icon: Loader2, 
      label: "Saving...", 
      className: "animate-spin text-slate-400 transform-gpu" 
    },
    saved: { 
      icon: Check, 
      label: "Saved to cloud", 
      className: "text-emerald-500 font-bold" 
    },
    error: { 
      icon: AlertCircle, 
      label: "Save failed — retrying", 
      className: "text-destructive animate-pulse" 
    },
  };

  // Defensive fallback checkpoint check to ensure unexpected input statuses never break the page layout
  const activeConfig = statusConfig[status as keyof typeof statusConfig];
  if (!activeConfig) return null;

  const StatusIcon = activeConfig.icon;

  return (
    <div 
      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500/90 select-none transition-all duration-200"
      role="status"
      aria-live="polite" // Accessible screen-reader notice trigger for content mutation tracking
    >
      <StatusIcon className={`h-3.5 w-3.5 shrink-0 ${activeConfig.className}`} />
      <span className="tracking-tight leading-none">
        {activeConfig.label}
      </span>
    </div>
  );
}