import { createFileRoute } from "@tanstack/react-router";

import { BlogDetailPage } from "@/pages/blog/BlogDetailPage";
import { POSTS } from "@/pages/blog/data";

const BASE_URL = "https://azarnuzy.com";

export const Route = createFileRoute("/blog/$postId")({
  head: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.postId);
    const title = post ? `${post.title} — Azar` : "Blog Post — Azar";
    const description =
      post?.description ?? "Frontend developer insights, tutorials, and experiences by Azar.";
    const url = `${BASE_URL}/blog/${params.postId}`;

    const articleJsonLd = post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          author: {
            "@type": "Person",
            name: "Muhammad Azar Nuzy",
            url: BASE_URL,
          },
          url,
          datePublished: post.date,
        }
      : null;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: `${BASE_URL}/preview-homepage.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${BASE_URL}/preview-homepage.png` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: articleJsonLd
        ? [{ type: "application/ld+json", innerHTML: JSON.stringify(articleJsonLd) }]
        : [],
    };
  },
  component: BlogDetailPage,
});
