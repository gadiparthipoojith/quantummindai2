from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="AI Email Generator API")

class EmailRequest(BaseModel):
    recipient_name: str
    recipient_role: str
    company_name: str
    value_prop: str
    tone: str  # professional, warm, direct, creative

@app.post("/api/generate-email")
async def generate_email(req: EmailRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {
            "subject": f"Accelerating {req.company_name}'s Operations with Intelligent Automation",
            "body": f"Hi {req.recipient_name},\n\nI noticed you manage engineering as {req.recipient_role} at {req.company_name}. Many scaling companies struggle to manage RAG agent performance. Our custom full-stack solutions can help {req.value_prop} in weeks.\n\nWould you be open to a brief chat next Tuesday?\n\nBest,\nPoojith\nCo-Founder, AetherForge"
        }

    client = openai.OpenAI(api_key=api_key)
    prompt = f"""
    Write a high-converting cold email targeting:
    Name: {req.recipient_name}
    Role: {req.recipient_role}
    Company: {req.company_name}
    Value Proposition: {req.value_prop}
    Tone of voice: {req.tone}

    Follow best email copy standards:
    - Subject line must be punchy and personalized.
    - Under 150 words.
    - 1 clear call to action.
    - No cheesy or overused sales terms.
    """

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        body = completion.choices[0].message.content
        return {
            "subject": f"Quick question regarding {req.company_name}",
            "body": body
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
