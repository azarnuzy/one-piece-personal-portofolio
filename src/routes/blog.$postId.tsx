import { createFileRoute } from "@tanstack/react-router";

import { BlogDetailPage } from "@/pages/blog/BlogDetailPage";

export const Route = createFileRoute("/blog/$postId")({
  head: () => ({
    meta: [
      { title: "Blog Post — Azar" },
      {
        name: "description",
        content: "Frontend developer insights, tutorials, and experiences by Azar.",
      },
    ],
  }),
  component: BlogDetailPage,
});
