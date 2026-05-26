import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/pages/contact/ContactPage";

const BASE_URL = "https://azarnuzy.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Azar" },
      {
        name: "description",
        content:
          "Get in touch with Azar. Open for collaborations, freelance projects, and opportunities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/contact` },
      { property: "og:title", content: "Contact — Azar" },
      {
        property: "og:description",
        content:
          "Get in touch with Azar. Open for collaborations, freelance projects, and opportunities.",
      },
      { property: "og:image", content: `${BASE_URL}/preview-homepage.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Azar" },
      {
        name: "twitter:description",
        content: "Get in touch with Azar. Open for collaborations and opportunities.",
      },
      { name: "twitter:image", content: `${BASE_URL}/preview-homepage.png` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
  }),
  component: ContactPage,
});
