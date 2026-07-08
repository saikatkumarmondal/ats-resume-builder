"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: "light" | "dark", attribute: "class" | "data-theme") {
  const root = document.documentElement;
  if (attribute === "class") {
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  } else {
    root.setAttribute("data-theme", resolved);
  }
  root.style.colorScheme = resolved;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  // Read the value the inline script (see layout.tsx) already applied,
  // so there's no mismatch/flash on mount.
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    () => (theme === "system" ? getSystemTheme() : theme)
  );

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // localStorage may be unavailable (e.g. private browsing) — ignore.
      }
    },
    [storageKey]
  );

  // Apply theme whenever it changes.
  React.useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    applyTheme(resolved, attribute);
  }, [theme, attribute]);

  // Track OS theme changes while in "system" mode.
  React.useEffect(() => {
    if (!enableSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme !== "system") return;
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyTheme(resolved, attribute);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [theme, attribute, enableSystem]);

  // Keep theme in sync across tabs.
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue as Theme);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}