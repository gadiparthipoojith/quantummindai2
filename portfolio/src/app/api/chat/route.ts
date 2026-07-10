import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// Standard agency background context to answer queries accurately
const systemPrompt = `You are Quantum Mind AI, the intelligent virtual assistant for Quantum Mind AI.
Quantum Mind AI is a premium AI engineering and data intelligence studio founded by Gadiparthi Poojith (AI & Full Stack Engineer) and Surya Antarvedi (Data Scientist & Analyst).

Key Information:
- Services: AI Application Development, Autonomous AI Agents (LangGraph/LangChain), Business Automation (n8n, Zapier, Make.com), Premium Websites (Next.js/React), Custom SaaS, Custom Dashboards, and API Integrations.
- Experience: 70+ successfully delivered projects, 98% client satisfaction.
- Founders:
  1. Gadiparthi Poojith: Core developer building intelligent agents, scalable backend systems, APIs, and beautiful web interfaces. Specialist in LangChain, Next.js, FastAPI, Node.js, Supabase, AWS.
  2. Surya Antarvedi: Data scientist building ML models, predictive algorithms, ETL pipelines, and high-performance business intelligence dashboards.
- Contact: Email poojith@quantummind.dev, or fill out the contact form on the home page.
- Pricing: Project-based pricing starts from ₹20,000. Custom agency retainer contracts are available.

Answer user questions professionally, highlighting our skills, projects, and architecture practices. Keep answers concise, helpful, and friendly.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if the API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return a simulated stream to mock the experience without throwing errors
      const lastMessage = messages[messages.length - 1]?.content || "";
      const mockResponse = getMockResponse(lastMessage);

      // Simulating a stream response using readable stream
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          // Send words gradually to simulate typing
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

    // If key is configured, use the real OpenAI SDK stream
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
    return "Our custom AI and SaaS project development starts at ₹20,000. We also offer retainer agreements for ongoing support. What specific project do you have in mind? I can provide an estimate!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
    return "You can contact Gadiparthi Poojith directly at poojith@quantummind.dev or use the contact form at the bottom of our homepage. We usually respond within 24 hours!";
  }
  if (q.includes("service") || q.includes("what do you do") || q.includes("agent")) {
    return "We specialize in designing and deploying Autonomous AI Agents (using LangGraph/CrewAI), custom RAG systems, business automation workflows (n8n/Zapier), and premium full-stack SaaS apps with Next.js and Supabase.";
  }
  if (q.includes("poojith") || q.includes("founder") || q.includes("surya")) {
    return "Quantum Mind AI was founded by Gadiparthi Poojith (Full Stack & AI Architect) and Surya Antarvedi (Data Science & Analytics Lead). Together, we deliver end-to-end intelligence products.";
  }
  return "Thanks for reaching out! Quantum Mind AI specializes in high-end AI apps, autonomous agents, and business automations. How can we help you accelerate your business goals today?";
}
