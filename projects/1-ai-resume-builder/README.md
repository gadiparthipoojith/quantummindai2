# AI Resume Builder — Architecture & Production Setup

This project is a premium AI-powered resume analyzer and builder that reviews resumes against job descriptions, optimizes keywords, and formats PDF output according to executive templates.

## System Architecture

```mermaid
graph TD
  User[Frontend UI: Next.js + React Hook Form] -->|Uploads PDF / Raw Text| API[FastAPI Gateway]
  API -->|Processes Text| Parser[PDF Parser & Text Extractor]
  API -->|Fetch User Profile| DB[(Supabase PostgreSQL)]
  API -->|Send Prompt + Schema| LLM[OpenAI GPT-4o / LangChain]
  LLM -->|Structured JSON Output| Advisor[Resume Reviewer Engine]
  Advisor -->|Returns Score & Bullet Adjustments| API
  API -->|Renders PDF via react-pdf| User
```

## Database Schema (Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  resumes   Resume[]
}

model Resume {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  title       String
  content     Json     // Stores structural resume data (education, experience, skills)
  score       Int      // Resume score based on AI grading (0-100)
  suggestions Json     // Array of optimization recommendations
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Setup & Run Instructions

### 1. Prerequisites
- Node.js v20+
- Python 3.11+
- Supabase account (PostgreSQL DB)
- OpenAI API Key

### 2. Backend Installation (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend Installation (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables (.env)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/resume_db"
OPENAI_API_KEY="your-openai-api-key"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```
