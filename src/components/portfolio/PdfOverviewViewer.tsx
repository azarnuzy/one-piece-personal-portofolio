import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Document as PdfDocument, Page as PdfPage } from "react-pdf";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Client-only pdfjs loader (react-pdf touches canvas/DOM APIs that don't
// exist during SSR, so the module is only ever imported inside an effect) ────

type PdfComponents = {
  Document: typeof PdfDocument;
  Page: typeof PdfPage;
};

function usePdfComponents() {
  const [components, setComponents] = useState<PdfComponents | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("react-pdf").then(({ Document, Page, pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      if (!cancelled) setComponents({ Document, Page });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return components;
}

// ─── Measures the main viewer's available content width so the page can
// fill it edge-to-edge instead of rendering at a fixed pixel size ───────────

function useElementWidth<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [width, setWidth] = useState(0);
  const ref = useCallback((element: T | null) => setNode(element), []);

  useEffect(() => {
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [ref, width] as const;
}

// ─── Horizontal presentation strip ─────────────────────────────────────────

export function PdfOverviewViewer({ url, fileName }: { url: string; fileName: string }) {
  const components = usePdfComponents();
  const [numPages, setNumPages] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [viewerRef, viewerWidth] = useElementWidth<HTMLDivElement>();
  const pageWidth = Math.min(
    Math.max(viewerWidth * (viewerWidth < 640 ? 0.82 : viewerWidth < 1024 ? 0.46 : 0.32), 240),
    440,
  );

  const scrollStrip = (dir: 1 | -1) => {
    stripRef.current?.scrollBy({ left: dir * (pageWidth + 12), behavior: "smooth" });
  };

  if (!components) {
    return (
      <div className="flex aspect-[16/5] min-h-48 w-full items-center justify-center rounded-xl border border-border/50 bg-muted/20">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <FileTextIcon size={20} className="animate-pulse" />
          <span className="font-sans text-xs">Loading presentation…</span>
        </div>
      </div>
    );
  }

  const { Document, Page } = components;

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border/50 bg-muted/10 shadow-[var(--shadow-card)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-border/40 bg-card/70 px-3 py-2 backdrop-blur-sm">
        <div className="flex min-w-0 items-center gap-2">
          <FileTextIcon size={14} className="shrink-0 text-accent-soft" />
          <span className="max-w-[160px] truncate font-sans text-xs font-medium text-foreground sm:max-w-[280px]">
            {fileName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-2xs whitespace-nowrap text-muted-foreground">
            {numPages ? `${numPages} pages` : "Loading pages"}
          </span>
          {!!numPages && numPages > 1 && (
            <div className="flex items-center gap-1 border-l border-border pl-2">
              <button
                type="button"
                onClick={() => scrollStrip(-1)}
                aria-label="Scroll presentation left"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground active:scale-[0.96]"
              >
                <ChevronLeftIcon size={13} />
              </button>
              <button
                type="button"
                onClick={() => scrollStrip(1)}
                aria-label="Scroll presentation right"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground active:scale-[0.96]"
              >
                <ChevronRightIcon size={13} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <a
            href={url}
            download
            aria-label="Download PDF"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            <DownloadIcon size={13} />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="More options"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                />
              }
            >
              <MoreVerticalIcon size={13} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                render={
                  <a href={url} target="_blank" rel="noreferrer" aria-label="Open in new tab" />
                }
              >
                <ExternalLinkIcon size={13} className="mr-1.5" />
                Open in new tab
              </DropdownMenuItem>
              <DropdownMenuItem render={<a href={url} download aria-label="Download PDF" />}>
                <DownloadIcon size={13} className="mr-1.5" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Document
        file={url}
        onLoadSuccess={({ numPages: n }) => {
          setNumPages(n);
        }}
        loading={
          <div className="flex gap-3 overflow-hidden bg-muted/20 p-3 md:p-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="aspect-video w-[82%] shrink-0 animate-pulse rounded-lg bg-muted/40 sm:w-[46%] lg:w-[32%]"
              />
            ))}
          </div>
        }
        error={
          <div className="flex flex-col items-center gap-2 bg-muted/20 px-4 py-14 text-center text-muted-foreground">
            <FileTextIcon size={20} />
            <span className="font-sans text-xs">
              Unable to preview this file. Try downloading it instead.
            </span>
          </div>
        }
      >
        <div ref={viewerRef} className="w-full bg-muted/20">
          <div
            ref={stripRef}
            className="flex w-full snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto scroll-smooth py-3 pr-3 pl-5 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] md:scroll-pl-6 md:py-4 md:pr-4 md:pl-6"
            aria-label={`${fileName} pages`}
          >
            {!!numPages && pageWidth > 0
              ? Array.from({ length: numPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <figure
                      key={pageNumber}
                      className="group relative shrink-0 snap-start overflow-hidden rounded-lg border border-border/50 bg-card shadow-[var(--shadow-card)]"
                      style={{ width: pageWidth }}
                    >
                      <span className="absolute top-2 left-2 z-[1] rounded-md border border-border/40 bg-card/90 px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground backdrop-blur-sm">
                        {String(pageNumber).padStart(2, "0")}
                      </span>
                      <Page
                        pageNumber={pageNumber}
                        width={pageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={<div className="aspect-video w-full animate-pulse bg-muted/40" />}
                        error={
                          <div className="flex aspect-video w-full items-center justify-center bg-muted/40 px-4 text-center font-sans text-2xs text-muted-foreground">
                            Couldn't render page {pageNumber}
                          </div>
                        }
                      />
                    </figure>
                  );
                })
              : Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="aspect-video w-[82%] shrink-0 animate-pulse rounded-lg bg-muted/40 sm:w-[46%] lg:w-[32%]"
                  />
                ))}
          </div>
        </div>
      </Document>
    </div>
  );
}
