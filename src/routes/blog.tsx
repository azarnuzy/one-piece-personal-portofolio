import { createFileRoute } from "@tanstack/react-router";

import { BlogPage } from "@/pages/blog/BlogPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Azar" },
      {
        name: "description",
        content:
          "Sharing my journey, tutorials, insights, and experiences in the world of frontend development.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Blog — Azar" },
      {
        property: "og:description",
        content: "Frontend developer insights, tutorials, and experiences by Azar.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — Azar" },
    ],
  }),
  component: BlogPage,
});
