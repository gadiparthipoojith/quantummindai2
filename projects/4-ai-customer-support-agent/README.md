# AI Customer Support Agent — Architecture & Setup

This is a production-ready AI customer support agent that utilizes a knowledge database (RAG) to answer support queries and leverages function calling to automatically create, retrieve, and update support tickets in a mock Zendesk CRM backend.

## System Architecture

```mermaid
graph TD
  User[Customer Frontend / Widget] -->|Submits Query| Gateway[FastAPI API Gateway]
  Gateway -->|Check Session Memory| Memory[Redis Chat History Cache]
  Gateway -->|Query Vector Store| DB[(Knowledge Base Vectors)]
  Gateway -->|Trigger Call| Agent[LangChain Agent Engine]
  Agent -->|Decides Tool Use| Tools[Zendesk API Tool / Email Tool]
  Tools -->|Modify records| CRM[(Mock Support CRM Database)]
  Agent -->|Formulate Final Response| Gateway
  Gateway -->|Send Stream| User
```

## Database Schema (Prisma)

```prisma
model Ticket {
  id          String   @id @default(uuid())
  customerEmail String
  subject     String
  status      String   @default("OPEN") // OPEN, PENDING, RESOLVED
  priority    String   @default("MEDIUM") // LOW, MEDIUM, HIGH
  messages    Message[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Message {
  id        String   @id @default(uuid())
  ticketId  String
  ticket    Ticket   @relation(fields: [ticketId], references: [id])
  sender    String   // 'customer' or 'agent'
  content   String
  createdAt DateTime @default(now())
}
```

## Setup Instructions

### 1. Backend Server (FastAPI)
```bash
pip install fastapi uvicorn openai langchain pydantic
uvicorn main:app --reload --port 8003
```

### 2. Frontend Chat Widget
```bash
npm install lucide-react
npm run dev
```
