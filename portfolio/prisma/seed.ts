import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users (Founders & Clients)
  const poojith = await prisma.user.upsert({
    where: { passcode: "poojith" },
    update: {},
    create: {
      passcode: "poojith",
      role: "admin",
      name: "Gadiparthi Poojith (Founder)",
    },
  });

  const surya = await prisma.user.upsert({
    where: { passcode: "surya" },
    update: {},
    create: {
      passcode: "surya",
      role: "admin",
      name: "Surya Antarvedi (Founder)",
    },
  });

  const acme = await prisma.user.upsert({
    where: { passcode: "acme" },
    update: {},
    create: {
      passcode: "acme",
      role: "client_acme",
      name: "Client: Acme Corp",
      clientAlias: "client_acme",
    },
  });

  const nova = await prisma.user.upsert({
    where: { passcode: "nova" },
    update: {},
    create: {
      passcode: "nova",
      role: "client_nova",
      name: "Client: Nova Retail",
      clientAlias: "client_nova",
    },
  });

  const apex = await prisma.user.upsert({
    where: { passcode: "apex" },
    update: {},
    create: {
      passcode: "apex",
      role: "client_apex",
      name: "Client: Apex AI",
      clientAlias: "client_apex",
    },
  });

  // Create Projects for the Clients
  await prisma.project.create({
    data: {
      clientId: acme.id,
      clientName: "Acme Corp",
      projectName: "Enterprise RAG Pipeline",
      budget: "₹3,50,000",
      timeline: "8 weeks",
      progress: 75,
      roadmap: JSON.stringify([
        { title: "Discovery & Vector Db Architecture Setup", date: "May 10", status: "Completed" },
        { title: "Ingestion Pipelines (PDFs, Confluence docs)", date: "May 25", status: "Completed" },
        { title: "Hybrid Search & Prompt Optimization", date: "June 10", status: "Completed" },
        { title: "Evaluation Framework & RAGAS Benchmarking", date: "July 01", status: "In Progress" },
        { title: "Final Frontend Integration & Live Handover", date: "July 20", status: "Scheduled" }
      ]),
      documents: JSON.stringify([
        { name: "MSA - Acme Corp", type: "PDF", size: "245 KB", desc: "Master Services Agreement detailing general clauses and data safety." },
        { name: "SOW - Enterprise RAG Ingestion", type: "PDF", size: "128 KB", desc: "Scope of work covering vector database nodes and indexing rules." },
        { name: "Requirement Gathering Questionnaire", type: "Markdown", size: "18 KB", desc: "Initial client technical environment specifications." }
      ])
    }
  });

  await prisma.project.create({
    data: {
      clientId: nova.id,
      clientName: "Nova Retail",
      projectName: "Shopify Sync Automation",
      budget: "₹1,20,000",
      timeline: "4 weeks",
      progress: 100,
      roadmap: JSON.stringify([
        { title: "n8n Self-Hosted Setup on Hetzner VPS", date: "June 01", status: "Completed" },
        { title: "Shopify Webhooks & Inventory Mappings", date: "June 08", status: "Completed" },
        { title: "Slack Notifications & Error Tracking", date: "June 15", status: "Completed" },
        { title: "Handovers & Admin Training Documentation", date: "June 25", status: "Completed" }
      ]),
      documents: JSON.stringify([
        { name: "SOW - Shopify Sync Automation", type: "PDF", size: "94 KB", desc: "Description of triggers, custom Webhooks, and n8n webhook nodes." },
        { name: "Admin Training Guide", type: "Markdown", size: "35 KB", desc: "Step by step self-hosting credentials and n8n error instructions." }
      ])
    }
  });

  await prisma.project.create({
    data: {
      clientId: apex.id,
      clientName: "Apex AI",
      projectName: "Medical Chatbot UI & Agents",
      budget: "₹2,80,000",
      timeline: "12 weeks",
      progress: 45,
      roadmap: JSON.stringify([
        { title: "Custom Agent Architectures", date: "June 05", status: "Completed" },
        { title: "UI Mockups & Next.js Setup", date: "June 20", status: "Completed" },
        { title: "HIPAA Compliant API Gateway Setup", date: "July 05", status: "In Progress" },
        { title: "Testing with Mock Medical Logs", date: "July 20", status: "Scheduled" },
        { title: "Final Security Audit & Deploy", date: "August 10", status: "Scheduled" }
      ]),
      documents: JSON.stringify([
        { name: "MSA - Apex AI", type: "PDF Template", size: "142 KB", desc: "IP transfer and HIPAA security compliance agreements." },
        { name: "SOW - Medical Agent Assistant", type: "Markdown", size: "52 KB", desc: "Description of multi-agent safety railings and API architectures." },
        { name: "HIPAA Business Associate Agreement (BAA)", type: "PDF", size: "85 KB", desc: "Signed agreement for processing health data." }
      ])
    }
  });

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
