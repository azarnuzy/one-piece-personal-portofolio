import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/homepage/HomePage";

const BASE_URL = "https://azarnuzy.com";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Azar Nuzy",
  url: BASE_URL,
  jobTitle: "Software Engineer",
  description:
    "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
  sameAs: ["https://github.com/azarnuzy", "https://linkedin.com/in/azarnuzy"],
};

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
      { property: "og:url", content: `${BASE_URL}/` },
      { property: "og:title", content: "Azar — Software Engineer building AI-powered platforms" },
      {
        property: "og:description",
        content:
          "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
      },
      { property: "og:image", content: `${BASE_URL}/preview-homepage.png` },
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
      { name: "twitter:image", content: `${BASE_URL}/preview-homepage.png` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: HomePage,
});
