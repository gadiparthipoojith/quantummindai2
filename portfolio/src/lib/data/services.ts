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

export const services = [
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    description:
      "Autonomous agents with memory, RAG, function calling, and multi-agent orchestration using LangChain, LangGraph, and CrewAI.",
    features: ["RAG & Vector DB", "Function Calling", "Multi-Agent Systems", "Production Deployment"],
  },
  {
    id: "ai-applications",
    icon: Brain,
    title: "AI Applications",
    description:
      "Custom AI apps — chatbots, document Q&A, content generators, resume builders, and domain-specific assistants.",
    features: ["OpenAI Integration", "Custom Knowledge Bases", "Streaming UI", "Analytics"],
  },
  {
    id: "saas",
    icon: LayoutDashboard,
    title: "SaaS Applications",
    description:
      "Full-stack SaaS with authentication, billing, admin dashboards, role-based access, and scalable architecture.",
    features: ["Auth & RBAC", "Stripe Billing", "Admin Panel", "API Design"],
  },
  {
    id: "fullstack",
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Modern web applications with Next.js, React, TypeScript, Node.js, Python FastAPI, and production-grade DevOps.",
    features: ["Next.js 15+", "REST/GraphQL APIs", "PostgreSQL/MongoDB", "Docker & CI/CD"],
  },
  {
    id: "data-science",
    icon: LineChart,
    title: "Data Science & Analytics",
    description:
      "Predictive models, BI dashboards, ETL pipelines, and statistical analysis that turn data into decisions.",
    features: ["ML Models", "Forecasting", "Custom Dashboards", "ETL Pipelines"],
  },
  {
    id: "websites",
    icon: Globe,
    title: "Premium Websites",
    description:
      "High-converting business websites for restaurants, real estate, travel, healthcare, and enterprise brands.",
    features: ["SEO Optimized", "CMS Ready", "Animations", "Performance 100"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "App Development",
    description:
      "Cross-platform and web-native applications with polished UX, offline support, and push notifications.",
    features: ["React Native", "PWA", "App Store Ready", "Backend Integration"],
  },
  {
    id: "apis",
    icon: Zap,
    title: "API Development",
    description:
      "Scalable REST and GraphQL APIs with authentication, rate limiting, documentation, and monitoring.",
    features: ["FastAPI/Node.js", "OpenAPI Docs", "Rate Limiting", "Webhooks"],
  },
  {
    id: "databases",
    icon: Database,
    title: "Database Architecture",
    description:
      "Schema design, optimization, migrations, and multi-database strategies with PostgreSQL, MongoDB, and Supabase.",
    features: ["Schema Design", "Query Optimization", "Prisma ORM", "Real-time Subscriptions"],
  },
] as const;
