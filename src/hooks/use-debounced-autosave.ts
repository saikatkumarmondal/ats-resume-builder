import { useEffect, useRef, useState } from "react";

const AUTOSAVE_DELAY_MS = 1200;

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

export function useDebouncedAutosave<TInput>(
  value: TInput,
  saveFn: (value: TInput) => Promise<{ success: boolean }>,
  isEnabled: boolean
) {
  const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (!isEnabled) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setAutosaveStatus("saving");
    timeoutRef.current = setTimeout(async () => {
      const result = await saveFn(value);
      setAutosaveStatus(result.success ? "saved" : "error");
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isEnabled]);

  return autosaveStatus;
}