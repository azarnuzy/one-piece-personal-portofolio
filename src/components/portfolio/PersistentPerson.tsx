import { motion } from "framer-motion";
import { memo } from "react";

import { useHeroParallax } from "@/components/portfolio/HeroShell";

// ─── Unified config — same person treatment on every page ─────────────────────
//
// The image element below mounts ONCE for the lifetime of the app and never
// unmounts on navigation. Position, size, and the floating bobbing animation
// are identical across all routes, so the person feels like a fixed character
// in the hero — not something that re-flows between pages.

const POSITION_CLASS =
  "-bottom-24 md:-right-8 md:-bottom-20 lg:right-16 lg:-bottom-24 xl:right-16 xl:-bottom-36";
const SIZE_CLASS = "max-h-[400px] xl:max-h-[490px]";
const PARALLAX_SCALE = { x: -6, y: -4 };

function PersistentPersonInner() {
  const parallax = useHeroParallax();

  return (
    <div
      className={`pointer-events-none absolute z-0 hidden h-full items-end select-none md:flex ${POSITION_CLASS}`}
      style={{
        transform: `translate3d(${parallax.x * PARALLAX_SCALE.x}px, ${
          parallax.y * PARALLAX_SCALE.y
        }px, 0)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
      >
        {/* Mounted ONCE — never unmounts on navigation. No img.src swap, no
            re-decode flicker. Browser caches /person.png after first load. */}
        <img
          src="/person.png"
          alt="Azar — Frontend Developer"
          className={`w-auto object-contain object-bottom ${SIZE_CLASS}`}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

export const PersistentPerson = memo(PersistentPersonInner);
