import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeTogglePill() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-0.5 rounded-pill border border-border/50 bg-muted/80 p-1 backdrop-blur-sm">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-sans text-xs font-medium transition-all duration-[var(--duration-base)]",
          !isDark
            ? "bg-card text-foreground shadow-[var(--shadow-card)]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <SunIcon size={12} />
        Day
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-sans text-xs font-medium transition-all duration-[var(--duration-base)]",
          isDark
            ? "bg-card text-foreground shadow-[var(--shadow-card)]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <MoonIcon size={12} />
        Night
      </button>
    </div>
  );
}
