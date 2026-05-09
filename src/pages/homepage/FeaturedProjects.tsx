import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LayersIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    image: "/projects/lind-project.png",
    title: "E-Commerce App",
    description: "Full-stack e-commerce platform with modern UI and seamless experience.",
    tags: ["React", "Next.js", "MongoDB"],
    liveUrl: "#",
    caseUrl: "#",
    badge: "FEATURED",
  },
  {
    image: "/projects/bluebird-project-2.png",
    title: "Real-time Chat",
    description: "Instant messaging app with real-time communication using WebSocket.",
    tags: ["React", "Socket.io", "Express"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
  {
    image: "/projects/bluebird-project.png",
    title: "LMS Platform",
    description: "Learning management system with live class, assignment & analytics.",
    tags: ["React", "Next.js", "MongoDB"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
  {
    image: "/projects/lind-project-3.png",
    title: "Travel Booking",
    description: "Tour & vacation booking platform with payment integration.",
    tags: ["Next.js", "Tailwind", "Stripe"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
  {
    image: "/projects/lind-project-5.png",
    title: "Property Portal",
    description: "Real estate listing site with map filtering and virtual tour preview.",
    tags: ["React", "MapLibre", "Postgres"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
];

export function FeaturedProjects() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !api) return;

    let isCooling = false;

    const onWheel = (e: WheelEvent) => {
      // only handle predominantly-horizontal scroll; let vertical pass through
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
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
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
            className="absolute top-1/2 -left-2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-brand-treasure/40 bg-background/80 text-brand-treasure shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-brand-treasure/15 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ChevronLeftIcon size={16} />
          </button>

          <CarouselContent
            className="-ml-3"
            containerClassName="cursor-grab active:cursor-grabbing select-none"
          >
            {PROJECTS.map((project) => (
              <CarouselItem
                key={project.title}
                className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
              >
                <article className="group h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-treasure/25 bg-background/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-treasure/50 hover:shadow-[0_8px_24px_-8px_rgba(234,179,8,0.25)]">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      {project.badge && (
                        <span className="absolute top-2 left-2 rounded-md bg-brand-treasure/90 px-1.5 py-0.5 font-display text-2xs font-bold tracking-wide text-brand-ink">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="mb-1 font-display text-sm font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mb-2 line-clamp-2 font-sans text-2xs leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-muted/60 px-1.5 py-0.5 font-sans text-2xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-3 pt-1">
                        <a
                          href={project.liveUrl}
                          className="flex items-center gap-1 font-sans text-2xs text-brand-treasure transition-colors hover:text-brand-sun"
                        >
                          <ExternalLinkIcon size={10} />
                          Live Demo
                        </a>
                        <a
                          href={project.caseUrl}
                          className="flex items-center gap-1 font-sans text-2xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <FileTextIcon size={10} />
                          Case Study
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next projects"
            className="absolute top-1/2 -right-2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-brand-treasure/40 bg-background/80 text-brand-treasure shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-brand-treasure/15 disabled:opacity-30 disabled:hover:scale-100"
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
                ? "w-5 bg-brand-treasure"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
