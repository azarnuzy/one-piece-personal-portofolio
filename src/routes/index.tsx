import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/homepage/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azar — Frontend Developer" },
      {
        name: "description",
        content:
          "Frontend Developer crafting fast, scalable & interactive web experiences. Specializing in React, TypeScript, and real-time web applications.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Azar — Frontend Developer" },
      {
        property: "og:description",
        content:
          "Frontend Developer crafting fast, scalable & interactive web experiences. Specializing in React, TypeScript, and real-time web applications.",
      },
      { property: "og:image", content: "/preview-homepage.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Azar — Frontend Developer Portfolio" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Azar — Frontend Developer" },
      {
        name: "twitter:description",
        content: "Frontend Developer crafting fast, scalable & interactive web experiences.",
      },
      { name: "twitter:image", content: "/preview-homepage.png" },
    ],
  }),
  component: HomePage,
});
