export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: {
      INR: "Starts at ₹20,000",
      USD: "Starts at $249"
    },
    description: "Perfect for small businesses, MVPs, and single AI automation features.",
    features: [
      "Premium Website Development",
      "AI Chatbot MVP Setup",
      "API Gateway Development",
      "Database Design & Optimization",
      "Standard responsive design",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: {
      INR: "Starts at ₹50,000",
      USD: "Starts at $599"
    },
    description: "Growing companies requiring custom AI workflows and integration.",
    features: [
      "AI Agent Workflows (LangGraph)",
      "SaaS MVP Platforms",
      "Full Stack Application Development",
      "Interactive Data Dashboard UI",
      "CRM & custom API integrations",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      INR: "Custom Quote",
      USD: "Custom Quote"
    },
    description: "Large-scale AI systems, multi-agent networks, and enterprise apps.",
    features: [
      "SaaS Platforms (full scale)",
      "Multi-agent autonomous workflows",
      "Custom machine learning models",
      "Enterprise security & ETL pipelines",
      "Scalable cloud architecture",
      "Dedicated ongoing priority support",
    ],
    cta: "Contact Us",
    popular: false,
  },
] as const;

export const addOns = [
  { name: "Basic Support Plan", price: "₹3,000/month" },
  { name: "Standard Support Plan", price: "₹10,000/month" },
  { name: "Premium Support Plan", price: "₹15,000/month" },
] as const;
