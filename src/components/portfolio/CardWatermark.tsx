import { cn } from "@/lib/utils";

type WatermarkAsset = "skull" | "sunny";

interface CardWatermarkProps {
  asset?: WatermarkAsset;
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left" | "center-right";
  size?: number;
  opacity?: number;
  rotate?: number;
  className?: string;
}

const ASSET_SRC: Record<WatermarkAsset, string> = {
  skull: "/skull-logo.png",
  sunny: "/thousand-sunny.png",
};

const POSITION_CLASS: Record<NonNullable<CardWatermarkProps["position"]>, string> = {
  "top-right": "-right-6 -top-6",
  "bottom-right": "-bottom-8 -right-8",
  "bottom-left": "-bottom-8 -left-8",
  "top-left": "-left-6 -top-6",
  "center-right": "-right-10 top-1/2 -translate-y-1/2",
};

export function CardWatermark({
  asset = "skull",
  position = "bottom-right",
  size = 160,
  opacity = 0.06,
  rotate = -12,
  className,
}: CardWatermarkProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none",
        POSITION_CLASS[position],
        className,
      )}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotate}deg) ${POSITION_CLASS[position].includes("translate-y") ? "translateY(-50%)" : ""}`,
        backgroundImage: `url(${ASSET_SRC[asset]})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "drop-shadow(0 0 12px rgba(234, 179, 8, 0.18))",
      }}
    />
  );
}
