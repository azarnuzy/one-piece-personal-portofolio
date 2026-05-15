import { motion } from "framer-motion";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, LayersIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getAllCardProjects } from "@/pages/projects/data";
import { ProjectCard } from "@/pages/projects/ProjectCard";

// Curated subset (in display order) — reuses the canonical project records
// so the Featured carousel and the Projects page stay in lockstep.
const FEATURED_IDS = [
  "sygma-studio",
  "maxmar-evolution",
  "cakra-smart-search",
  "kampus-gratis",
  "hiazee",
];

export function FeaturedProjects() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = useMemo(() => {
    const all = getAllCardProjects();
    return FEATURED_IDS.map((id) => all.find((p) => p.id === id)).filter(
      (p): p is NonNullable<typeof p> => p !== undefined,
    );
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !api) return;

    let isCooling = false;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (isCooling) return;
      isCooling = true;
      if (e.deltaX > 0) api.scrollNext();
      else api.scrollPrev();
      setTimeout(() => {
        isCooling = false;
      }, 500);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setSnapCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="skull" position="top-right" size={140} opacity={0.05} rotate={12} />

      {/* Header */}
      <div className="relative mb-4 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <LayersIcon size={16} className="text-brand-sunset" />
          Featured Projects
        </h2>
        <PirateCTAButton
          variant="secondary"
          icon={<ArrowRightIcon size={13} />}
          to="/projects"
          className="h-8 px-3 text-xs"
        >
          View All
        </PirateCTAButton>
      </div>

      {/* Carousel */}
      <div ref={containerRef}>
        <Carousel setApi={setApi} opts={{ align: "start" }} className="relative">
          {/* Prev arrow */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous projects"
            className="absolute top-1/2 -left-2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-secondary-foreground shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:scale-100 dark:border-brand-treasure/40 dark:bg-background/80 dark:text-brand-treasure dark:shadow-md dark:hover:bg-brand-treasure/15"
          >
            <ChevronLeftIcon size={16} />
          </button>

          <CarouselContent
            className="-ml-3"
            containerClassName="cursor-grab active:cursor-grabbing select-none"
          >
            {featured.map((project, i) => (
              <CarouselItem key={project.id} className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3">
                <ProjectCard project={project} index={i} featured={i === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next projects"
            className="absolute top-1/2 -right-2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-secondary-foreground shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:scale-100 dark:border-brand-treasure/40 dark:bg-background/80 dark:text-brand-treasure dark:shadow-md dark:hover:bg-brand-treasure/15"
          >
            <ChevronRightIcon size={16} />
          </button>
        </Carousel>
      </div>

      {/* Pagination dots */}
      <div className="relative mt-3 flex shrink-0 items-center justify-center gap-1.5">
        {Array.from({ length: snapCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current
                ? "w-5 bg-accent-soft"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
            )}
          />
        ))}
      </div>
    </motion.section>
  );
}
