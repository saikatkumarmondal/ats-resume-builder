"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Button variant="outline" size="sm" disabled className="w-28" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-28"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <>
          <Sun className="mr-2 size-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="mr-2 size-4" />
          Dark
        </>
      )}
    </Button>
  );
}