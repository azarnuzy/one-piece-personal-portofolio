export type ProjectCategory = "all" | "web" | "realtime" | "ecommerce" | "tools";
export type ProjectBadge = "featured" | "recent";
export type ProjectStatus = "Completed" | "In Progress";
export type LearningIcon =
  | "zap"
  | "layers"
  | "server"
  | "users"
  | "trending-up"
  | "shield"
  | "code"
  | "database"
  | "globe"
  | "cpu"
  | "package"
  | "compass"
  | "map"
  | "git-branch";

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

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface ProjectLearning {
  title: string;
  description: string;
  icon: LearningIcon;
}

export interface ProjectDetail extends Project {
  titleHighlight: string;
  date: string;
  readTime: number;
  type: string;
  role: string;
  duration: string;
  completion: string;
  status: ProjectStatus;
  fullDescription: string;
  architecture: string;
  goals: string[];
  features: ProjectFeature[];
  highlights: string[];
  challenges: ProjectChallenge[];
  learnings: ProjectLearning[];
  gallery: string[];
  githubUrl?: string;
  downloadUrl?: string;
}

// ─── V2 content interfaces (match JSON structure exactly) ─────────────────────

export interface ProjectHero {
  title: string;
  description: string;
  subtitle: string;
}

export interface ProjectOverview {
  explanation: string;
  coreValue: string;
  interestPoints: string;
}

export interface KeyFeature {
  name: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  description: string;
}

export interface EngineeringHighlight {
  point: string;
  description: string;
}

export interface WhatILearnedV2 {
  topic: string;
  description: string;
}

export interface ProjectInfoMeta {
  category: string;
  role: string;
  duration: string;
  status: string;
}

export interface GalleryCaption {
  screen: string;
  caption: string;
}

export interface CTAContent {
  livePreview: string;
  sourceCode: string;
}

export interface ProjectV2 {
  // Portfolio metadata (not in content JSON)
  id: string;
  category: Exclude<ProjectCategory, "all">;
  badge?: ProjectBadge;
  isLive?: boolean;
  thumbnailImage: string;
  titleHighlight?: string;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  // Content fields (match JSON structure)
  hero: ProjectHero;
  projectOverview: ProjectOverview;
  keyFeatures: KeyFeature[];
  techStack: TechStackItem[];
  engineeringHighlights: EngineeringHighlight[];
  challenges: ProjectChallenge[];
  whatILearned: WhatILearnedV2[];
  projectInfo: ProjectInfoMeta;
  highlights: string[];
  galleryCaptions: GalleryCaption[];
  ctaContent: CTAContent;
}

// ─── Normalized card type (used by ProjectCard, works for V1 and V2) ──────────

export interface CardProject {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  badge?: ProjectBadge;
  isLive?: boolean;
  thumbnailImage: string;
  liveUrl?: string;
  tech: string[];
  version: "v1" | "v2";
}

// ─── Base project list (used by Projects page / cards) ────────────────────────

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

