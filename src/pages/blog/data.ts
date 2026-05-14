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
  slug: string;
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
  { value: "all", label: "All Posts", count: 3 },
  { value: "web-development", label: "Web Development", count: 1 },
  { value: "tutorials", label: "Tutorials", count: 1 },
  { value: "career", label: "Career", count: 1 },
];

export const CATEGORY_LABEL: Record<Exclude<BlogCategory, "all">, string> = {
  tutorials: "Tutorial",
  "web-development": "Web Development",
  "tips-tricks": "Tips & Tricks",
  career: "Career",
  personal: "Personal",
};

export const POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "building-sygma-studio-ai-orchestration",
    title: "Building Sygma Studio: Lessons from Shipping an Enterprise AI Orchestration Platform",
    description:
      "How we designed an embeddable, omnichannel AI platform with voice-to-voice simulation, RAG ingestion, and a zero-dependency widget — and what it taught me about scaling frontend architecture.",
    date: "Mar 18, 2026",
    readTime: 9,
    category: "web-development",
    likes: 64,
    featured: true,
    thumbnailKey: "react",
  },
  {
    id: "2",
    slug: "cakra-smart-search-voice-banking",
    title: "Voice-First Banking with Cakra Smart Search: Replacing Menus with Intent",
    description:
      "A deep-dive into how I rebuilt a mobile banking interface around the Web Speech API, intent-based navigation, and context-aware form hydration — and why menu-diving is a UX anti-pattern.",
    date: "Feb 24, 2026",
    readTime: 7,
    category: "tutorials",
    likes: 48,
    thumbnailKey: "websocket",
  },
  {
    id: "3",
    slug: "from-capstone-to-shipping-hiazee",
    title: "From Capstone to Production: What Building Hiazee Taught Me About Real Software",
    description:
      "Hiazee started as a Bangkit Academy capstone — an AI plant marketplace. The classroom version worked. The production rewrite did not. Here's what I unlearned and what finally stuck.",
    date: "Jan 30, 2026",
    readTime: 6,
    category: "career",
    likes: 52,
    thumbnailKey: "journey",
  },
];

export const POPULAR_POSTS = [...POSTS].sort((a, b) => b.likes - a.likes).slice(0, 3);
