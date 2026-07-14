import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "edge";

export async function GET() {
  try {
    const config = await prisma.config.findUnique({
      where: { id: "pricing" },
    });
    
    if (!config) {
      // Default config
      const defaultPricing = {
        tiers: [
          { id: "starter", label: "Starter Tier", price: "Base: ₹20,000", desc: "MVP / Proof of Concept", value: 20000 },
          { id: "professional", label: "Professional", price: "Base: ₹80,000", desc: "Production-ready apps", value: 80000 },
          { id: "enterprise", label: "Enterprise", price: "Base: ₹2,50,000", desc: "High scale & compliance", value: 250000 }
        ],
        services: [
          { id: "chatbot", label: "AI Chatbot MVP", price: "₹35,000", desc: "Conversational RAG agent", value: 35000 },
          { id: "agent", label: "AI Agent Workflow", price: "₹70,000", desc: "Multi-agent LangGraph flows", value: 70000 },
          { id: "app", label: "Full Stack App", price: "₹70,000", desc: "Next.js frontend + FastAPI", value: 70000 },
          { id: "dashboard", label: "Data Dashboard", price: "₹30,000", desc: "Real-time analytics UI", value: 30000 },
          { id: "api", label: "API Integrations", price: "₹20,000", desc: "Custom webhooks & gateways", value: 20000 },
          { id: "database", label: "Database Design", price: "₹25,000", desc: "Supabase / PostgreSQL setup", value: 25000 }
        ],
        support: [
          { id: "none", label: "No Support", price: "₹0", value: 0 },
          { id: "basic", label: "Basic Plan", price: "₹3,000", value: 3000 },
          { id: "standard", label: "Standard Plan", price: "₹10,000", value: 10000 },
          { id: "premium", label: "Premium Plan", price: "₹15,000", value: 15000 }
        ]
      };
      
      await prisma.config.create({
        data: {
          id: "pricing",
          value: JSON.stringify(defaultPricing)
        }
      });
      
      return NextResponse.json({ success: true, data: defaultPricing });
    }
    
    return NextResponse.json({ success: true, data: JSON.parse(config.value) });
  } catch (error) {
    console.error("Config fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch config" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const config = await prisma.config.upsert({
      where: { id: "pricing" },
      update: { value: JSON.stringify(body) },
      create: { id: "pricing", value: JSON.stringify(body) },
    });
    
    return NextResponse.json({ success: true, data: JSON.parse(config.value) });
  } catch (error) {
    console.error("Config update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update config" }, { status: 500 });
  }
}
