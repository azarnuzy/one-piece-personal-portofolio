import { createFileRoute } from "@tanstack/react-router";

import { BlogPage } from "@/pages/blog/BlogPage";

const BASE_URL = "https://azarnuzy.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Azar" },
      {
        name: "description",
        content:
          "Sharing my journey, tutorials, insights, and experiences in the world of frontend development.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/blog/` },
      { property: "og:title", content: "Blog — Azar" },
      {
        property: "og:description",
        content: "Frontend developer insights, tutorials, and experiences by Azar.",
      },
      { property: "og:image", content: `${BASE_URL}/preview-homepage.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — Azar" },
      {
        name: "twitter:description",
        content: "Frontend developer insights, tutorials, and experiences by Azar.",
      },
      { name: "twitter:image", content: `${BASE_URL}/preview-homepage.png` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/blog/` }],
  }),
  component: BlogPage,
});
