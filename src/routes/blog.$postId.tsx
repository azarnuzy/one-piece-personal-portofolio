import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  return <BlogDetailPage postId={postId} onBack={() => navigate({ to: "/blog" })} />;
}
