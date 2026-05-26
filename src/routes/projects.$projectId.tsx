import { createFileRoute } from "@tanstack/react-router";

import { getProjectV2 } from "@/pages/projects/data";
import { ProjectDetailPage } from "@/pages/projects/ProjectDetailPage";

const BASE_URL = "https://azarnuzy.com";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = getProjectV2(params.projectId);
    const title = project ? `${project.hero.title} — Azar` : "Project Detail — Azar";
    const description =
      project?.hero.description ??
      "An in-depth case study of a project built by Azar, frontend developer.";
    const url = `${BASE_URL}/projects/${params.projectId}`;
    const image = project?.thumbnailImage
      ? `${BASE_URL}${project.thumbnailImage}`
      : `${BASE_URL}/preview-homepage.png`;

    const projectJsonLd = project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.hero.title,
          description: project.hero.description,
          author: {
            "@type": "Person",
            name: "Muhammad Azar Nuzy",
            url: BASE_URL,
          },
          url,
          keywords: project.techStack.map((t) => t.name).join(", "),
        }
      : null;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: projectJsonLd
        ? [{ type: "application/ld+json", innerHTML: JSON.stringify(projectJsonLd) }]
        : [],
    };
  },
  component: ProjectDetailPage,
});
