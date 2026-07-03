import { Check, Loader2, AlertCircle } from "lucide-react";
import type { AutosaveStatus } from "@/hooks/use-debounced-autosave";

export function AutosaveIndicator({ status }: { status: AutosaveStatus }) {
  if (status === "idle") return null;

  const config = {
    saving: { icon: Loader2, label: "Saving...", className: "animate-spin text-muted-foreground" },
    saved: { icon: Check, label: "Saved", className: "text-emerald-600" },
    error: { icon: AlertCircle, label: "Failed to save", className: "text-destructive" },
  }[status];

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className={`size-3.5 ${config.className}`} />
      {config.label}
    </div>
  );
}