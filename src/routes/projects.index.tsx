import { createFileRoute } from "@tanstack/react-router";

import { ProjectsPage } from "@/pages/projects/ProjectsPage";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Azar" },
      {
        name: "description",
        content:
          "A collection of projects that represent my skills, experience and passion for creating value.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Projects — Azar" },
      {
        property: "og:description",
        content: "A collection of projects built with passion by Azar, a Frontend Developer.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projects — Azar" },
    ],
  }),
  component: ProjectsPage,
});
