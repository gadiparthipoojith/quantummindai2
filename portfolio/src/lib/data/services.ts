import {
  Bot,
  Brain,
  Code2,
  Database,
  Globe,
  LayoutDashboard,
  LineChart,
  Smartphone,
  Zap,
} from "lucide-react";

export type Service = {
  id: string;
  icon: any;
  category: string;
  tags: string[];
  categoryBadge: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "ai-agents",
    icon: Bot,
    category: "Artificial Intelligence",
    tags: ["ai", "automation"],
    categoryBadge: "Enterprise Automation",
    title: "AI Agents",
    description:
      "Autonomous agents with memory, RAG, function calling, and multi-agent orchestration using LangChain, LangGraph, and CrewAI.",
    technologies: ["LangChain", "CrewAI", "OpenAI API", "Pinecone", "Python", "Docker", "AWS ECS"],
    deliverables: [
      "Fully autonomous multi-step workflow execution",
      "Dynamic state memory and cross-session context retention",
      "Seamless integration with enterprise databases & APIs",
      "99.9% uptime SLA and performance guarantee"
    ]
  },
  {
    id: "ai-applications",
    icon: Brain,
    category: "Artificial Intelligence",
    tags: ["ai", "generative"],
    categoryBadge: "Generative AI",
    title: "AI Applications",
    description:
      "Custom AI apps — chatbots, document Q&A, content generators, resume builders, and domain-specific assistants.",
    technologies: ["Next.js", "React", "Google Gemini", "Vite", "Tailwind CSS", "FastAPI", "Redis"],
    deliverables: [
      "Interactive AI applications with streaming UI",
      "Custom RAG pipelines for proprietary knowledge bases",
      "Advanced conversational interfaces and chatbots",
      "Sub-500ms latency for predictive inference"
    ]
  },
  {
    id: "saas",
    icon: LayoutDashboard,
    category: "SaaS Platforms",
    tags: ["cloud", "saas"],
    categoryBadge: "Cloud Platforms",
    title: "SaaS Applications",
    description:
      "Full-stack SaaS with authentication, billing, admin dashboards, role-based access, and scalable architecture.",
    technologies: ["React 19", "Express.js", "PostgreSQL", "Stripe", "NextAuth", "Prisma", "Vercel"],
    deliverables: [
      "Multi-tenant cloud architecture design",
      "Robust user billing and subscription management",
      "Role-based access control and security provisioning",
      "Comprehensive admin dashboard for operations"
    ]
  },
  {
    id: "fullstack",
    icon: Code2,
    category: "Core Engineering",
    tags: ["engineering", "backend"],
    categoryBadge: "Core Engineering",
    title: "Full Stack Development",
    description:
      "Modern web applications with Next.js, React, TypeScript, Node.js, Python FastAPI, and production-grade DevOps.",
    technologies: ["TypeScript", "Node.js", "React", "Docker", "AWS", "GraphQL", "MongoDB"],
    deliverables: [
      "End-to-end engineered software stacks",
      "High-concurrency backend API routers",
      "Optimized frontend asset bundles",
      "Automated CI/CD deployment pipelines"
    ]
  },
  {
    id: "data-science",
    icon: LineChart,
    category: "Data & Craft Design",
    tags: ["data", "analytics"],
    categoryBadge: "Analytics & ML",
    title: "Data Science & Analytics",
    description:
      "Predictive models, BI dashboards, ETL pipelines, and statistical analysis that turn data into decisions.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "SQL", "Tableau"],
    deliverables: [
      "Predictive engines and machine learning models",
      "Fully interactive statistical visualizations",
      "Robust ETL pipelines for enterprise data",
      "High-value business insights and reporting"
    ]
  },
  {
    id: "websites",
    icon: Globe,
    category: "Data & Craft Design",
    tags: ["design", "frontend"],
    categoryBadge: "Digital Presence",
    title: "Premium Websites",
    description:
      "High-converting business websites for restaurants, real estate, travel, healthcare, and enterprise brands.",
    technologies: ["Vite", "React", "Tailwind CSS", "Framer Motion", "Next.js", "Vercel"],
    deliverables: [
      "Ultra-premium, high-performance web presences",
      "Exquisite layout rhythm and sophisticated typography",
      "Fluid, hardware-accelerated animations",
      "100/100 Lighthouse performance and SEO scores"
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    category: "Core Engineering",
    tags: ["mobile", "engineering"],
    categoryBadge: "Cross-Platform",
    title: "App Development",
    description:
      "Cross-platform and web-native applications with polished UX, offline support, and push notifications.",
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "SQLite"],
    deliverables: [
      "Cross-platform mobile applications (iOS & Android)",
      "Web-native Progressive Web Apps (PWAs)",
      "Offline-first architecture and syncing",
      "Integrated push notifications and deep linking"
    ]
  },
  {
    id: "apis",
    icon: Zap,
    category: "Core Engineering",
    tags: ["backend", "engineering"],
    categoryBadge: "Backend Infrastructure",
    title: "API Development",
    description:
      "Scalable REST and GraphQL APIs with authentication, rate limiting, documentation, and monitoring.",
    technologies: ["FastAPI", "Node.js", "Express", "GraphQL", "Swagger", "Redis", "Nginx"],
    deliverables: [
      "Scalable REST and GraphQL API architectures",
      "Secure authentication and granular rate limiting",
      "Comprehensive OpenAPI/Swagger documentation",
      "Real-time monitoring and alert integrations"
    ]
  },
  {
    id: "databases",
    icon: Database,
    category: "Data & Craft Design",
    tags: ["data", "architecture"],
    categoryBadge: "Data Architecture",
    title: "Database Architecture",
    description:
      "Schema design, optimization, migrations, and multi-database strategies with PostgreSQL, MongoDB, and Supabase.",
    technologies: ["PostgreSQL", "MongoDB", "Supabase", "Prisma ORM", "Redis", "Elasticsearch"],
    deliverables: [
      "Optimized relational and NoSQL schema design",
      "Seamless database migrations and seedings",
      "Complex query optimization and indexing",
      "Real-time subscriptions and replication strategies"
    ]
  },
];
