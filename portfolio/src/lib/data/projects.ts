export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  href: string;
  github: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    description: "ATS-optimized resume generator with AI tailoring, keyword analysis, and PDF export.",
    category: "AI Application",
    tags: ["Next.js", "OpenAI", "PDF", "Supabase"],
    image: "/projects/resume-builder.jpg",
    href: "/projects/ai-resume-builder",
    github: "https://github.com/quantummind-ai/ai-resume-builder",
    featured: true,
    metrics: [
      { label: "Resumes Generated", value: "12K+" },
      { label: "ATS Pass Rate", value: "89%" },
    ],
  },

  {
    id: "ai-pdf-chatbot",
    title: "AI PDF Chatbot",
    description: "RAG-powered document Q&A with vector search, citation tracking, and multi-file support.",
    category: "AI Agent",
    tags: ["LangChain", "Pinecone", "FastAPI", "Next.js"],
    image: "/projects/pdf-chatbot.jpg",
    href: "/projects/ai-pdf-chatbot",
    github: "https://github.com/quantummind-ai/ai-pdf-chatbot",
    featured: true,
    metrics: [
      { label: "Documents Indexed", value: "10K+" },
      { label: "Query Accuracy", value: "94%" },
    ],
  },
  {
    id: "ai-customer-support",
    title: "AI Customer Support Agent",
    description: "Multi-channel support agent with ticket routing, memory, and 73% automated resolution.",
    category: "AI Agent",
    tags: ["LangGraph", "Slack", "OpenAI", "PostgreSQL"],
    image: "/projects/support-agent.jpg",
    href: "/projects/ai-customer-support-agent",
    github: "https://github.com/quantummind-ai/ai-customer-support-agent",
    featured: true,
    metrics: [
      { label: "Ticket Deflection", value: "73%" },
      { label: "Avg Response", value: "<2s" },
    ],
  },
  {
    id: "ai-crm",
    title: "AI CRM",
    description: "CRM with AI lead scoring, automated follow-ups, pipeline analytics, and email integration.",
    category: "SaaS",
    tags: ["Next.js", "Prisma", "OpenAI", "Stripe"],
    image: "/projects/ai-crm.jpg",
    href: "/projects/ai-crm",
    github: "https://github.com/quantummind-ai/ai-crm",
    featured: true,
    metrics: [
      { label: "Leads Managed", value: "50K+" },
      { label: "Conversion Lift", value: "+28%" },
    ],
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "Real-time analytics with ML insights, anomaly detection, and natural language queries.",
    category: "Dashboard",
    tags: ["React", "Python", "TensorFlow", "PostgreSQL"],
    image: "/projects/ai-dashboard.jpg",
    href: "/projects/ai-dashboard",
    github: "https://github.com/quantummind-ai/ai-dashboard",
    featured: true,
    metrics: [
      { label: "Daily Queries", value: "50K" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full e-commerce with Stripe, inventory, admin panel, and AI product recommendations.",
    category: "Full Stack",
    tags: ["Next.js", "Stripe", "MongoDB", "Redis"],
    image: "/projects/ecommerce.jpg",
    href: "/projects/ecommerce",
    github: "https://github.com/quantummind-ai/ecommerce",
    featured: false,
  },
  {
    id: "hospital-management",
    title: "Hospital Management System",
    description: "Patient records, appointments, billing, and staff management with role-based access.",
    category: "Enterprise",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Auth"],
    image: "/projects/hospital.jpg",
    href: "/projects/hospital-management",
    github: "https://github.com/quantummind-ai/hospital-management",
    featured: false,
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    description: "Premium restaurant site with online ordering, reservations, and menu management.",
    category: "Website",
    tags: ["Next.js", "Tailwind", "Framer Motion", "SEO"],
    image: "/projects/restaurant.jpg",
    href: "/projects/restaurant-website",
    github: "https://github.com/quantummind-ai/restaurant-website",
    featured: false,
  },
  {
    id: "saas-landing",
    title: "SaaS Landing Page",
    description: "High-converting SaaS landing with pricing, testimonials, and animated feature sections.",
    category: "Website",
    tags: ["Next.js", "GSAP", "Tailwind", "Analytics"],
    image: "/projects/saas-landing.jpg",
    href: "/projects/saas-landing",
    github: "https://github.com/quantummind-ai/saas-landing",
    featured: false,
  },
];
