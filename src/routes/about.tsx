import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/pages/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Azar" },
      {
        name: "description",
        content:
          "Get to know the developer behind the code. Frontend developer who loves turning complex problems into simple, beautiful and intuitive solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "About — Azar" },
      {
        property: "og:description",
        content:
          "Get to know the developer behind the code. Frontend developer crafting cinematic, interactive web experiences.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Azar" },
      {
        name: "twitter:description",
        content: "Get to know the developer behind the code.",
      },
    ],
  }),
  component: AboutPage,
});
