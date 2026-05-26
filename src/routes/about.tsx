import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/pages/about/AboutPage";

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
      { property: "og:url", content: `${BASE_URL}/about` },
      { property: "og:title", content: "About — Azar" },
      {
        property: "og:description",
        content:
          "Get to know the developer behind the code. Frontend developer crafting cinematic, interactive web experiences.",
      },
      { property: "og:image", content: `${BASE_URL}/preview-homepage.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Azar" },
      {
        name: "twitter:description",
        content: "Get to know the developer behind the code.",
      },
      { name: "twitter:image", content: `${BASE_URL}/preview-homepage.png` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: AboutPage,
});
