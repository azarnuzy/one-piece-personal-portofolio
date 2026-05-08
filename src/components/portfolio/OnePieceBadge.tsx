import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface OnePieceBadgeProps {
  text: string;
  className?: string;
}

export function OnePieceBadge({ text, className }: OnePieceBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group relative inline-flex cursor-default items-center transition-all duration-300 hover:brightness-110 active:scale-95",
        className,
      )}
    >
      {/* Container for the whole composition with drop shadow */}
      <div
        className={cn(
          "relative flex items-center transition-all duration-500",
          // Enhanced drop shadow for dark mode to make it pop
          isDark
            ? "drop-shadow-[0_0_12px_rgba(212,175,55,0.15)] hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]",
        )}
      >
        {/* Left Fold (The Ribbon Wrap / Lipatan) - SAME HEIGHT as text container */}
        <div
          className={cn(
            "relative z-20 -mr-2 flex h-7 w-8 items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 sm:h-9 sm:w-10",
            isDark ? "bg-[#0b1325]" : "bg-[#fdfbf6]",
          )}
          style={{
            // Shape that looks like a vertical band wrapping around
            clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)",
          }}
        >
          {/* Inner details for the fold */}
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#152441] to-[#0b1325]" />
              {/* Restored strong gold border */}
              <div
                className="absolute inset-[1px] border-[1.5px] border-[#d4af37]/80"
                style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
              />
              {/* Restored gold inner shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(212,175,55,0.25)]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-[#f3e5c2]" />
              <div
                className="absolute inset-[1px] border border-[#5c4033]/30"
                style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
              />
            </>
          )}

          <img
            src={isDark ? "/skull-logo.png" : "/strawhat-logo.png"}
            alt=""
            className="z-10 h-5 w-5 object-contain drop-shadow-sm sm:h-6 sm:w-6"
          />
        </div>

        {/* Main Body (The Compact Banner) - SAME HEIGHT as icon container */}
        <div
          className={cn(
            // Reduced padding: px-3 sm:px-4 instead of wide padding
            "relative z-10 flex h-7 items-center pr-3 pl-4 transition-colors duration-500 sm:h-9 sm:pr-4 sm:pl-5",
            isDark ? "bg-[#080d19]" : "bg-[#ebdcb4]",
          )}
          style={{
            // Irregular handcrafted ribbon-like shape
            clipPath: "polygon(0% 10%, 100% 2%, 98% 98%, 0% 90%)",
          }}
        >
          {/* Layered borders & textures */}
          {isDark ? (
            <>
              {/* Restored lighter navy background so it doesn't blend into the dark page */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f192d] via-[#152441] to-[#0f192d]" />
              {/* Restored double gold borders for that premium One Piece feel */}
              <div
                className="absolute inset-[1px] border border-[#d4af37]/60"
                style={{ clipPath: "polygon(0% 10%, 100% 2%, 98% 98%, 0% 90%)" }}
              />
              <div
                className="absolute inset-[2.5px] border border-[#d4af37]/20"
                style={{ clipPath: "polygon(0% 10%, 100% 2%, 98% 98%, 0% 90%)" }}
              />
              {/* Restored strong inner gold glow */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(212,175,55,0.15)]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf6] via-[#f4ead0] to-[#e4d2a1]" />
              <div
                className="absolute inset-[1px] border border-[#5c4033]/15"
                style={{ clipPath: "polygon(0% 10%, 100% 2%, 98% 98%, 0% 90%)" }}
              />
            </>
          )}

          {/* Subtle noise texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }}
          />

          <span
            className={cn(
              "relative z-10 font-serif text-[10px] font-bold tracking-[0.1em] whitespace-nowrap uppercase sm:text-xs",
              isDark ? "text-[#f3e1a1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "text-[#4a3525]",
            )}
          >
            {text}
          </span>

          {/* Shine effect on hover */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100",
              !isDark && "via-white/30",
            )}
          />
        </div>
      </div>
    </div>
  );
}
