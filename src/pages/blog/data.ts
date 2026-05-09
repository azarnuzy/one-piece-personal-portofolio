export type BlogCategory =
  | "all"
  | "tutorials"
  | "web-development"
  | "tips-tricks"
  | "career"
  | "personal";

export type ThumbnailKey = "journey" | "react" | "websocket" | "javascript";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: Exclude<BlogCategory, "all">;
  likes: number;
  featured?: boolean;
  thumbnailKey: ThumbnailKey;
}

export const CATEGORIES: { value: BlogCategory; label: string; count?: number }[] = [
  { value: "all", label: "All Posts" },
  { value: "tutorials", label: "Tutorials", count: 12 },
  { value: "web-development", label: "Web Development", count: 18 },
  { value: "tips-tricks", label: "Tips & Tricks", count: 10 },
  { value: "career", label: "Career", count: 6 },
  { value: "personal", label: "Personal", count: 5 },
];

export const CATEGORY_LABEL: Record<Exclude<BlogCategory, "all">, string> = {
  tutorials: "Tutorial",
  "web-development": "React",
  "tips-tricks": "Tips & Tricks",
  career: "Career",
  personal: "Personal",
};

export const POSTS: BlogPost[] = [
  {
    id: "1",
    title: "My Journey as a Frontend Developer",
    description:
      "A real dive into my path from curiosity to creating real-world web applications. The challenges, the victories, and milestones along the way.",
    date: "Apr 10, 2024",
    readTime: 4,
    category: "career",
    likes: 42,
    featured: true,
    thumbnailKey: "journey",
  },
  {
    id: "2",
    title: "Optimizing React Performance in Production",
    description:
      "Practical techniques to improve performance, reduce re-renders, and deliver a smoother user experience.",
    date: "Apr 26, 2024",
    readTime: 6,
    category: "web-development",
    likes: 37,
    thumbnailKey: "react",
  },
  {
    id: "3",
    title: "How I Built Real-time Chat with WebSocket",
    description:
      "A step-by-step guide on building a scalable real-time chat application using WebSocket, Node.js, and React.",
    date: "May 12, 2024",
    readTime: 5,
    category: "tutorials",
    likes: 52,
    thumbnailKey: "websocket",
  },
  {
    id: "4",
    title: "10 JavaScript Tips You Should Know",
    description: "Handy JavaScript tips and modern features that will level up your coding game.",
    date: "Jun 02, 2024",
    readTime: 7,
    category: "tips-tricks",
    likes: 28,
    thumbnailKey: "javascript",
  },
  {
    id: "5",
    title: "TypeScript Advanced Patterns You Need in 2024",
    description:
      "Explore utility types, conditional types, template literals, and other powerful TypeScript patterns that make large codebases maintainable.",
    date: "Jun 18, 2024",
    readTime: 8,
    category: "web-development",
    likes: 61,
    thumbnailKey: "react",
  },
  {
    id: "6",
    title: "Mastering CSS Grid for Complex Layouts",
    description:
      "A comprehensive guide to CSS Grid — from basic tracks to advanced placement, auto-fill, and responsive magazine-style layouts.",
    date: "Jul 03, 2024",
    readTime: 6,
    category: "tutorials",
    likes: 45,
    thumbnailKey: "javascript",
  },
  {
    id: "7",
    title: "Node.js Best Practices for Scalable APIs",
    description:
      "How to structure, secure, and scale a Node.js REST API — covering project architecture, error handling, and performance patterns.",
    date: "Jul 20, 2024",
    readTime: 9,
    category: "web-development",
    likes: 34,
    thumbnailKey: "websocket",
  },
  {
    id: "8",
    title: "Freelancing as a Developer: Lessons Learned",
    description:
      "Honest reflections on transitioning to freelance work — finding clients, pricing projects, and avoiding common rookie mistakes.",
    date: "Aug 05, 2024",
    readTime: 5,
    category: "career",
    likes: 57,
    thumbnailKey: "journey",
  },
  {
    id: "9",
    title: "State Management Without the Headache",
    description:
      "Comparing Zustand, Jotai, and React Query — when to use each, and how to pick the right tool for your project's complexity.",
    date: "Aug 22, 2024",
    readTime: 7,
    category: "web-development",
    likes: 48,
    thumbnailKey: "react",
  },
];

export const POPULAR_POSTS = [...POSTS].sort((a, b) => b.likes - a.likes).slice(0, 3);
