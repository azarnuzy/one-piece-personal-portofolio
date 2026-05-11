import { createFileRoute } from "@tanstack/react-router";

import { ProjectDetailPage } from "@/pages/projects/ProjectDetailPage";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Detail — Azar" },
      {
        name: "description",
        content: "An in-depth case study of a project built by Azar, frontend developer.",
      },
    ],
  }),
  component: ProjectDetailPage,
});
