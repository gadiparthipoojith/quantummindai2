# AI Medical Assistant — Architecture & Setup

This is a clinical helper system that transcribes doctor-patient dialogues, analyzes symptoms, maps diagnoses to ICD-10 medical coding formats, and drafts clinical SOAP notes.

> [!WARNING]
> This system is designed for developer demonstrations and educational research. It must not be used for direct clinical diagnosis without certified medical oversight.

## System Architecture

```mermaid
graph TD
  User[Doctor Tablet / App Interface] -->|Records audio stream| API[FastAPI Server]
  API -->|Transcription| STT[Whisper API / Deepgram]
  API -->|Fetch Medical Context| DB[(Clinical Terminology database)]
  API -->|SOAP Prompts + Medical Standards| LLM[OpenAI GPT-4o / Clinical Fine-tuned Model]
  LLM -->|Formatted SOAP Notes + ICD-10 suggestions| API
  API -->|Store clinical records| EHR[(Electronic Health Records / EHR DB)]
```

## Setup Instructions

### 1. Backend Server (FastAPI)
```bash
pip install fastapi uvicorn openai pydantic
uvicorn main:app --reload --port 8006
```

### 2. Frontend SOAP Dashboard (Next.js)
```bash
npm run dev
```
