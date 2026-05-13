export type ProjectCategory = "all" | "web" | "realtime" | "ecommerce" | "tools";
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

// â”€â”€â”€ V2 content interfaces (match JSON structure exactly) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  thumbnailImage: string;
  titleHighlight?: string;
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

// â”€â”€â”€ Normalized card type (used by ProjectCard, works for V1 and V2) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface CardProject {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  thumbnailImage: string;
  tech: string[];
  version: "v1" | "v2";
}

// â”€â”€â”€ Base project list (used by Projects page / cards) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€â”€ V2 project data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const PROJECTS_V2: ProjectV2[] = [
  {
    id: "hiazee",
    category: "ecommerce",
    thumbnailImage: "/thumbnail-project/project-hiazee.png",
    titleHighlight: "AI-Powered Plant Marketplace",
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
  {
    id: "sygma-studio",
    category: "tools",
    thumbnailImage: "/thumbnail-project/project-sygma-studio.png",
    titleHighlight: "AI Orchestration Platform",
    hero: {
      title: "Sygma Studio",
      description:
        "Enterprise-grade AI orchestration platform for managing omnichannel agents, RAG workflows, universal document extraction, and real-time voice intelligence.",
      subtitle:
        "Bridging the gap between raw LLM capabilities and production-ready business automation.",
    },
    projectOverview: {
      explanation:
        "Sygma Studio adalah pusat kendali operasional AI yang dirancang untuk mengelola ekosistem agen cerdas secara omnichannel. Platform ini mengintegrasikan pemrosesan dokumen tingkat lanjut (ICR), manajemen pengetahuan berbasis RAG, dan simulator komunikasi suara real-time dalam satu interface yang kohesif.",
      coreValue:
        "Platform ini melampaui standar chatbot biasa dengan menyediakan infrastruktur untuk integrasi WhatsApp Business, simulasi voice-to-voice Telerobotic, dan distribusi widget AI yang dapat di-embed ke aplikasi pihak ketiga, semuanya dikendalikan melalui sistem perizinan (RBAC) yang granular.",
      interestPoints:
        "What sets Sygma Studio apart is its zero-dependency embeddable widget architecture and real-time voice-to-voice AI simulatorâ€”solving complex enterprise AI delivery challenges within a single, cohesive platform.",
    },
    keyFeatures: [
      {
        name: "Universal ICR Document Extractor",
        description:
          "Sistem ekstraksi data cerdas yang mampu memproses tipe dokumen apapun (KTP, Invoice, KK, dll) melalui arsitektur skema rekursif yang memungkinkan definisi field dinamis sesuai kebutuhan bisnis.",
      },
      {
        name: "Omnichannel WhatsApp Integration",
        description:
          "Manajemen agen WhatsApp Business yang lengkap dengan editor template pesan interaktif (WYSIWYG), mendukung variabel dinamis, carousel, dan preview real-time.",
      },
      {
        name: "Telerobotic Voice-to-Voice Simulator",
        description:
          "Simulator komunikasi suara berbasis AI dengan latensi rendah untuk pengujian interaksi voice bot, lengkap dengan visualisasi event log dan pendeteksian penggunaan 'tools' oleh AI.",
      },
      {
        name: "Embeddable Chatbot Widget",
        description:
          "Widget AI ringan (Zero Dependencies) yang dapat di-embed ke website manapun menggunakan single-script bundling dengan teknologi CSS isolation (styled-components).",
      },
      {
        name: "Advanced RAG Ingestion & Chunking",
        description:
          "Mesin ingestsi data multi-sumber yang dilengkapi dengan visualisasi chunking dan simulator pencarian untuk memastikan relevansi data sebelum deployment.",
      },
      {
        name: "Enterprise Analytics & Monitoring",
        description:
          "Dashboard analitik multi-level untuk memantau performa agen, konsumsi token (cost tracking), dan efektivitas sesi chat dengan sinkronisasi URL-state.",
      },
    ],
    techStack: [
      {
        name: "React / TypeScript / Vite",
        description:
          "Modern frontend stack for building performant, type-safe enterprise interfaces.",
      },
      {
        name: "TanStack Query",
        description:
          "Server state management with aggressive caching and background synchronization.",
      },
      {
        name: "Tailwind CSS & Radix UI",
        description: "Utility-first design system with accessible, composable primitives.",
      },
      {
        name: "Framer Motion",
        description: "Production-ready animation library for fluid interface transitions.",
      },
      {
        name: "Socket.io-client",
        description: "Real-time bidirectional communication for voice and event log streaming.",
      },
      {
        name: "Web Audio API",
        description: "Low-latency audio processing for the Telerobotic voice simulator.",
      },
      {
        name: "Zod & React Hook Form",
        description: "Runtime schema validation and performant form management.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Recursive Schema & Dynamic UI Architect",
        description:
          "Membangun sistem form rekursif menggunakan Zod yang memungkinkan user mendefinisikan struktur JSON kompleks untuk ekstraksi data dokumen apa pun tanpa hard-coding.",
      },
      {
        point: "Zero-Dependency Widget Bundling",
        description:
          "Mengarsitekturi widget chatbot yang dibundel menjadi single IIFE script (widget.min.js) dengan CSS isolation untuk mencegah konflik styling pada website host.",
      },
      {
        point: "Low-Latency Audio Streaming",
        description:
          "Implementasi protokol sinkronisasi audio real-time melalui Socket.io untuk meminimalkan jitter dan lag pada interaksi voice-to-voice AI.",
      },
      {
        point: "Omnichannel Payload Management",
        description:
          "Mengelola sinkronisasi payload pesan yang kompleks antar channel (Web, WhatsApp, Telerobotic) dalam satu state management yang terpusat.",
      },
    ],
    challenges: [
      {
        title: "Universal Extraction Accuracy",
        description:
          "Menyediakan interface yang cukup fleksibel untuk mengekstrak tipe dokumen apapun namun tetap memberikan validasi data yang ketat melalui skema dinamis.",
      },
      {
        title: "Audio Synchronization in Real-time",
        description:
          "Mengatasi tantangan latensi dan buffer audio pada browser untuk menciptakan pengalaman komunikasi voice bot yang natural tanpa jeda yang mengganggu.",
      },
    ],
    whatILearned: [
      {
        topic: "Scaling Enterprise Frontends",
        description:
          "Pentingnya arsitektur berbasis modul dan permission system (RBAC) dalam mengelola aplikasi dengan ratusan rute dan puluhan fitur unik.",
      },
      {
        topic: "AI Interaction Design",
        description:
          "Mempelajari cara memvisualisasikan proses berpikir AI dan event log untuk meningkatkan kepercayaan pengguna dan memudahkan debugging operasional.",
      },
      {
        topic: "CSS Isolation & Script Embedding",
        description:
          "Teknik membungkus aplikasi React ke dalam single script yang aman untuk di-embed ke lingkungan website pihak ketiga yang tidak terprediksi.",
      },
    ],
    projectInfo: {
      category: "B2B AI Operations",
      role: "Frontend Architect / Lead Engineer",
      duration: "8 Months",
      status: "Production",
    },
    highlights: [
      "Universal Document Extraction with Recursive Schemas",
      "Omnichannel Agent Management (Web, WhatsApp, Telerobotic)",
      "Embeddable AI Widget with Zero-Dependency Bundling",
      "Low-latency Voice-to-Voice AI Simulator",
    ],
    galleryCaptions: [
      {
        screen: "Universal ICR Config",
        caption: "Membangun skema ekstraksi khusus untuk tipe dokumen apapun secara dinamis.",
      },
      {
        screen: "WhatsApp Template Builder",
        caption:
          "Editor pesan interaktif dengan preview real-time untuk channel WhatsApp Business.",
      },
      {
        screen: "Telerobotic Voice Lab",
        caption: "Interface simulator suara untuk menguji interaksi verbal agen AI.",
      },
      {
        screen: "Web App Configuration",
        caption: "Manajemen dan kustomisasi penuh untuk aplikasi web chatbot dan widget.",
      },
    ],
    ctaContent: {
      livePreview: "Jelajahi ekosistem Sygma Studio melalui demo produksi kami.",
      sourceCode: "Pelajari pola engineering dan arsitektur frontend modular kami di GitHub.",
    },
  },
  {
    id: "maxmar-evolution",
    category: "tools",
    thumbnailImage: "/thumbnail-project/project-maxmar.png",
    titleHighlight: "Aquaculture Analytics Engine",
    hero: {
      title: "Maxmar Evolution",
      description:
        "A high-performance architectural refactor of the Maxmar Aquaculture Platform, migrating from Vue 3 to a cutting-edge React 19 ecosystem to achieve superior scalability and analytical depth.",
      subtitle: "Transforming aquaculture data into a modular, AI-ready analytics engine.",
    },
    projectOverview: {
      explanation:
        "Maxmar Evolution is the result of a massive engineering effort to modernize the original aquaculture management system. This refactor transitions the platform from a traditional dashboard into a modular, feature-based analytical ecosystem designed for high-density monitoring and AI integration.",
      coreValue:
        "The project serves as the operational cockpit for industrial-scale shrimp farming, providing farmers with advanced tools like AI-driven fry counting and user-configurable analytics that drive real-time cultivation optimization.",
      interestPoints:
        "By migrating to Feature-Sliced Design (FSD) with React 19, the platform achieved a 40% improvement in maintainability and significantly reduced navigational latency through advanced render decoupling and server-state caching.",
    },
    keyFeatures: [
      {
        name: "AI Fry Counter (Penghitung Benur)",
        description:
          "A high-value specialized tool integrating Computer Vision to detect and count shrimp fry from images, reducing manual labor and improving stocking accuracy.",
      },
      {
        name: "Custom Chart Builder Engine",
        description:
          "An advanced analytics interface allowing users to dynamically configure parameters, aggregation types, and visualization styles (ApexCharts) to build personalized reports.",
      },
      {
        name: "React-Grid Dynamic Layout",
        description:
          "A highly flexible operational dashboard using react-grid-layout, enabling users to drag, resize, and persist their own monitoring workspace.",
      },
      {
        name: "Interactive Lab Ecosystem",
        description:
          "Comprehensive modules for scoring fry quality (Scoring Benur), PCR reporting, and biological water analysis with automated score calculation.",
      },
      {
        name: "Power-User Command Palette",
        description:
          "Integrated 'kbar' system for instant navigation and action execution, optimized for high-efficiency professional users.",
      },
    ],
    techStack: [
      {
        name: "React 19 & TypeScript 5",
        description:
          "Leveraging latest framework features and strict type safety for industrial-grade reliability.",
      },
      {
        name: "TanStack Query",
        description:
          "High-performance server-state management with background synchronization and caching.",
      },
      {
        name: "Tailwind CSS 4 & Shadcn",
        description: "Utility-first design system with Radix UI primitives for a premium UX.",
      },
      {
        name: "Recharts & ApexCharts",
        description:
          "Dual-engine charting system providing analytical views and complex custom visualizations.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Advanced Performance Orchestration",
        description:
          "Implemented virtualization and render decoupling strategies to handle 24+ high-density widgets without main-thread blocking.",
      },
      {
        point: "Modular Feature-Sliced Architecture",
        description:
          "Organized the codebase into domain-specific features, significantly reducing cross-module side effects and improving developer experience.",
      },
      {
        point: "Type-Safe Form & Validation Systems",
        description:
          "Used React Hook Form integrated with Zod to handle 4000+ line dynamic data entry views with complex business validation.",
      },
      {
        point: "AI/CV Integration Workflow",
        description:
          "Streamlined the process of image upload, processing, and visualization for the AI-based shrimp counter tool.",
      },
    ],
    challenges: [
      {
        title: "Architectural Paradigm Shift",
        description:
          "Translating complex Vue 3 reactive patterns and massive stores into React's declarative and functional paradigms.",
      },
      {
        title: "Scaling Dashboard Density",
        description:
          "Maintaining smooth 60FPS interactions while re-rendering complex grid layouts with multiple ApexCharts instances.",
      },
    ],
    whatILearned: [
      {
        topic: "Industrial-Scale Refactoring",
        description:
          "Mastering framework migration strategies and feature-sliced design for large-scale React applications.",
      },
      {
        topic: "Modular System Design",
        description:
          "Architecting modular, feature-based React systems for complex enterprise domains.",
      },
      {
        topic: "Performance Engineering",
        description:
          "Optimizing high-density data visualizations through advanced rendering techniques and virtualization.",
      },
    ],
    projectInfo: {
      category: "High-Performance Analytics / Agritech",
      role: "Lead Frontend Architect",
      duration: "Continuous Refinement",
      status: "Production-Ready / Refactor Complete",
    },
    highlights: [
      "React 19 & Tailwind 4 Modern Stack",
      "AI-Integrated Computer Vision Tools",
      "Custom Analytics & Chart Builder",
      "High-Performance Dynamic Dashboards",
      "Modular Feature-Sliced Design",
    ],
    galleryCaptions: [
      {
        screen: "Fry Counter Interface",
        caption: "AI-powered visualization tool for automated shrimp fry detection.",
      },
      {
        screen: "Chart Builder Panel",
        caption: "Configuration interface for building custom analytical reports.",
      },
      {
        screen: "Dynamic Grid Layout",
        caption: "User-configurable operational cockpit with persistent layout state.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the next generation of aquaculture management.",
      sourceCode: "Examine the modular React 19 architecture and feature-based design.",
    },
  },
  {
    id: "cakra-smart-search",
    category: "tools",
    thumbnailImage: "/thumbnail-project/project-smart-search.png",
    titleHighlight: "AI Banking Interface",
    hero: {
      title: "Cakra Smart Search",
      description:
        "AI-powered banking interface that transforms complex financial workflows into simple, conversational interactions.",
      subtitle: "Voice-activated fintech ecosystem built with React 19 and Vite.",
    },
    projectOverview: {
      explanation:
        "Cakra Smart Search is a next-generation mobile banking platform designed to eliminate navigational friction. It features an 'AI-first' UX where users can find features and initiate transactions using natural language and voice commands.",
      coreValue:
        "The application moves beyond traditional menu-diving by implementing an intent-based navigation system that automatically hydrates complex forms from user queries, making banking faster and more accessible.",
      interestPoints:
        "It combines advanced frontend state management with real-time voice processing to deliver a professional-grade fintech experience that feels both secure and intuitive.",
    },
    keyFeatures: [
      {
        name: "Voice-Activated Navigation",
        description:
          "Hands-free feature access using Web Speech API with automatic intent detection and route redirection.",
      },
      {
        name: "Context-Aware Form Hydration",
        description:
          "Smart hooks that automatically populate complex multi-field forms based on natural language search parameters.",
      },
      {
        name: "Secure Transaction Lifecycle",
        description:
          "Robust payment flow integrated with OTP/PIN validation components and dynamic success states for 40+ transaction types.",
      },
      {
        name: "Unified Search Context",
        description:
          "Global state-managed search provider that maintains query history, favorites, and real-time AI results across all routes.",
      },
    ],
    techStack: [
      {
        name: "React 19 & TypeScript",
        description:
          "Latest React features with strict type safety for professional banking interfaces.",
      },
      {
        name: "Vite & Tailwind CSS 4",
        description: "Ultra-fast development toolchain with next-generation utility-first styling.",
      },
      {
        name: "TanStack Query",
        description:
          "Granular state management and server state synchronization for complex banking flows.",
      },
      {
        name: "Radix UI & Shadcn",
        description:
          "Accessible UI primitives for consistent, premium mobile banking interactions.",
      },
      {
        name: "Web Speech API",
        description: "Voice recognition for hands-free navigation and intent detection.",
      },
      {
        name: "JavaScript Obfuscator",
        description: "Security-first build pipeline protecting sensitive banking logic.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Intent-Based Routing Architecture",
        description:
          "Implemented a semantic navigation layer that translates natural language into actionable deep-links.",
      },
      {
        point: "Data-Driven UI Patterns",
        description:
          "Developed a modular 'DetailTransaction' system capable of rendering unique success states for dozens of distinct financial services.",
      },
      {
        point: "Security-First Build Pipeline",
        description:
          "Integrated post-build obfuscation to protect sensitive banking logic and API communication patterns.",
      },
      {
        point: "Mobile-First UX Optimization",
        description:
          "Utilized Radix primitives and hardware-accelerated animations to ensure 60fps interactions on mobile devices.",
      },
    ],
    challenges: [
      {
        title: "Voice Interface Reliability",
        description:
          "Refining voice recognition logic to handle Indonesian language nuances and auto-navigating only on high-confidence matches.",
      },
      {
        title: "State Synchronization",
        description:
          "Managing complex transactional state transitions while ensuring the global search context remains responsive during heavy API mutations.",
      },
    ],
    whatILearned: [
      {
        topic: "AI-Driven Navigation",
        description:
          "Implementing AI-driven navigation patterns to improve user accessibility in complex software.",
      },
      {
        topic: "Context-Aware Form Hydration",
        description:
          "Advanced form management strategies using context-aware hydration and deep-linking.",
      },
      {
        topic: "Secure Fintech UX",
        description:
          "Building secure, production-ready fintech interfaces with modern React 19 features.",
      },
    ],
    projectInfo: {
      category: "Fintech / AI / SaaS",
      role: "Lead Frontend Engineer",
      duration: "2026",
      status: "Production Ready",
    },
    highlights: [
      "AI-Powered Intent Navigation",
      "Modern React 19 & Tailwind 4 Architecture",
      "Professional Banking Security Standards",
      "Context-Aware Voice Search Integration",
    ],
    galleryCaptions: [
      {
        screen: "AI Dashboard",
        caption: "Clean, mobile-first interface featuring the voice-activated Smart Search bar.",
      },
      {
        screen: "Transaction Confirmation",
        caption: "Secure PIN-entry system with real-time validation for financial safety.",
      },
      {
        screen: "Form Hydration",
        caption: "Application form pre-filled via an AI search intent for a seamless user journey.",
      },
    ],
    ctaContent: {
      livePreview: "Experience the future of conversational banking.",
      sourceCode: "Explore the AI-driven navigation architecture on GitHub.",
    },
  },
  {
    id: "lind-society",
    category: "ecommerce",
    thumbnailImage: "/thumbnail-project/project-lind.png",
    titleHighlight: "Property & Travel Marketplace",
    hero: {
      title: "Lind Society",
      description:
        "A premium property marketplace and tourism platform specializing in high-end real estate and curated travel experiences in Bali.",
      subtitle: "Discover, Stay, and Invest in the Island of Gods.",
    },
    projectOverview: {
      explanation:
        "Lind Society is a comprehensive multi-vertical platform that bridges the gap between luxury real estate investment and boutique travel experiences. It provides a unified interface for users to buy properties, book premium rentals, and discover curated local activities across Indonesia's most iconic destinations.",
      coreValue:
        "The application offers a high-performance, internationalized experience with a sophisticated triple-vertical search engine, allowing users to seamlessly transition between property acquisition and vacation planning within a single, cohesive ecosystem.",
      interestPoints:
        "What stands out is the technical execution of its complex search and filtering logic, which handles three distinct business domains (Sales, Rentals, and Tourism) with specialized UI components and category-driven color theming.",
    },
    keyFeatures: [
      {
        name: "Triple-Vertical Search Engine",
        description:
          "Custom-built search logic that orchestrates results across three distinct business areasâ€”Rentals, Sales, and Activitiesâ€”with debouncing and real-time suggestions.",
      },
      {
        name: "Advanced Filtering System",
        description:
          "High-precision UI components including custom price range selectors, enhanced date-range pickers, and multi-criteria filters for granular property discovery.",
      },
      {
        name: "Multi-Language Support (i18n)",
        description:
          "Full internationalization using next-intl, providing a localized experience for a global audience of investors and travelers.",
      },
      {
        name: "Category-Based Theming",
        description:
          "Dynamic visual identity system that color-codes interface elements (Blue for Rent, Green for Buy, Purple for Tourist) to improve user mental mapping.",
      },
    ],
    techStack: [
      {
        name: "Next.js 15 (App Router)",
        description:
          "Complex route grouping and layout management for multi-vertical applications.",
      },
      {
        name: "React 19 & TypeScript",
        description: "Cutting-edge React features with strict type safety across the entire app.",
      },
      {
        name: "Tailwind CSS & Framer Motion",
        description: "Design system with fluid animations for premium interactions.",
      },
      {
        name: "Radix UI & Embla Carousel",
        description: "Accessible, high-performance primitives for complex UI components.",
      },
      {
        name: "TanStack Query ",
        description: "Hybrid state management for server and UI state.",
      },
      {
        name: "React Hook Form & Zod",
        description: "Type-safe form management with runtime validation.",
      },
      {
        name: "NextAuth.js & Jose",
        description: "Secure authentication and JWT session management.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Feature Architecture",
        description:
          "Decoupled module-based structure (src/modules) that encapsulates business logic and UI for specific domains, ensuring high maintainability.",
      },
      {
        point: "Custom UI Design System",
        description:
          "A robust set of reusable primitives including complex search bars, draggable inputs, and synchronized sliders built from scratch.",
      },
      {
        point: "State-Driven Navigation",
        description:
          "Efficient handling of complex search parameters and filters via URL-synced state, enabling shareable and bookmarkable search results.",
      },
      {
        point: "Responsive Real-time UX",
        description:
          "Optimized mobile-first layouts with smooth transitions and loading states for a premium, application-like feel on all devices.",
      },
    ],
    challenges: [
      {
        title: "Cross-Vertical Logic Consolidation",
        description:
          "Synchronizing three different search schemas into a unified header interface while maintaining specific filtering requirements for each.",
      },
      {
        title: "Responsive Data-Heavy Forms",
        description:
          "Adapting complex property management and advanced search forms for seamless mobile usage without sacrificing functionality.",
      },
    ],
    whatILearned: [
      {
        topic: "Advanced App Router Orchestration",
        description:
          "Mastered complex route grouping and layout management in Next.js 15 for multi-vertical applications.",
      },
      {
        topic: "Scalable i18n Implementations",
        description:
          "Gained deep experience in managing multi-language content workflows across a variety of data types and UI components.",
      },
      {
        topic: "High-Performance Component Design",
        description:
          "Learned to build accessible, high-performance UI primitives using Radix UI while maintaining strict design consistency.",
      },
    ],
    projectInfo: {
      category: "Real Estate & Travel Marketplace",
      role: "Lead Frontend Engineer",
      duration: "4 Months",
      status: "Production Ready",
    },
    highlights: [
      "Sophisticated Triple-Vertical Search System",
      "Premium Bali-Focused Property Marketplace",
      "Full Multi-Language (i18n) Integration",
      "Advanced Custom UI & Filtering Components",
      "Modern Next.js 15 & React 19 Architecture",
    ],
    galleryCaptions: [
      {
        screen: "Landing Hero",
        caption: "Landing page with integrated triple-tab search system for seamless discovery.",
      },
      {
        screen: "Search Results",
        caption:
          "Dynamic search results page featuring color-coded categories and advanced filtering.",
      },
      {
        screen: "Property Management",
        caption: "Comprehensive management portal for property owners and investors.",
      },
      {
        screen: "Listing Detail",
        caption: "Elegant property detail view with rich media galleries and amenity insights.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the premium property marketplace and travel experience.",
      sourceCode: "View the modular Next.js 15 architecture and custom UI implementation.",
    },
  },
  {
    id: "genbi-upi",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-genbi.png",
    titleHighlight: "Organization CMS Platform",
    hero: {
      title: "GenBI UPI Organization Platform",
      description:
        "A high-performance CMS and interactive landing page built for the Generasi Baru Indonesia community at UPI.",
      subtitle:
        "Streamlining organization management and public communication with a custom-built digital ecosystem.",
    },
    projectOverview: {
      explanation:
        "This project is a comprehensive digital solution for GenBI UPI, combining a modern, SEO-optimized landing page with a robust administrative CMS. It serves as the central hub for managing scholarship awardees, organization news, events, and departmental data.",
      coreValue:
        "The platform replaces manual content updates with an automated, user-friendly management system, allowing organization leads to publish rich-text news, manage event schedules, and maintain a digital directory of awardees with ease.",
      interestPoints:
        "The technical highlight is a type-safe CMS workflow integrating Draft.js for rich text editing with TanStack Query for seamless data synchronization, balancing editorial freedom with architectural consistency.",
    },
    keyFeatures: [
      {
        name: "Rich Text CMS",
        description:
          "Integrated Draft.js-based editor allowing administrators to publish formatted content directly from the browser.",
      },
      {
        name: "Dynamic Data Management",
        description:
          "Comprehensive CRUD systems for awardees, departments, and events with automated server-side synchronization.",
      },
      {
        name: "Responsive Design",
        description:
          "A mobile-first frontend optimized for diverse devices, ensuring a premium experience for students and the public.",
      },
      {
        name: "Robust Form Handling",
        description:
          "Type-safe forms utilizing React Hook Form and Zod, with support for complex multi-part data and file uploads.",
      },
    ],
    techStack: [
      {
        name: "Next.js 14 (App Router)",
        description: "Full-stack framework for SSR, routing, and optimized asset delivery.",
      },
      {
        name: "TypeScript",
        description: "End-to-end type safety from API integration to form validation.",
      },
      {
        name: "Tailwind CSS & Radix UI",
        description: "Utility-first design with accessible component primitives.",
      },
      {
        name: "TanStack Query",
        description: "Hybrid state management for UI and server state across a multi-module panel.",
      },
      {
        name: "NextAuth.js",
        description: "Multi-role authentication and protected route management.",
      },
      {
        name: "React Hook Form & Zod",
        description: "Performant type-safe form handling with runtime validation.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Architecture",
        description:
          "Clean separation of concerns with dedicated feature modules for CMS and Landing Page logic.",
      },
      {
        point: "Advanced Data Fetching",
        description:
          "Implementation of TanStack Query for efficient caching, pagination, and optimistic UI updates.",
      },
      {
        point: "Type-Safe CMS Workflow",
        description:
          "End-to-end type safety from form validation to API integration, reducing runtime errors.",
      },
      {
        point: "Optimized Media Delivery",
        description:
          "Leveraging Next.js Image and Video components for high-performance asset loading.",
      },
    ],
    challenges: [
      {
        title: "Rich Text Integration",
        description:
          "Synchronizing Draft.js editor state with React Hook Form while maintaining clean HTML output for the public site.",
      },
      {
        title: "Complex State Management",
        description:
          "Balancing global UI state via Recoil and server-side data state via TanStack Query across a multi-module admin panel.",
      },
    ],
    whatILearned: [
      {
        topic: "CMS Architecture",
        description: "Building scalable CMS architectures with the Next.js App Router.",
      },
      {
        topic: "File Upload Workflows",
        description:
          "Implementing professional file upload workflows with automated form data conversion.",
      },
      {
        topic: "Multi-role Authentication",
        description: "Managing multi-role authentication and protected routes using NextAuth.js.",
      },
    ],
    projectInfo: {
      category: "Organization Management System",
      role: "Frontend / Full Stack Engineer",
      duration: "4 Months",
      status: "Production Ready",
    },
    highlights: [
      "Full-featured custom CMS dashboard",
      "Integrated Rich Text Editor (WYSIWYG)",
      "Responsive mobile-first Landing Page",
      "Type-safe form and state management",
    ],
    galleryCaptions: [
      {
        screen: "Landing Page",
        caption: "Interactive community showcase with dynamic data points.",
      },
      {
        screen: "Admin Dashboard",
        caption: "Centralized control for organization management.",
      },
      {
        screen: "News Management",
        caption: "Rich text editing interface for content creators.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the live GenBI UPI platform.",
      sourceCode: "View the technical implementation on GitHub.",
    },
  },
  {
    id: "kampus-gratis",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-kampus-gratis.png",
    titleHighlight: "Gamified EdTech LMS",
    hero: {
      title: "Kampus Gratis",
      description:
        "A comprehensive, gamified EdTech platform designed to provide accessible, high-quality education through a modern LMS experience.",
      subtitle: "Building a scalable learning ecosystem with Next.js 13 and Nx Monorepo.",
    },
    projectOverview: {
      explanation:
        "Kampus Gratis is a feature-rich Learning Management System (LMS) built to bridge the educational gap. It offers a structured learning environment where students can enroll in faculties, manage study plans, and track their academic performance through a gamified interface.",
      coreValue:
        "The project focuses on delivering a premium, high-performance user experience while maintaining a scalable codebase. By leveraging a monorepo architecture, it ensures consistency across student and admin platforms while providing interactive tools like real-time analytics and discussion hubs.",
      interestPoints:
        "The enterprise-grade Nx monorepo setup with shared libraries and an Atomic Design system allows multiple teams to work on different modules simultaneously without code duplication.",
    },
    keyFeatures: [
      {
        name: "Atomic Design System",
        description:
          "Implementation of a modular UI library based on Atomic Design principles (Atoms, Molecules, Organisms) for maximum reusability.",
      },
      {
        name: "Advanced Data Visualization",
        description:
          "Custom-styled analytical charts using Chart.js, featuring linear gradients and interactive tooltips for performance tracking.",
      },
      {
        name: "Gamification Engine",
        description:
          "Real-time leaderboard and point system integrated with student profiles to drive platform engagement.",
      },
      {
        name: "Dynamic LMS Workflows",
        description:
          "Complex state management for course progression, quiz attempts, and assignment submissions.",
      },
      {
        name: "Optimized Media Delivery",
        description:
          "Seamless integration of YouTube players and optimized image handling for a smooth learning experience.",
      },
    ],
    techStack: [
      {
        name: "Next.js 13 (App Router)",
        description: "Full-stack framework for SSR, routing, and optimized page rendering.",
      },
      {
        name: "Nx Monorepo",
        description:
          "Enterprise-grade build system for managing multiple apps and shared libraries.",
      },
      {
        name: "Tailwind CSS & Framer Motion",
        description: "Utility-first styling with smooth, physics-based animations.",
      },
      {
        name: "TanStack Query",
        description: "Hybrid state management for global UI and server data synchronization.",
      },
      {
        name: "Chart.js",
        description: "Advanced data visualization with custom gradients and interactive tooltips.",
      },
      {
        name: "React Hook Form & Zod",
        description: "Type-safe form handling with complex validation logic.",
      },
      {
        name: "NextAuth.js",
        description: "Secure session management and role-based authentication.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Scalable Monorepo Architecture",
        description:
          "Utilized Nx to manage multiple applications and shared libraries, ensuring efficient build times and code sharing.",
      },
      {
        point: "Hybrid State Management",
        description:
          "Combined Recoil for global UI state and TanStack Query for robust server-state synchronization and caching.",
      },
      {
        point: "Type-Safe API Integration",
        description:
          "Implemented a centralized service layer with custom hooks and TypeScript interfaces for reliable data fetching.",
      },
      {
        point: "Responsive UX Patterns",
        description:
          "Developed a mobile-first UI with smooth transitions using Framer Motion and optimized layouts via Tailwind CSS.",
      },
    ],
    challenges: [
      {
        title: "Dependency Orchestration",
        description:
          "Managing shared libraries and version consistency across different applications within the Nx workspace.",
      },
      {
        title: "Real-time Interaction Logic",
        description:
          "Synchronizing gamification points and discussion activities across complex, nested component structures.",
      },
    ],
    whatILearned: [
      {
        topic: "Next.js 13 App Router",
        description:
          "Deepened expertise in App Router patterns and server/client component optimization.",
      },
      {
        topic: "Monorepo Management",
        description:
          "Mastered large-scale monorepo management using Nx for enterprise-grade frontend development.",
      },
      {
        topic: "Gamification UX",
        description:
          "Enhanced skills in data visualization and gamification UX design for educational platforms.",
      },
    ],
    projectInfo: {
      category: "EdTech Platform",
      role: "Frontend Engineer",
      duration: "6 Months",
      status: "Production Ready",
    },
    highlights: [
      "Enterprise-grade Nx Monorepo setup",
      "Advanced performance analytics with Chart.js",
      "Gamified student engagement system",
      "Modular Atomic Design architecture",
      "Seamless Next.js 13 implementation",
    ],
    galleryCaptions: [
      {
        screen: "Student Dashboard",
        caption: "A comprehensive overview of study progress and academic goals.",
      },
      {
        screen: "Learning Module",
        caption: "Structured course content with integrated video and interactive sessions.",
      },
      {
        screen: "Performance Analytics",
        caption: "Visual tracking of academic trends and GPA performance.",
      },
      {
        screen: "Leaderboard",
        caption: "Competitive ranking system showcasing top-performing students.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the Kampus Gratis learning ecosystem in action.",
      sourceCode: "Review the scalable architecture and modular codebase on GitHub.",
    },
  },
  {
    id: "webcommerce",
    category: "ecommerce",
    thumbnailImage: "/thumbnail-project/project-bangunan-express.png",
    titleHighlight: "High-Performance E-commerce Engine",
    hero: {
      title: "Webcommerce",
      description:
        "A high-performance e-commerce engine built with Next.js 15 and React 19, featuring advanced catalog filtering and integrated logistics.",
      subtitle:
        "Seamless shopping experience with precision location services and internationalization.",
    },
    projectOverview: {
      explanation:
        "Webcommerce is a modern storefront designed to bridge the gap between complex inventory management and intuitive user experiences. It handles everything from dynamic product discovery to a precision-based checkout flow that integrates mapping services for accurate delivery logistics.",
      coreValue:
        "The project prioritizes performance and reliability, utilizing the latest React 19 features and a modular architecture to ensure a smooth, scalable, and fully localized shopping journey.",
      interestPoints:
        "The standout feature is a Leaflet-powered geo-logistics map picker that synchronizes three levels of location data in real-time, combined with URL-synced zero-latency product filtering.",
    },
    keyFeatures: [
      {
        name: "Advanced Search & Filtering",
        description:
          "Real-time URL-synced filtering system that handles categories, price ranges, and brands without page reloads.",
      },
      {
        name: "Geo-Logistics Integration",
        description:
          "Precision delivery point selection using Leaflet maps, ensuring accurate logistics data for order fulfillment.",
      },
      {
        name: "Multi-Language Support",
        description:
          "Full internationalization (i18n) implemented with Next-Intl for a globally accessible shopping experience.",
      },
      {
        name: "Responsive Order Workflow",
        description:
          "Adaptive checkout and payment interfaces that maintain high UX standards across mobile and desktop devices.",
      },
    ],
    techStack: [
      {
        name: "Next.js 15 (App Router)",
        description:
          "Latest Next.js with Turbopack for minimal build times and maximum runtime responsiveness.",
      },
      {
        name: "React 19 & TypeScript",
        description:
          "Cutting-edge React features with strict type safety for industrial-grade reliability.",
      },
      {
        name: "TanStack Query",
        description: "Server state management with background synchronization and caching.",
      },
      {
        name: "Zustand",
        description: "Lightweight state management for cart and UI state.",
      },
      {
        name: "Tailwind CSS & Radix UI",
        description: "Utility-first design system with accessible component primitives.",
      },
      {
        name: "Next-Intl & Leaflet",
        description: "Comprehensive i18n and map-based geo-logistics for delivery precision.",
      },
      {
        name: "React Hook Form & Zod",
        description: "Type-safe multi-step form management with complex validation.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Feature Architecture",
        description:
          "Logic organized into self-contained modules under src/modules, improving maintainability and separation of concerns.",
      },
      {
        point: "Hybrid State Management",
        description:
          "Strategic use of TanStack Query for server state and URL-based state for navigation and filtering persistence.",
      },
      {
        point: "Cutting-Edge Performance",
        description:
          "Early adoption of Next.js 15 and Turbopack to minimize build times and maximize runtime responsiveness.",
      },
      {
        point: "Type-Safe External Integrations",
        description:
          "Strict Zod validation layers for API responses and complex form data, especially in the checkout logistics.",
      },
    ],
    challenges: [
      {
        title: "Dependent Location Logic",
        description:
          "Synchronizing three levels of location data (Province, City, Subdistrict) with real-time API fetches while maintaining form integrity.",
      },
      {
        title: "State Synchronization",
        description:
          "Managing complex cart and wishlist states across multiple sessions and page transitions using a mix of Recoil and TanStack Query.",
      },
    ],
    whatILearned: [
      {
        topic: "Zero-Latency Filtering",
        description:
          "Implementing URL state management combined with optimistic UI updates for instant product filtering.",
      },
      {
        topic: "Multi-Step Form Design",
        description:
          "Designing robust multi-step forms that balance complex validation requirements with a user-friendly mobile interface.",
      },
    ],
    projectInfo: {
      category: "E-Commerce / Fintech",
      role: "Fullstack Developer",
      duration: "4 Months",
      status: "Production Ready",
    },
    highlights: [
      "Next.js 15 & React 19 Stack",
      "Advanced Geo-Logistics Mapping",
      "Full i18n Localization",
      "Modular Scalable Architecture",
    ],
    galleryCaptions: [
      {
        screen: "Dynamic Catalog",
        caption: "Multi-filter sidebar and responsive product grid.",
      },
      {
        screen: "Precision Checkout",
        caption: "Integrated map picker for accurate delivery points.",
      },
      {
        screen: "Mobile UX",
        caption: "Optimized filtering and navigation for handheld devices.",
      },
    ],
    ctaContent: {
      livePreview: "Experience the high-performance storefront live.",
      sourceCode: "Explore the modular architecture and React 19 implementation.",
    },
  },
  {
    id: "asia-money",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-honey-bonney.png",
    titleHighlight: "Financial Ecosystem",
    hero: {
      title: "Asia Money Portal",
      description: "A high-fidelity financial ecosystem designed for the modern investor.",
      subtitle: "Premium engineering meets sophisticated design for a seamless market experience.",
    },
    projectOverview: {
      explanation:
        "Asia Money is a premium financial news and community landing page built to showcase complex UI engineering and modern web performance. The project features a sophisticated dark-themed design tailored for a high-end market experience.",
      coreValue:
        "By leveraging Next.js 15 and React 19, the application demonstrates how to build visually rich, responsive, and internationalized web interfaces that maintain high performance while delivering a luxury aesthetic.",
      interestPoints:
        "The standout engineering challenge was implementing complex glassmorphic CSS gradients and border-image patterns for a premium visual identity while maintaining smooth performance across browsers.",
    },
    keyFeatures: [
      {
        name: "Premium Glassmorphic UI",
        description:
          "Custom-engineered CSS gradients and shadows creating a luxurious, immersive financial dashboard aesthetic.",
      },
      {
        name: "Dynamic Responsive Grids",
        description:
          "A sophisticated grid system that fluidly adapts from high-density desktop views to touch-optimized mobile layouts.",
      },
      {
        name: "Internationalization Engine",
        description:
          "Seamless multi-language support integrated from the ground up using next-intl for global scalability.",
      },
      {
        name: "Interactive Market Widgets",
        description:
          "Custom-built carousels and news tickers using Radix UI and Embla for smooth data exploration.",
      },
    ],
    techStack: [
      {
        name: "Next.js 15",
        description: "Latest Next.js for optimized rendering and development efficiency.",
      },
      {
        name: "React 19 & TypeScript",
        description:
          "Cutting-edge React features with type-safe development for maintainable code.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for rapid, consistent UI implementation.",
      },
      {
        name: "Framer Motion",
        description: "Smooth, physics-based animations for premium UI interactions.",
      },
      {
        name: "next-intl",
        description: "Comprehensive internationalization for a global audience.",
      },
      {
        name: "Radix UI & Embla Carousel",
        description: "Accessible primitives and smooth carousels for market widgets.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Advanced CSS Engineering",
        description:
          "Implementation of complex linear gradients and border-image patterns for a premium visual identity.",
      },
      {
        point: "Mobile-First Interaction Design",
        description:
          "Custom-built responsive drawers and sheet-based navigation for a high-end mobile experience.",
      },
      {
        point: "Modular Architecture",
        description:
          "Decoupled module-based structure for managing multiple landing page versions and scalable UI components.",
      },
    ],
    challenges: [
      {
        title: "Aesthetic Balance",
        description:
          "Balancing high-density financial information with a clean, luxury aesthetic without compromising readability.",
      },
      {
        title: "CSS Performance",
        description:
          "Implementing complex gradient borders and backgrounds while maintaining smooth performance across browsers.",
      },
    ],
    whatILearned: [
      {
        topic: "Premium UI Techniques",
        description:
          "Mastered advanced CSS techniques for creating high-end UI aesthetics beyond standard utility classes.",
      },
      {
        topic: "Next.js 15 Patterns",
        description:
          "Leveraged the latest Next.js 15 features for optimized rendering and development efficiency.",
      },
    ],
    projectInfo: {
      category: "Fintech / Landing Page",
      role: "Frontend Engineer",
      duration: "2 Weeks",
      status: "Production Ready",
    },
    highlights: [
      "Premium Luxury Financial UI",
      "Next.js 15 / React 19 Architecture",
      "10-Column Responsive Grid System",
      "Seamless i18n Integration",
    ],
    galleryCaptions: [
      {
        screen: "Dashboard Overview",
        caption: "High-density financial article grid with premium dark-mode styling.",
      },
      {
        screen: "Mobile Navigation",
        caption: "Intuitive touch-optimized drawer for seamless localized navigation.",
      },
      {
        screen: "Market Widgets",
        caption: "Responsive stock and crypto carousels for quick market scanning.",
      },
    ],
    ctaContent: {
      livePreview: "Experience the premium financial portal interface.",
      sourceCode: "Explore the Next.js 15 modular architecture.",
    },
  },
  {
    id: "golden-lamian",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-bangunan-express.png",
    titleHighlight: "F&B Commercial Landing Page",
    hero: {
      title: "Golden Lamian Official",
      description:
        "A high-performance commercial landing page for Indonesia's leading noodle restaurant chain.",
      subtitle: "Built with Next.js 14 and optimized for conversion and scalability.",
    },
    projectOverview: {
      explanation:
        "Golden Lamian is a modern web application designed to serve as the primary digital touchpoint for a major F&B brand. It focuses on driving customer engagement through promotional showcases and a streamlined 'Big Order' booking system.",
      coreValue:
        "The project demonstrates a clean, modular frontend architecture that balances rich visual content with technical performance, including PWA support and optimized asset delivery.",
      interestPoints:
        "A key engineering achievement is the WhatsApp deep-link lead generation system that dynamically converts web form data into formatted business inquiry messagesâ€”bridging digital and physical brand touchpoints.",
    },
    keyFeatures: [
      {
        name: "WhatsApp Integration",
        description:
          "Seamless lead generation flow that converts web forms into formatted WhatsApp business inquiries.",
      },
      {
        name: "Optimized Asset Loading",
        description:
          "Implementation of Plaiceholder for low-quality image placeholders (LQIP) to enhance perceived performance.",
      },
      {
        name: "Responsive Carousels",
        description:
          "Highly customized Swiper.js integration for smooth, touch-optimized product browsing.",
      },
      {
        name: "PWA Readiness",
        description:
          "Configured for progressive web app capabilities, ensuring a native-like experience on mobile devices.",
      },
    ],
    techStack: [
      {
        name: "Next.js 14 (App Router)",
        description: "Full-stack React framework for optimized routing and server-side rendering.",
      },
      {
        name: "TypeScript",
        description: "Type-safe development for reliable, maintainable codebases.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for rapid, consistent UI implementation.",
      },
      {
        name: "Plaiceholder & Sharp",
        description: "Server-side image processing for LQIP and optimized asset delivery.",
      },
      {
        name: "Next-PWA",
        description: "Progressive Web App capabilities for native-like mobile experience.",
      },
      {
        name: "Swiper.js",
        description: "Touch-optimized carousel for smooth product browsing.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Module Architecture",
        description:
          "Organized into feature-based modules (landing-page, kemitraan) for better maintainability and code splitting.",
      },
      {
        point: "Perceived Performance Optimization",
        description:
          "Utilized server-side blurring techniques for images to eliminate layout shifts and improve UX.",
      },
      {
        point: "Lead Conversion Logic",
        description:
          "Engineered a client-side form processing system that dynamically generates localized WhatsApp deep links.",
      },
    ],
    challenges: [
      {
        title: "Asset Optimization",
        description:
          "Balancing high-quality restaurant imagery with fast mobile load times using Next.js Image and automated placeholders.",
      },
      {
        title: "Responsive Flexibility",
        description:
          "Ensuring complex promotional layouts remain visually consistent across a wide range of mobile and desktop viewports.",
      },
    ],
    whatILearned: [
      {
        topic: "Next.js 14 App Router",
        description:
          "Mastered App Router patterns for commercial landing pages with focus on performance.",
      },
      {
        topic: "Image Optimization",
        description:
          "Implemented advanced image optimization techniques using Plaiceholder for LQIP delivery.",
      },
      {
        topic: "Mobile-First UI",
        description:
          "Refined mobile-first UI development using Tailwind CSS for a professional F&B brand.",
      },
    ],
    projectInfo: {
      category: "Commercial Landing Page",
      role: "Frontend Engineer",
      duration: "2 Weeks",
      status: "Production Ready",
    },
    highlights: [
      "Next.js 14 App Router implementation",
      "Optimized image delivery system",
      "Mobile-first responsive design",
      "Integrated WhatsApp lead generation",
    ],
    galleryCaptions: [
      {
        screen: "Main Hero Section",
        caption: "Visually rich entry point with optimized priority loading for key brand assets.",
      },
      {
        screen: "Partnership Form",
        caption: "Custom lead capture system integrated with business communication workflows.",
      },
      {
        screen: "Product Showcase",
        caption: "Responsive Swiper.js carousel featuring the signature 'Golden' menu items.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the Golden Lamian digital experience.",
      sourceCode: "Review the modular Next.js architecture on GitHub.",
    },
  },
  {
    id: "zora-bsd",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-the-zora.png",
    titleHighlight: "Luxury Property Landing Page",
    hero: {
      title: "The Zora BSD City",
      description:
        "A premium luxury residential landing page featuring high-end architectural design and interactive unit exploration.",
      subtitle: "Japanese-inspired luxury living in the heart of BSD City.",
    },
    projectOverview: {
      explanation:
        "The Zora BSD is a high-conversion landing page designed for a luxury residential development. It showcases premium housing clusters with a focus on Japanese-inspired architecture and modern smart home features.",
      coreValue:
        "The project delivers a high-end digital experience that mirrors the luxury of the physical property, utilizing interactive galleries and detailed unit specifications to drive user engagement and lead generation.",
      interestPoints:
        "The technical highlight is a Framer Motion-powered interactive unit gallery with spring-based animations supporting both desktop click navigation and mobile touch gestures, combined with data-driven content via JSON stores.",
    },
    keyFeatures: [
      {
        name: "Interactive Unit Gallery",
        description:
          "Smooth, swipeable image galleries built with Framer Motion, supporting touch gestures and spring-based animations.",
      },
      {
        name: "Data-Driven Architecture",
        description:
          "Decoupled content management using a central JSON store, allowing for easy updates to property details without code changes.",
      },
      {
        name: "Dynamic Specification Modals",
        description:
          "Detailed technical specification views for each unit type, including foundation, materials, and smart home features.",
      },
      {
        name: "Responsive Design System",
        description:
          "A mobile-first layout optimized for high-performance lead conversion across all device types.",
      },
    ],
    techStack: [
      {
        name: "Next.js 14 (App Router)",
        description: "Full-stack framework for optimized routing and server-side rendering.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for rapid, consistent UI implementation.",
      },
      {
        name: "Framer Motion",
        description: "Professional-grade interactive galleries with spring physics animations.",
      },
      {
        name: "Radix UI / shadcn",
        description: "Accessible component primitives for consistent, premium UI elements.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Feature Architecture",
        description:
          "Organized using a module-based structure that keeps section logic encapsulated and maintainable.",
      },
      {
        point: "Optimized Media Loading",
        description:
          "Leverages Next.js Image optimization and WebP formats to ensure fast page loads despite high-resolution imagery.",
      },
      {
        point: "Clean State Orchestration",
        description:
          "Utilizes Recoil for lightweight global state management, specifically for handling cross-component interaction like contact modals.",
      },
    ],
    challenges: [
      {
        title: "Interactive Gallery Performance",
        description:
          "Implementing a performant and smooth image gallery that supports both desktop click navigation and mobile touch gestures using Framer Motion.",
      },
      {
        title: "Complex Unit Data Presentation",
        description:
          "Managing complex unit data and technical specifications while keeping the UI clean and readable.",
      },
    ],
    whatILearned: [
      {
        topic: "Advanced Framer Motion",
        description:
          "Advanced patterns for creating professional-grade interactive galleries with spring physics.",
      },
      {
        topic: "Content-Driven Architecture",
        description:
          "Effective content-driven UI architecture using JSON stores in Next.js applications.",
      },
      {
        topic: "Luxury Brand UX",
        description:
          "Optimizing user experience for luxury brands where visual fidelity and performance are equally critical.",
      },
    ],
    projectInfo: {
      category: "Real Estate / Landing Page",
      role: "Frontend Engineer",
      duration: "4 Weeks",
      status: "Completed",
    },
    highlights: [
      "Interactive Property Showcase",
      "Framer Motion Powered UX",
      "Modular Next.js Architecture",
      "High-Conversion Mobile Design",
    ],
    galleryCaptions: [
      {
        screen: "Hero Section",
        caption: "High-impact property branding and key value propositions.",
      },
      {
        screen: "Unit Explorer",
        caption: "Animated image transitions and technical detail modals.",
      },
      {
        screen: "Location Section",
        caption: "Responsive location section with integrated map and facility highlights.",
      },
    ],
    ctaContent: {
      livePreview: "Experience the luxury of The Zora BSD through this interactive landing page.",
      sourceCode: "Explore the modular Next.js architecture and Framer Motion implementations.",
    },
  },
  {
    id: "upi-opac",
    category: "tools",
    thumbnailImage: "/thumbnail-project/project-opac-upi.png",
    titleHighlight: "Academic Resource Discovery",
    hero: {
      title: "UPI Online Public Access Catalog",
      description:
        "A modern academic resource discovery platform for Universitas Pendidikan Indonesia, streamlining access to library collections with real-time tracking.",
      subtitle:
        "Modernizing academic discovery through robust search and real-time resource management.",
    },
    projectOverview: {
      explanation:
        "This project is a high-performance Online Public Access Catalog (OPAC) developed for Universitas Pendidikan Indonesia (UPI). It serves as the primary interface for students and faculty to discover, filter, and track the availability of academic resources across the university's library system.",
      coreValue:
        "By replacing legacy catalog systems with a responsive, search-optimized web application, it significantly improves the research efficiency for the academic community.",
      interestPoints:
        "The application features a sophisticated dual-search system (Basic & Advanced) integrated with real-time physical copy status tracking and intelligent resource recommendationsâ€”a significant usability improvement over legacy library systems.",
    },
    keyFeatures: [
      {
        name: "Advanced Multi-Criteria Search",
        description:
          "Sophisticated filtering system using Redux state to manage complex queries across authors, subjects, publishers, and years.",
      },
      {
        name: "Real-time Copy Tracking",
        description:
          "Direct integration with library inventory to show the status, barcode, and return dates of physical copies.",
      },
      {
        name: "Intelligent Recommendations",
        description:
          "Context-aware suggestion system that helps users find related academic materials based on current resource viewing.",
      },
      {
        name: "Localized Data Translation Layer",
        description:
          "Custom helper architecture that transforms backend technical keys into human-readable Indonesian bibliographic labels.",
      },
      {
        name: "SEO & Meta Management",
        description:
          "Dynamic metadata handling via React Helmet Async to ensure academic resources are properly indexed and discoverable.",
      },
    ],
    techStack: [
      {
        name: "React 18 & Vite",
        description: "Fast, modern development setup for high-performance academic interfaces.",
      },
      {
        name: "Redux Toolkit",
        description: "Centralized state management for complex search queries and filter state.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for responsive, academic-grade UI design.",
      },
      {
        name: "Headless UI & Radix UI",
        description: "Accessible UI primitives for modals, dropdowns, and search components.",
      },
      {
        name: "Axios & React Router v6",
        description: "HTTP client and client-side routing for seamless navigation.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Feature Architecture",
        description:
          "Clean separation of concerns with feature-based slices (Search, Detail) for scalable state management.",
      },
      {
        point: "Centralized Data Transformation",
        description:
          "Robust helper layer for date formatting, metadata translation, and complex advanced search string construction.",
      },
      {
        point: "Async State Lifecycle Management",
        description:
          "Efficient handling of multiple asynchronous API dependencies (Collections, Materials, Publishers) using Redux Thunks.",
      },
      {
        point: "Context-Based Alert System",
        description:
          "Customized global notification system using React Context and Radix UI for consistent user feedback.",
      },
    ],
    challenges: [
      {
        title: "Complex Bibliographic Data Mapping",
        description:
          "Translating diverse backend bibliographic structures into a consistent, readable frontend presentation while maintaining performance.",
      },
      {
        title: "Multi-Parameter Search State",
        description:
          "Managing the synchronization between complex UI filter forms, URL search parameters, and Redux state.",
      },
    ],
    whatILearned: [
      {
        topic: "Academic UX Design",
        description:
          "Learned to prioritize data density and search precision for users in a research-intensive environment.",
      },
      {
        topic: "State-Driven UI Persistence",
        description:
          "Gained experience in synchronizing complex application state with URL parameters to support shareable search results.",
      },
    ],
    projectInfo: {
      category: "Academic Tool / Information System",
      role: "Frontend Engineer",
      duration: "Professional Project",
      status: "Production Ready",
    },
    highlights: [
      "Comprehensive academic search engine",
      "Real-time resource availability tracking",
      "Modular Redux Toolkit architecture",
      "Clean, responsive Tailwind UI",
      "SEO-optimized for resource discovery",
    ],
    galleryCaptions: [
      {
        screen: "Home Interface",
        caption: "Minimalist search-centric landing page designed for speed.",
      },
      {
        screen: "Resource Detail View",
        caption:
          "Detailed bibliographic view with physical copy tracking and smart recommendations.",
      },
      {
        screen: "Advanced Search Modal",
        caption: "Multi-criteria search system with real-time metadata filtering.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the UPI Library collections via the live OPAC interface.",
      sourceCode: "Review the clean, modular React architecture on GitHub.",
    },
  },
  {
    id: "taxpartner",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-pajak.png",
    titleHighlight: "Tax Consultation Platform",
    hero: {
      title: "TaxPartner",
      description:
        "A streamlined tax consultation management platform connecting individuals with professional tax experts.",
      subtitle:
        "Simplifying tax compliance through expert-led digital consultations and robust management tools.",
    },
    projectOverview: {
      explanation:
        "TaxPartner is a specialized service platform designed to bridge the gap between tax consultants and clients. It provides a comprehensive ecosystem for requesting consultations, managing task lifecycles, and overseeing user operations through a dedicated administrative interface.",
      coreValue:
        "The application eliminates the friction of traditional tax consulting by centralizing communication and task tracking, ensuring both consultants and clients have a clear view of their consultation progress and history.",
      interestPoints:
        "The HATEOAS API integration approach enables a clean frontend implementation where resource discovery is dynamic, reducing hard-coded API paths and improving adaptability to backend changes.",
    },
    keyFeatures: [
      {
        name: "Lifecycle Task Tracking",
        description:
          "End-to-end management of consultation states from initial request to 'ongoing' and 'completed' statuses.",
      },
      {
        name: "Role-Based Access Control",
        description:
          "Secure multi-role authentication system that intelligently routes users based on administrative or customer permissions.",
      },
      {
        name: "Data-Driven Dashboard",
        description:
          "Visualized metrics and statistics to provide administrators with immediate insights into platform health.",
      },
      {
        name: "HATEOAS API Integration",
        description:
          "Clean frontend implementation that leverages hypermedia links from the backend for dynamic resource discovery.",
      },
    ],
    techStack: [
      {
        name: "Next.js 13 (Pages Router)",
        description: "Full-stack framework for server-side rendering and API routes.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for rapid, professional UI development.",
      },
      {
        name: "React Context API",
        description: "Lightweight global state for auth and consultation data management.",
      },
      {
        name: "Headless UI & Radix UI",
        description: "Accessible UI primitives for modals, tables, and form components.",
      },
      {
        name: "React Hook Form",
        description: "Performant form management for consultation booking and admin workflows.",
      },
      {
        name: "Axios with Cookie Auth",
        description:
          "HTTP client with cookie-based session persistence and secure API communication.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Context Architecture",
        description:
          "Separated Auth and Consultation contexts to ensure clean state boundaries and optimized component re-rendering.",
      },
      {
        point: "Persistent Session Management",
        description:
          "Implemented secure token persistence using cookies combined with role-based redirection logic.",
      },
      {
        point: "Component-Driven UI",
        description:
          "Built a reusable system of layout and table components to maintain consistency across the administrative and public interfaces.",
      },
    ],
    challenges: [
      {
        title: "State Lifecycle Management",
        description:
          "Synchronizing consultation statuses across multiple views while ensuring the UI reflects real-time API changes.",
      },
      {
        title: "Responsive Admin Layouts",
        description:
          "Designing a complex data-heavy dashboard that remains functional and readable across mobile and desktop breakpoints.",
      },
    ],
    whatILearned: [
      {
        topic: "React Context Patterns",
        description:
          "Effective use of React Context for global state management in medium-scale applications.",
      },
      {
        topic: "Secure Authentication Flows",
        description:
          "Implementing secure frontend authentication flows with role-based navigation guards.",
      },
      {
        topic: "Enterprise Dashboard Design",
        description:
          "Leveraging Tailwind CSS for building professional, enterprise-grade administrative dashboards.",
      },
    ],
    projectInfo: {
      category: "Consulting & Fintech",
      role: "Frontend Developer",
      duration: "4 Months",
      status: "Production Ready",
    },
    highlights: [
      "Enterprise-ready administrative dashboard",
      "Seamless role-based authentication flow",
      "Full consultation lifecycle management",
      "Responsive and accessible UI/UX design",
    ],
    galleryCaptions: [
      {
        screen: "Admin Dashboard",
        caption: "Administrative dashboard providing a bird's-eye view of platform metrics.",
      },
      {
        screen: "Consultation Manager",
        caption: "Consultation task manager with advanced filtering and status tracking.",
      },
      {
        screen: "Landing Page",
        caption: "Professional landing page designed to convert users into consultation clients.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the tax consultation ecosystem.",
      sourceCode: "Review the clean, modular Next.js architecture.",
    },
  },
  {
    id: "personal-portfolio-v1",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-personal-website-1.png",
    titleHighlight: "Portfolio v1 — Foundations",
    hero: {
      title: "Personal Portfolio v1",
      description: "Computer Science Student & Freelance Web Developer based in Bandung.",
      subtitle: "Building modern, responsive, and user-centric web applications with precision.",
    },
    projectOverview: {
      explanation:
        "The first iteration of my personal portfolio — a professional showcase built to centralize a diverse range of web and mobile development work. It serves as a digital resume and project hub for a computer science student and freelancer.",
      coreValue:
        "The application prioritizes a clean, modular architecture and a high-quality user experience, demonstrating proficiency in modern frontend technologies like React and Tailwind CSS.",
      interestPoints:
        "What makes v1 stand out is its data-driven content system and a custom-engineered responsive timeline that holds up cleanly across screen sizes — built before adopting heavier frameworks.",
    },
    keyFeatures: [
      {
        name: "Dynamic Project Showcase",
        description:
          "Data-driven project gallery that renders a professional portfolio from structured JSON configurations.",
      },
      {
        name: "Responsive Professional Timeline",
        description:
          "Custom-engineered vertical timeline for education and experience, optimized for all screen sizes.",
      },
      {
        name: "Visual Skill Matrix",
        description:
          "Themed representation of technical competencies using iconic branding and polished UI patterns.",
      },
      {
        name: "Interactive Brand Identity",
        description:
          "Consistent design system utilizing Tailwind CSS for a premium, mobile-first professional appearance.",
      },
    ],
    techStack: [
      {
        name: "React",
        description: "Component-driven UI library powering the entire portfolio experience.",
      },
      {
        name: "TypeScript",
        description: "Strict type safety across components, props, and content data layers.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for a consistent, mobile-first design system.",
      },
      {
        name: "React Router",
        description: "Client-side routing for the portfolio's multi-page navigation.",
      },
      {
        name: "Vite",
        description: "Fast development server and optimized production bundling.",
      },
      {
        name: "PostCSS",
        description: "CSS toolchain enabling Tailwind and modern syntax features.",
      },
      {
        name: "Netlify",
        description: "Continuous deployment and hosting with global CDN edge delivery.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Component Architecture",
        description:
          "A highly reusable component system that maintains UI consistency and developer efficiency.",
      },
      {
        point: "Decoupled Data Management",
        description:
          "JSON-driven content structures cleanly separate project metadata from the presentation layer.",
      },
      {
        point: "Optimized Responsive Layouts",
        description:
          "Sophisticated use of Tailwind utility classes to ensure a seamless experience across desktop and mobile devices.",
      },
    ],
    challenges: [
      {
        title: "Responsive Timeline Design",
        description:
          "Engineering a CSS-based vertical timeline that maintains structural integrity and readability on mobile viewports.",
      },
      {
        title: "Asset Performance Optimization",
        description:
          "Managing a high volume of icons and project media while maintaining fast load times and smooth transitions.",
      },
    ],
    whatILearned: [
      {
        topic: "Utility-First CSS Mastery",
        description:
          "Mastered utility-first CSS patterns for complex, responsive UI layouts without leaving the markup.",
      },
      {
        topic: "Scalable React Architecture",
        description:
          "Implemented scalable and maintainable React architectures purpose-built for personal branding.",
      },
      {
        topic: "Data-Driven Rendering",
        description:
          "Developed a deep understanding of component modularity and data-driven rendering patterns.",
      },
    ],
    projectInfo: {
      category: "Portfolio Website",
      role: "Lead Developer",
      duration: "Ongoing",
      status: "Active",
    },
    highlights: [
      "Responsive Portfolio Gallery",
      "Modular React Architecture",
      "Custom Professional Timeline",
      "Polished Tailwind-based UI",
    ],
    galleryCaptions: [
      {
        screen: "Hero Section",
        caption: "A welcoming professional introduction with high-impact typography and branding.",
      },
      {
        screen: "Portfolio Grid",
        caption: "A structured showcase of technical projects and freelance contributions.",
      },
      {
        screen: "Resume Timeline",
        caption:
          "A comprehensive professional history rendered via a custom-built responsive timeline.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the interactive professional showcase.",
      sourceCode: "Review the clean, modular implementation on GitHub.",
    },
  },
  {
    id: "personal-portfolio-v2",
    category: "web",
    thumbnailImage: "/thumbnail-project/project-personal-website-2.png",
    titleHighlight: "Portfolio v2 — Engineering Showcase",
    hero: {
      title: "Personal Portfolio v2",
      description:
        "A showcase of engineering excellence, from modular enterprise platforms to AI-driven consumer experiences.",
      subtitle: "Built with React 19, TanStack Start, and the future of the web.",
    },
    projectOverview: {
      explanation:
        "This portfolio is a technical manifestation of modern web standards, serving as a playground for bleeding-edge technologies like React 19 and TanStack Start. It moves beyond a static resume, functioning as a high-performance, server-side rendered application that prioritizes architectural integrity and user experience.",
      coreValue:
        "The project demonstrates the ability to manage complex state, optimize rendering performance, and implement sophisticated design systems using a forward-thinking tech stack. It showcases a commitment to clean code, modular design, and the seamless integration of full-stack capabilities.",
      interestPoints:
        "Beyond the stack, v2 is opinionated about taste — the Pirate Adventure design language, OKLCH color spaces, and an editorial layout system give the site a distinct visual identity that holds up under engineering scrutiny.",
    },
    keyFeatures: [
      {
        name: "Advanced Project Discovery",
        description:
          "A sophisticated filtering system that manages large-scale project data through category-driven UI orchestration.",
      },
      {
        name: "Bleeding-Edge SSR & Streaming",
        description:
          "Leveraging TanStack Start for optimized initial loads and progressive data hydration.",
      },
      {
        name: "Modern Design System",
        description:
          "Implementing OKLCH color spaces and Tailwind 4 for a premium, high-fidelity visual experience.",
      },
      {
        name: "Optimized Interaction Layer",
        description:
          "Fluid, hardware-accelerated animations powered by Framer Motion for a seamless navigational feel.",
      },
    ],
    techStack: [
      {
        name: "React 19",
        description:
          "Latest React features including the compiler for automatic memoization and rendering optimization.",
      },
      {
        name: "TanStack Start",
        description:
          "Full-stack framework providing SSR, streaming, and type-safe routing on top of Vite.",
      },
      {
        name: "TanStack Query",
        description: "Server state management with caching and background synchronization.",
      },
      {
        name: "Tailwind CSS 4",
        description: "Next-generation utility-first styling with OKLCH color spaces.",
      },
      {
        name: "Framer Motion",
        description: "Production-ready animation library powering smooth interface transitions.",
      },
      {
        name: "Vite 8",
        description: "Build tool delivering fast HMR and optimized production bundles.",
      },
    ],
    engineeringHighlights: [
      {
        point: "Modular Feature-Sliced Design",
        description:
          "Organized the codebase into domain-specific modules, ensuring scalability and reducing side-effect complexity.",
      },
      {
        point: "React 19 Compiler Integration",
        description:
          "Optimized rendering performance by adopting the React Compiler, eliminating manual memoization overhead.",
      },
      {
        point: "High-Performance DX Tooling",
        description:
          "Integrated Rust-based linting and formatting (Oxlint) for near-instant developer feedback loops.",
      },
      {
        point: "Type-Safe Full-Stack Contract",
        description:
          "Enforced end-to-end type safety from the database layer (Drizzle) to the UI components.",
      },
    ],
    challenges: [
      {
        title: "Adopting Unstable APIs",
        description:
          "Navigating the complexities of TanStack Start (RC) and React 19 to build a production-ready environment.",
      },
      {
        title: "Performance vs. Fidelity",
        description:
          "Balancing high-density animations and complex state transitions without compromising Core Web Vitals.",
      },
    ],
    whatILearned: [
      {
        topic: "Frontend Orchestration",
        description:
          "Mastered the coordination of server-side data fetching and client-side interaction in a unified framework.",
      },
      {
        topic: "Modern Styling Architecture",
        description:
          "Explored the capabilities of Tailwind 4 and OKLCH for creating more accessible and vibrant UI systems.",
      },
      {
        topic: "System Reliability",
        description:
          "Strengthened the build pipeline through strict linting and type-checking strategies for enterprise-grade stability.",
      },
    ],
    projectInfo: {
      category: "Portfolio / Engineering Showcase",
      role: "Frontend Architect / Fullstack Developer",
      duration: "Continuous Development",
      status: "Production / Active",
    },
    highlights: [
      "Built with React 19 & TanStack Start",
      "Feature-Sliced Modular Architecture",
      "High-Performance Build System (Oxlint)",
      "Premium OKLCH-based Design System",
    ],
    galleryCaptions: [
      {
        screen: "Landing Dashboard",
        caption: "A high-fidelity entry point showcasing core values and engineering focus areas.",
      },
      {
        screen: "Project Analysis",
        caption:
          "Deep-dive detail pages providing transparency into technical decisions and challenges.",
      },
      {
        screen: "Grid Interactions",
        caption: "Highly responsive project grid with smooth Framer Motion transitions.",
      },
    ],
    ctaContent: {
      livePreview: "Explore the high-performance architecture in action.",
      sourceCode: "Examine the modern stack and modular engineering on GitHub.",
    },
  },
];

export function getProjectV2(id: string): ProjectV2 | undefined {
  return PROJECTS_V2.find((p) => p.id === id);
}

export function projectV2ToCard(p: ProjectV2): CardProject {
  return {
    id: p.id,
    title: p.hero.title,
    description: p.hero.description,
    category: p.category,
    thumbnailImage: p.thumbnailImage,
    tech: p.techStack.map((t) => t.name),
    version: "v2",
  };
}

export function getAllCardProjects(): CardProject[] {
  return PROJECTS_V2.map(projectV2ToCard);
}

export const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "realtime", label: "Real-time Systems" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "tools", label: "Tools & Others" },
];
