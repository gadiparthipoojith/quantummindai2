# AI Email Generator — Architecture & Setup

This is a premium AI-powered outbound sales and marketing email generator. It reads lead profiles, matches them with corporate value propositions, adjusts tone and length, and generates high-converting email drafts.

## System Architecture

```mermaid
graph TD
  User[Frontend UI: React + Tailwind] -->|Input parameters: recipient background, tone| API[FastAPI Gateway]
  API -->|Fetch Lead Data| Enrichment[Enrichment Engine: Clearbit/Lusha mock API]
  API -->|Fetch Outbound Templates| DB[(Supabase PostgreSQL)]
  API -->|Prompt with Context + Style guidelines| LLM[OpenAI GPT-4o]
  LLM -->|High-converting draft| API
  API -->|Format & Send to Mailgun queue| Outbound[Outbound Server]
```

## Setup Instructions

### 1. Backend Server (FastAPI)
```bash
pip install fastapi uvicorn openai pydantic
uvicorn main:app --reload --port 8004
```

### 2. Frontend Interface (Next.js)
```bash
npm run dev
```