// ─── Detailed project data (used by Project Detail page) ──────────────────────

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: "lms",
    title: "LMS Platform",
    titleHighlight: "Platform",
    description:
      "A real-time management system with live classes, chat, assignments and analytics.",
    category: "web",
    badge: "featured",
    isLive: true,
    mockupImage: "/projects/bluebird-project.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Tailwind CSS", "SailsJS", "NodeJs", "Next.js"],
    date: "March 10, 2024",
    readTime: 6,
    type: "Client Work",
    role: "Frontend Developer",
    duration: "6 Weeks",
    completion: "March 10, 2024",
    status: "Completed",
    fullDescription:
      "A comprehensive learning management system built for an educational institution. The platform supports live virtual classes with video conferencing, real-time chat between students and instructors, assignment creation and grading, and detailed analytics dashboards for administrators to monitor student engagement and performance.",
    architecture:
      "Built with a Next.js frontend for server-side rendering and optimal performance. SailsJS powers the REST API backend with WebSocket support for real-time features. MongoDB stores user data and course content, while file uploads are managed through cloud storage with chunked upload support.",
    goals: [
      "Deliver a seamless live class experience with minimal latency",
      "Build an intuitive assignment and grading workflow for instructors",
      "Provide real-time analytics for administrators to track engagement",
      "Ensure mobile-responsive design across all devices and screen sizes",
    ],
    features: [
      {
        title: "Live Virtual Classes",
        description:
          "Integrated video conferencing for real-time teaching sessions with screen sharing and Q&A support.",
      },
      {
        title: "Assignment Management",
        description:
          "Create, submit, and grade assignments with file uploads, deadline tracking, and instant notifications.",
      },
      {
        title: "Real-time Chat",
        description:
          "Instant messaging between students and instructors with read receipts and rich emoji support.",
      },
      {
        title: "Progress Tracking",
        description:
          "Visual dashboards for tracking course completion percentages and individual grade averages.",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Admin insights on student engagement, attendance rates, and performance trends over time.",
      },
    ],
    highlights: [
      "Real-time video integration",
      "Multi-role authentication",
      "Assignment & grading system",
      "Interactive dashboards",
      "Mobile-responsive design",
      "PDF export support",
    ],
    challenges: [
      {
        title: "Real-time Synchronization",
        description:
          "Keeping all clients in sync during live sessions required careful WebSocket event handling and optimistic UI updates to prevent race conditions under high concurrency.",
      },
      {
        title: "Large File Uploads",
        description:
          "Assignment submissions with large files required chunked uploads, progress indicators, and resumable upload support to handle slow or interrupted connections gracefully.",
      },
      {
        title: "Role-based Access Control",
        description:
          "Implementing granular permissions for admin, instructor, and student roles across all API endpoints and UI components without duplicating authorization logic.",
      },
    ],
    learnings: [
      { title: "Real-time collaboration", description: "WebSocket-based live sync", icon: "zap" },
      { title: "State management", description: "Complex React Context patterns", icon: "layers" },
      { title: "File handling", description: "Cloud storage & chunked uploads", icon: "package" },
      { title: "Access control", description: "Role-based permission systems", icon: "shield" },
      {
        title: "Data visualization",
        description: "Dashboard charts & analytics",
        icon: "trending-up",
      },
    ],
    gallery: [
      "/projects/bluebird-project.png",
      "/projects/lind-project-2.png",
      "/projects/bluebird-project-2.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "ecommerce",
    title: "E-Commerce App",
    titleHighlight: "App",
    description:
      "Modern e-commerce platform with product filtering, cart, payment integration, and analytics dashboard.",
    category: "ecommerce",
    badge: "featured",
    isLive: true,
    mockupImage: "/projects/lind-project.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Tailwind CSS", "NodeJs", "MongoDB", "Strapi", "Zustand"],
    date: "January 20, 2024",
    readTime: 5,
    type: "Personal Project",
    role: "Frontend & Backend",
    duration: "4 Weeks",
    completion: "January 20, 2024",
    status: "Completed",
    fullDescription:
      "A modern e-commerce platform built with React and Strapi CMS. Customers can browse a filterable product catalog, manage their shopping cart, and complete secure purchases via Stripe. The admin dashboard provides sales analytics, order management, and inventory control through an intuitive CMS interface.",
    architecture:
      "React frontend with Zustand for global cart state management. Strapi CMS serves as the headless backend providing REST APIs for products, orders, and user management. MongoDB stores all application data with flexible schemas. Stripe handles payment processing with webhook support for order confirmation and inventory updates.",
    goals: [
      "Create an intuitive shopping experience with fast product discovery",
      "Implement secure and reliable payment processing with Stripe",
      "Build a content-manageable product catalog via headless CMS",
      "Provide actionable sales analytics for store owners in real time",
    ],
    features: [
      {
        title: "Product Catalog",
        description:
          "Filterable product grid with search, category filters, price range selection, and sort options.",
      },
      {
        title: "Shopping Cart",
        description:
          "Persistent cart with real-time updates, quantity management, and local storage fallback for guests.",
      },
      {
        title: "Payment Integration",
        description:
          "Stripe checkout with card validation, order confirmation emails, and webhook-based inventory sync.",
      },
      {
        title: "CMS Admin Panel",
        description:
          "Strapi-powered content management for products, categories, promotions, and media assets.",
      },
      {
        title: "Sales Analytics",
        description:
          "Revenue charts, best-selling products, and customer acquisition metrics for store owners.",
      },
    ],
    highlights: [
      "Full shopping cart flow",
      "Stripe payment gateway",
      "CMS-driven content",
      "Product search & filters",
      "Responsive mobile UI",
      "Order history tracking",
    ],
    challenges: [
      {
        title: "Cart State Persistence",
        description:
          "Maintaining cart state across page refreshes and user sessions required a hybrid approach using Zustand with serialized localStorage, handling edge cases on authentication changes.",
      },
      {
        title: "Stripe Webhook Security",
        description:
          "Validating webhook signatures and idempotently processing payment events to avoid duplicate order creation was critical for data integrity under retried webhook deliveries.",
      },
      {
        title: "Image Optimization",
        description:
          "Product images needed aggressive optimization strategies to maintain page performance while delivering high-quality visuals across all device sizes and network conditions.",
      },
    ],
    learnings: [
      { title: "Payment processing", description: "Stripe integration & webhooks", icon: "cpu" },
      { title: "State management", description: "Zustand for cart & global state", icon: "layers" },
      { title: "CMS integration", description: "Headless CMS API patterns", icon: "database" },
      { title: "Performance", description: "Image optimization techniques", icon: "trending-up" },
      { title: "Security", description: "Webhook validation & CORS", icon: "shield" },
    ],
    gallery: [
      "/projects/lind-project.png",
      "/projects/lind-project-4.png",
      "/projects/lind-project-5.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat",
    titleHighlight: "Chat",
    description:
      "Socket-based chat application with rooms, private messaging, and real-time notifications.",
    category: "realtime",
    badge: "recent",
    isLive: true,
    mockupImage: "/projects/bluebird-project-2.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "Svelte", "Express", "MongoDB", "SocketIO"],
    date: "May 12, 2024",
    readTime: 5,
    type: "Personal Project",
    role: "Frontend & Backend",
    duration: "3 Weeks",
    completion: "May 12, 2024",
    status: "Completed",
    fullDescription:
      "A real-time chat application that allows users to join chat rooms, send messages, and receive updates instantly using WebSocket. The system supports online user presence, private rooms with invite codes, and real-time notifications. Built with scalability and performance in mind, it delivers a seamless chat experience.",
    architecture:
      "React frontend for the main chat UI with Socket.io client for real-time communication. Express.js backend handles authentication, room management, and message persistence. MongoDB stores chat history and user profiles with indexed queries. Socket.io manages WebSocket connections with automatic fallback to long-polling for unreliable networks.",
    goals: [
      "Deliver instant message delivery with sub-100ms perceived latency",
      "Support multiple concurrent chat rooms with full isolation",
      "Show accurate online presence indicators and typing notifications",
      "Ensure messages persist and load efficiently on reconnection",
    ],
    features: [
      {
        title: "Real-time Messaging",
        description:
          "Instant message delivery using WebSocket protocol with optimistic UI updates and delivery confirmation.",
      },
      {
        title: "Private Rooms",
        description:
          "Create and join private chat rooms with shareable invite codes and room management controls.",
      },
      {
        title: "Online Presence",
        description:
          "Live user status indicators, online/offline tracking, and per-room typing notifications.",
      },
      {
        title: "Message Notifications",
        description:
          "Push notifications for new messages when the user is focused on a different room or tab.",
      },
      {
        title: "Dark Mode",
        description:
          "Full dark mode with smooth theme transitions and persistent user preference across sessions.",
      },
    ],
    highlights: [
      "Real-time messaging with WebSocket",
      "Private & group chat rooms",
      "Online users indicator",
      "Message notifications",
      "Responsive & modern UI",
      "Dark mode support",
    ],
    challenges: [
      {
        title: "Message Ordering",
        description:
          "Ensuring messages appear in the correct order under high concurrency required server-side timestamps and client-side sorting with deduplication logic to handle out-of-order delivery.",
      },
      {
        title: "Connection Recovery",
        description:
          "Handling reconnections gracefully — re-joining rooms, fetching missed messages, and restoring presence state — without disrupting other connected users.",
      },
      {
        title: "Typing Indicator Debouncing",
        description:
          "Broadcasting typing events efficiently without flooding the server required debounced emission and automatic timeout-based clearing on the client side.",
      },
    ],
    learnings: [
      { title: "Real-time communication", description: "WebSocket with Socket.io", icon: "zap" },
      { title: "State management", description: "Context API for chat state", icon: "layers" },
      { title: "Scalable backend", description: "Node.js & Express architecture", icon: "server" },
      { title: "Room management", description: "User presence & room logic", icon: "users" },
      { title: "Performance", description: "Message handling & debouncing", icon: "trending-up" },
    ],
    gallery: [
      "/projects/bluebird-project-2.png",
      "/projects/bluebird-project-3.png",
      "/projects/bluebird-project-4.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "travel",
    title: "Travel Booking",
    titleHighlight: "Booking",
    description:
      "Tour & vacation booking platform with payment integration and real-time availability.",
    category: "web",
    isLive: false,
    mockupImage: "/projects/lind-project-3.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
    date: "November 5, 2023",
    readTime: 4,
    type: "Personal Project",
    role: "Full Stack Developer",
    duration: "5 Weeks",
    completion: "November 5, 2023",
    status: "Completed",
    fullDescription:
      "A tour and vacation booking platform that lets users browse travel packages, check real-time seat availability, and book with Stripe payments. The platform features a curated package catalog, a date picker with live availability, booking confirmation emails, and an admin portal for managing tours and reservations.",
    architecture:
      "Next.js for server-side rendering with React Server Components for data fetching. PostgreSQL with Prisma ORM handles relational data for bookings, packages, and users. Stripe powers the payment flow with webhook handling for booking confirmation. Deployed on Vercel with edge functions for real-time availability checks.",
    goals: [
      "Make tour discovery fast and visually engaging for travelers",
      "Implement reliable real-time seat availability checking",
      "Provide a smooth and trustworthy booking checkout experience",
      "Build a manageable admin portal for tour operators",
    ],
    features: [
      {
        title: "Tour Catalog",
        description:
          "Curated package browsing with destination filters, price range, duration options, and rich photo galleries.",
      },
      {
        title: "Real-time Availability",
        description:
          "Live seat availability checker with date-picker integration and instant capacity feedback.",
      },
      {
        title: "Secure Booking",
        description:
          "Stripe-powered checkout with booking confirmation, itinerary email generation, and receipt download.",
      },
      {
        title: "Admin Portal",
        description:
          "Tour management, booking overview, capacity management, and reservation status control for operators.",
      },
      {
        title: "Responsive Design",
        description:
          "Mobile-first layout optimized for travelers browsing and booking on any device or screen size.",
      },
    ],
    highlights: [
      "Real-time availability checking",
      "Stripe payment integration",
      "Booking confirmation emails",
      "Admin management portal",
      "Mobile-first design",
      "Next.js SSR performance",
    ],
    challenges: [
      {
        title: "Availability Race Conditions",
        description:
          "Multiple users booking the same tour simultaneously required optimistic locking with database transactions to prevent overbooking under concurrent requests.",
      },
      {
        title: "Date Picker Complexity",
        description:
          "Building a date picker that reflects blocked dates, capacity limits, and price variations from the server in real time while minimizing unnecessary API calls.",
      },
    ],
    learnings: [
      { title: "Next.js SSR", description: "Server components & data fetching", icon: "globe" },
      {
        title: "Database design",
        description: "Relational data with Prisma ORM",
        icon: "database",
      },
      { title: "Payment flows", description: "Stripe checkout & webhooks", icon: "cpu" },
      { title: "Concurrency control", description: "Optimistic locking patterns", icon: "shield" },
      { title: "UX design", description: "Date pickers & availability UI", icon: "compass" },
    ],
    gallery: [
      "/projects/lind-project-3.png",
      "/projects/lind-project-6.png",
      "/projects/lind-project-7.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "property",
    title: "Property Portal",
    titleHighlight: "Portal",
    description:
      "Real estate listing site with map filtering, virtual tour preview and advanced search.",
    category: "web",
    isLive: false,
    mockupImage: "/projects/lind-project-5.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "TypeScript", "PostgreSQL", "MapLibre"],
    date: "September 15, 2023",
    readTime: 4,
    type: "Personal Project",
    role: "Frontend Developer",
    duration: "4 Weeks",
    completion: "September 15, 2023",
    status: "Completed",
    fullDescription:
      "A real estate listing portal that allows property seekers to search listings with advanced filters, explore properties on an interactive map, and take virtual tour previews. Agents can publish listings with rich media. The platform is built for performance with a TypeScript-first codebase and spatial database queries.",
    architecture:
      "React with TypeScript for a type-safe frontend codebase. MapLibre GL provides the interactive map with custom property markers and cluster rendering. PostgreSQL with PostGIS extension handles spatial queries for proximity search. A REST API serves listing data with spatial filtering built directly into optimized SQL queries.",
    goals: [
      "Enable fast and precise location-based property discovery on the map",
      "Create an immersive visual property browsing experience",
      "Deliver a type-safe, maintainable TypeScript codebase",
      "Support high-volume listing data without performance degradation",
    ],
    features: [
      {
        title: "Interactive Map",
        description:
          "MapLibre-powered map with property markers, cluster rendering, and viewport-based listing filtering.",
      },
      {
        title: "Advanced Search",
        description:
          "Multi-filter search by price, bedrooms, area, property type, and geographic proximity radius.",
      },
      {
        title: "Virtual Tour Preview",
        description:
          "360-degree virtual tour preview integration for immersive property viewing before scheduling visits.",
      },
      {
        title: "Agent Listings",
        description:
          "Agents can create and manage listings with photo galleries, floor plans, and detailed descriptions.",
      },
      {
        title: "Saved Properties",
        description:
          "Users can save favorite properties and receive notifications on price changes or availability updates.",
      },
    ],
    highlights: [
      "Interactive MapLibre integration",
      "Proximity-based search",
      "Virtual tour previews",
      "TypeScript-first codebase",
      "Spatial SQL queries",
      "Agent listing management",
    ],
    challenges: [
      {
        title: "Map Performance",
        description:
          "Rendering hundreds of property markers without lag required cluster rendering, viewport culling, and debounced map event handlers to prevent excessive re-renders.",
      },
      {
        title: "Spatial Queries",
        description:
          "Writing efficient PostGIS queries for radius-based and polygon-based property searches while maintaining query performance under increasing data volume.",
      },
    ],
    learnings: [
      { title: "Map integration", description: "MapLibre GL & spatial rendering", icon: "map" },
      { title: "TypeScript", description: "Type-safe React application patterns", icon: "code" },
      {
        title: "Spatial databases",
        description: "PostGIS for proximity queries",
        icon: "database",
      },
      {
        title: "Performance tuning",
        description: "Marker clustering & viewport culling",
        icon: "trending-up",
      },
      { title: "UX patterns", description: "Map + list dual view layouts", icon: "layers" },
    ],
    gallery: [
      "/projects/lind-project-5.png",
      "/projects/lind-project-8.png",
      "/projects/lind-project-9.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "analytics-dash",
    title: "Analytics Dashboard",
    titleHighlight: "Dashboard",
    description:
      "Multi-tenant analytics tool with real-time charts, export and collaborative workspaces.",
    category: "tools",
    isLive: false,
    mockupImage: "/projects/bluebird-project-3.png",
    liveUrl: "#",
    caseStudyUrl: "#",
    tech: ["React", "TypeScript", "Recharts", "Node.js"],
    date: "July 22, 2023",
    readTime: 5,
    type: "Personal Project",
    role: "Frontend Developer",
    duration: "3 Weeks",
    completion: "July 22, 2023",
    status: "Completed",
    fullDescription:
      "A multi-tenant analytics dashboard that lets teams track KPIs, visualize trends with interactive charts, and collaborate in shared workspaces. The platform supports real-time data refresh via Server-Sent Events, customizable chart widgets, CSV and PDF export, and role-based workspace access for team analytics.",
    architecture:
      "React with TypeScript frontend using Recharts for all chart rendering. A Node.js Express API handles data aggregation, workspace management, and export generation. Data is streamed via Server-Sent Events for real-time metric updates. Multi-tenancy is enforced at the API level with workspace-scoped JWT authentication.",
    goals: [
      "Deliver clear and actionable data visualizations for non-technical users",
      "Support real-time metric updates without requiring page refreshes",
      "Enable multi-user collaboration within isolated shared workspaces",
      "Provide flexible export options for reports and management presentations",
    ],
    features: [
      {
        title: "Interactive Charts",
        description:
          "Recharts-powered line, bar, pie, and area charts with tooltips, zoom, and time-range selection.",
      },
      {
        title: "Real-time Updates",
        description:
          "Server-Sent Events push live metric updates to all connected workspace members automatically.",
      },
      {
        title: "Custom Widgets",
        description:
          "Configurable widget placement for personalized dashboard layouts tailored to each team's KPIs.",
      },
      {
        title: "Data Export",
        description:
          "Export dashboards and datasets as CSV or PDF with customizable report templates and branding.",
      },
      {
        title: "Collaborative Workspaces",
        description:
          "Invite team members, set permissions, and share dashboard views across the entire workspace.",
      },
    ],
    highlights: [
      "Real-time metric streaming",
      "Interactive Recharts graphs",
      "CSV & PDF export",
      "Multi-tenant workspaces",
      "Customizable widgets",
      "Role-based access control",
    ],
    challenges: [
      {
        title: "Real-time Data Streaming",
        description:
          "Implementing Server-Sent Events with automatic reconnection, backpressure handling, and efficient event batching to minimize bandwidth under high-frequency metric updates.",
      },
      {
        title: "Chart Performance",
        description:
          "Rendering large datasets in Recharts without UI jank required data windowing, memoized selectors, and lazy chart initialization on scroll into view.",
      },
    ],
    learnings: [
      {
        title: "Data visualization",
        description: "Recharts & chart optimization",
        icon: "trending-up",
      },
      { title: "Real-time streaming", description: "Server-Sent Events patterns", icon: "zap" },
      { title: "Multi-tenancy", description: "Workspace isolation patterns", icon: "users" },
      { title: "TypeScript", description: "Advanced type patterns in React", icon: "code" },
      { title: "Export systems", description: "PDF & CSV generation", icon: "package" },
    ],
    gallery: [
      "/projects/bluebird-project-3.png",
      "/projects/bluebird-project-4.png",
      "/projects/bluebird-project-5.png",
    ],
    githubUrl: "#",
    downloadUrl: "#",
  },
];

// ─── V2 project data ──────────────────────────────────────────────────────────

export const PROJECTS_V2: ProjectV2[] = [
  {
    id: "hiazee",
    category: "ecommerce",
    badge: "featured",
    isLive: true,
    thumbnailImage: "/thumbnail-project/project-hiazee.png",
    titleHighlight: "AI-Powered Plant Marketplace",
    liveUrl: "#",
    githubUrl: "#",
    hero: {
      title: "Hiazee: AI-Powered Plant Marketplace",
      description:
        "Bridging the gap between nature and technology with intelligent plant identification and a seamless e-commerce experience.",
      subtitle:
        "Discover, identify, and shop for your favorite plants using advanced image recognition.",
    },
    projectOverview: {
      explanation:
        "Hiazee is a specialized e-commerce platform designed to help plant enthusiasts identify unknown species and purchase them directly. Developed as a capstone project for the Bangkit Academy program, it combines machine learning with a modern retail experience.",
      coreValue:
        "The application solves the common problem of discovering a beautiful plant but not knowing its name or where to buy it. By integrating AI-driven scanning, users can instantly get detailed information and local recommendations.",
      interestPoints:
        "What makes this project stand out is its modular architecture and the seamless integration of complex state management (Recoil) with server-side data fetching (React Query) to provide a smooth, app-like performance.",
    },
    keyFeatures: [
      {
        name: "AI Plant Identification",
        description:
          "Intelligent image recognition that identifies plant species from user uploads to provide instant botanical insights.",
      },
      {
        name: "Location-Based Recommendations",
        description:
          "Smart product suggestions tailored to the user's region, specifically optimized for the Indonesian climate and market.",
      },
      {
        name: "Modular E-commerce Core",
        description:
          "A robust shopping system featuring product exploration, detailed specifications, and a secure checkout flow.",
      },
      {
        name: "Responsive Multi-Surface UI",
        description:
          "A meticulously crafted interface that adapts dynamically to all device sizes using custom breakpoint logic.",
      },
    ],
    techStack: [
      {
        name: "Next.js 14",
        description: "Utilizing the App Router for optimized routing and server-side rendering.",
      },
      {
        name: "Recoil",
        description: "Handling complex global UI states with atom-based state management.",
      },
      {
        name: "TanStack Query",
        description: "Managing server state, caching, and synchronized data fetching.",
      },
      {
        name: "Tailwind CSS",
        description: "Implementing a custom design system with utility-first styling.",
      },
      {
        name: "NextAuth.js",
        description: "Secure authentication and session management for user transactions.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Feature-Sliced Modular Architecture",
        description:
          "Organized the codebase into self-contained modules, significantly improving maintainability and scalability.",
      },
      {
        point: "Advanced State Orchestration",
        description:
          "Successfully synchronized local UI state via Recoil with remote server state via React Query for a zero-latency feel.",
      },
      {
        point: "Optimized Image Delivery",
        description:
          "Implemented Next.js Image optimization and skeleton loaders to maintain high performance during data-heavy product loads.",
      },
      {
        point: "Type-Safe API Integration",
        description:
          "Enforced strict TypeScript interfaces across the entire data layer using Zod and custom Axios interceptors.",
      },
    ],
    challenges: [
      {
        title: "Responsive Layout Synchronization",
        description:
          "Managing complex grid layouts that required manual breakpoint detection for optimal column distribution across varied screen sizes.",
      },
      {
        title: "State Persistence & Security",
        description:
          "Integrating NextAuth with a custom backend while ensuring persistent sessions and secure API requests through Bearer token injection.",
      },
    ],
    whatILearned: [
      {
        topic: "Frontend Architecture",
        description:
          "Learned how to structure large-scale Next.js applications using a modular approach to prevent technical debt.",
      },
      {
        topic: "AI UX Patterns",
        description:
          "Gained experience in designing user flows that involve asynchronous AI processing without sacrificing user engagement.",
      },
      {
        topic: "Performance Optimization",
        description:
          "Mastered the use of server-side data fetching strategies to reduce initial bundle size and improve Core Web Vitals.",
      },
    ],
    projectInfo: {
      category: "E-commerce / AI Utility",
      role: "Fullstack Frontend Developer",
      duration: "4 Months",
      status: "Production Ready / Capstone Project",
    },
    highlights: [
      "AI-Integrated Shopping Flow",
      "Modern Modular UI Architecture",
      "Premium Responsive Design System",
      "Optimized Server State Management",
    ],
    galleryCaptions: [
      {
        screen: "Landing Page",
        caption:
          "Polished hero section featuring interactive swiper modules and the core AI-scanning proposition.",
      },
      {
        screen: "Product Discovery",
        caption: "Dynamic product grid with skeleton loading and localized recommendation engine.",
      },
      {
        screen: "Plant Identification",
        caption:
          "Seamless upload interface designed for instant AI feedback and botanical data retrieval.",
      },
    ],
    ctaContent: {
      livePreview: "Experience the intelligent plant marketplace in action.",
      sourceCode: "Explore the modular architecture and technical implementation on GitHub.",
    },
  },
];

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((p) => p.id === id);
}

export function getProjectV2(id: string): ProjectV2 | undefined {
  return PROJECTS_V2.find((p) => p.id === id);
}

export function projectToCard(p: Project): CardProject {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    badge: p.badge,
    isLive: p.isLive,
    thumbnailImage: p.mockupImage,
    liveUrl: p.liveUrl,
    tech: p.tech,
    version: "v1",
  };
}

export function projectV2ToCard(p: ProjectV2): CardProject {
  return {
    id: p.id,
    title: p.hero.title,
    description: p.hero.description,
    category: p.category,
    badge: p.badge,
    isLive: p.isLive,
    thumbnailImage: p.thumbnailImage,
    liveUrl: p.liveUrl,
    tech: p.techStack.map((t) => t.name),
    version: "v2",
  };
}

export function getAllCardProjects(): CardProject[] {
  return [...PROJECTS_V2.map(projectV2ToCard), ...PROJECTS.map(projectToCard)];
}

export const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "realtime", label: "Real-time Systems" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "tools", label: "Tools & Others" },
];
