from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="AI Content Generator API")

class ContentRequest(BaseModel):
    topic: str
    platform: str # linkedin, twitter, blog
    keywords: list[str]

@app.post("/api/generate-content")
async def generate_content(req: ContentRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {
            "content": f"🚀 Let's talk about {req.topic}!\n\nHere are 3 key takeaways that companies fail to leverage:\n\n1. AI systems require context mapping.\n2. Human validation is key.\n3. Automation delivers ROI.\n\nWhich one are you focusing on this quarter? Let's discuss!\n\n#AI #Technology #{req.keywords[0] if req.keywords else 'Business'}"
        }

    client = openai.OpenAI(api_key=api_key)
    prompt = f"""
    Write high-engagement content for {req.platform} about:
    Topic: {req.topic}
    Keywords to include: {', '.join(req.keywords)}

    Follow the platform conventions:
    - LinkedIn: Professional yet hooks the reader, spacing, clear bullets.
    - Twitter: Bulleted points, active voice, punchy hook.
    - Blog: Structured with intro, subheadings, and conclusion.
    """

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        content = completion.choices[0].message.content
        return {
            "content": content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
