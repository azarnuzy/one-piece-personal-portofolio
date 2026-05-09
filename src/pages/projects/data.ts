export type ProjectCategory = "all" | "web" | "realtime" | "ecommerce" | "tools";
export type ProjectBadge = "featured" | "recent";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  badge?: ProjectBadge;
  isLive?: boolean;
  mockupImage: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  tech: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "lms",
    title: "LMS Platform",
    description:
      "A real-time management system with live classes, chat, assignments and analytics.",
    category: "web",
    badge: "featured",
    isLive: true,
    mockupImage: "/projects/bluebird-project.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Tailwind CSS", "SailsJS", "NodeJs", "Next.js"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce App",
    description:
      "Modern e-commerce platform with product filtering, cart, payment integration, and analytics dashboard.",
    category: "ecommerce",
    badge: "featured",
    isLive: true,
    mockupImage: "/projects/lind-project.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Tailwind CSS", "NodeJs", "MongoDB", "Strapi", "Zustand"],
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat",
    description:
      "Socket-based chat application with rooms, private messaging, and real-time notifications.",
    category: "realtime",
    badge: "recent",
    isLive: true,
    mockupImage: "/projects/bluebird-project-2.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Svelte", "Express", "MongoDB", "SocketIO"],
  },
  {
    id: "travel",
    title: "Travel Booking",
    description:
      "Tour & vacation booking platform with payment integration and real-time availability.",
    category: "web",
    isLive: false,
    mockupImage: "/projects/lind-project-3.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
  },
  {
    id: "property",
    title: "Property Portal",
    description:
      "Real estate listing site with map filtering, virtual tour preview and advanced search.",
    category: "web",
    isLive: false,
    mockupImage: "/projects/lind-project-5.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "TypeScript", "PostgreSQL", "MapLibre"],
  },
  {
    id: "analytics-dash",
    title: "Analytics Dashboard",
    description:
      "Multi-tenant analytics tool with real-time charts, export and collaborative workspaces.",
    category: "tools",
    isLive: false,
    mockupImage: "/projects/bluebird-project-3.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "TypeScript", "Recharts", "Node.js"],
  },
];

export const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "realtime", label: "Real-time Systems" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "tools", label: "Tools & Others" },
];
