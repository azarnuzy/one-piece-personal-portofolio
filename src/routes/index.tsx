import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/homepage/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azar — Software Engineer building AI-powered platforms" },
      {
        name: "description",
        content:
          "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Azar — Software Engineer building AI-powered platforms" },
      {
        property: "og:description",
        content:
          "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
      },
      { property: "og:image", content: "/preview-homepage.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Azar — Software Engineer Portfolio" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Azar — Software Engineer building AI-powered platforms" },
      {
        name: "twitter:description",
        content:
          "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
      },
      { name: "twitter:image", content: "/preview-homepage.png" },
    ],
  }),
  component: HomePage,
});
