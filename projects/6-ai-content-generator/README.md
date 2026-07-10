# AI Content Generator — Architecture & Setup

This is a multi-format AI content generation engine designed to create SEO blog posts, LinkedIn updates, and Twitter threads based on simple input keywords, using structured output formatting.

## System Architecture

```mermaid
graph TD
  User[Frontend Dashboard] -->|Define Topic & Platform| API[FastAPI Gateway]
  API -->|Fetch Outbound Templates| DB[(Supabase DB)]
  API -->|Analyze Competitor Keywords| SEO[SEO Keywords API / SERP API]
  API -->|Structured Generation Prompt| LLM[OpenAI GPT-4o]
  LLM -->|Formatted Markdown Output| API
  API -->|Publish Queue| Publisher[Social Media APIs: LinkedIn, Twitter]
```

## Setup Instructions

### 1. Backend Service (FastAPI)
```bash
pip install fastapi uvicorn openai pydantic
uvicorn main:app --reload --port 8005
```

### 2. Frontend Interface (Next.js)
```bash
npm run dev
```
