export const caseStudies = [
  {
    id: "novahealth-ai-assistant",
    title: "NovaHealth AI Patient Assistant",
    client: "NovaHealth",
    industry: "Healthcare",
    challenge:
      "NovaHealth's support team was overwhelmed with 500+ daily patient inquiries about appointments, billing, and records.",
    solution:
      "Built a HIPAA-aware AI assistant with RAG over policy documents, appointment scheduling via function calling, and human escalation for sensitive queries.",
    results: [
      { metric: "73%", label: "Ticket Deflection" },
      { metric: "<2s", label: "Avg Response Time" },
      { metric: "4.8/5", label: "Patient Satisfaction" },
      { metric: "3 weeks", label: "Time to Production" },
    ],
    technologies: ["LangGraph", "OpenAI", "FastAPI", "PostgreSQL", "Supabase"],
    testimonial: {
      quote: "Quantum Mind AI delivered production-ready AI in 3 weeks. Our support costs dropped 40%.",
      author: "Sarah Chen, CEO",
    },
  },
  {
    id: "scaleup-crm",
    title: "ScaleUp CRM with AI Lead Scoring",
    client: "ScaleUp CRM",
    industry: "SaaS",
    challenge:
      "Sales team wasted hours on unqualified leads. No centralized pipeline visibility or automated follow-ups.",
    solution:
      "Full-stack CRM with AI lead scoring, automated email sequences, pipeline analytics dashboard, and Stripe billing integration.",
    results: [
      { metric: "+28%", label: "Conversion Rate" },
      { metric: "50K+", label: "Leads Managed" },
      { metric: "6 weeks", label: "Build Timeline" },
      { metric: "99.9%", label: "Uptime" },
    ],
    technologies: ["Next.js", "Prisma", "OpenAI", "Stripe", "PostgreSQL"],
    testimonial: {
      quote: "Launched on time, zero critical bugs. Our go-to engineering partner.",
      author: "Marcus Williams, Founder",
    },
  },
  {
    id: "retailflow-analytics",
    title: "RetailFlow Inventory Analytics",
    client: "RetailFlow",
    industry: "Retail",
    challenge:
      "Manual inventory forecasting caused $180K in overstock annually. No real-time visibility across 12 locations.",
    solution:
      "ML forecasting pipeline with demand prediction, real-time analytics dashboard, automated reorder alerts, and Excel export automation.",
    results: [
      { metric: "94%", label: "Forecast Accuracy" },
      { metric: "$180K", label: "Cost Savings/Year" },
      { metric: "12", label: "Locations Connected" },
      { metric: "2 weeks", label: "Dashboard Delivery" },
    ],
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "n8n"],
    testimonial: {
      quote: "Surya's dashboard transformed our inventory decisions. ROI in the first month.",
      author: "Priya Sharma, VP Operations",
    },
  },
] as const;
