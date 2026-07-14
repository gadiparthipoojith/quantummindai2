import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

const systemPrompt = `You are Aether, the Principal AI Advisor for Quantum Mind AI.
Quantum Mind AI is a boutique software engineering studio founded by Gadiparthi Poojith (AI & Full Stack Engineer) and Surya Antarvedi (Data Scientist & Analyst).

Key Information:
- Services: AI Application Development, Autonomous AI Agents (LangGraph/LangChain), Business Automation (n8n, Zapier, Make.com), Premium Websites (Next.js/React), Custom SaaS, Custom Dashboards, and API Integrations.
- Experience: 70+ successfully delivered projects, 98% client satisfaction.
- Founders:
  1. Gadiparthi Poojith: Core developer building intelligent agents, scalable backend systems, APIs, and beautiful web interfaces. Specialist in LangChain, Next.js, FastAPI, Node.js, Supabase, AWS.
  2. Surya Antarvedi: Data scientist building ML models, predictive algorithms, ETL pipelines, and high-performance business intelligence dashboards.
  3. Nalla S.K.Thrinadh: Full Stack Developer & App Developer crafting seamless cross-platform experiences.
- Contact: Email info@qmaiinovations.in, or fill out the contact form on the home page.
- Pricing: Project-based pricing starts from ₹20,000. Custom agency retainer contracts are available.

Adopt a tone that is confident, highly professional, and distinctly human. Act as an expert engineering consultant rather than a generic customer service bot. Keep answers concise, insightful, and sharply focused on business value and technical excellence.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      const lastMessage = messages[messages.length - 1]?.content || "";
      const mockResponse = getMockResponse(lastMessage);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = mockResponse.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(word + " "));
            await new Promise((resolve) => setTimeout(resolve, 60));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

function getMockResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("rate")) {
    return "Our custom AI and SaaS project development starts at ₹20,000. We also offer retainer agreements for ongoing support. What specific project do you have in mind? I can provide an estimate.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
    return "You can contact us directly at info@qmaiinovations.in or use the contact form at the bottom of our homepage. We usually respond within 24 hours.";
  }
  if (q.includes("service") || q.includes("what do you do") || q.includes("agent")) {
    return "We specialize in designing and deploying Autonomous AI Agents (using LangGraph/CrewAI), custom RAG systems, business automation workflows (n8n/Zapier), and premium full-stack SaaS apps with Next.js and Supabase.";
  }
  if (q.includes("poojith") || q.includes("founder") || q.includes("surya") || q.includes("thrinadh")) {
    return "Quantum Mind AI was founded by Gadiparthi Poojith and Surya Antarvedi, alongside developer Nalla S.K.Thrinadh. Together, we deliver end-to-end intelligence products.";
  }
  return "Thanks for reaching out! Quantum Mind AI specializes in high-end AI apps, autonomous agents, and business automations. How can we help you accelerate your business goals today?";
}
