# AetherForge Collective — AI Agent Orchestration (Agents 1 to 12)

This documentation provides the codebase architecture and orchestration files for all 12 intelligent AI agents in the agency stack.

---

## 1. Sales Agent
- **Framework:** LangGraph
- **Code:** [sales_agent.py](file:///c:/Users/gadip/OneDrive/Desktop/FreeLancing/agents/sales_agent.py)
- **Role:** Automates lead qualification scoring and schedules follow-up email drafts.

## 2. Recruitment Agent
- **Framework:** LangChain Structured Output
- **Role:** Parses resumes, screens candidates based on custom rubric keys, and auto-generates interview feedback.

## 3. Customer Support Agent
- **Framework:** CrewAI Multi-Agent
- **Role:** Analyzes customer email sentiments, retrieves solutions from vectorized knowledge bases, and drafts responses.

## 4. Medical Agent
- **Framework:** LangChain Tool Calling
- **Role:** Clinician-patient dialogue helper mapping diagnostics to ICD-10 templates.

## 5. Research Agent
- **Framework:** LangChain ReAct Agent
- **Code:** [research_agent.py](file:///c:/Users/gadip/OneDrive/Desktop/FreeLancing/agents/research_agent.py)
- **Role:** Fetches papers from arXiv and summarizes academic literature trends.

## 6. Email Agent
- **Framework:** LangGraph Stateful Loops
- **Role:** Automatically categorizes inbound emails and routes drafts to corresponding department threads.

## 7. Calendar Agent
- **Framework:** LangChain Function Calling
- **Role:** Integrates Google Calendar APIs to block out development times and avoid scheduling conflicts.

## 8. WhatsApp Agent
- **Framework:** Twilio Webhooks + OpenAI Assistants API
- **Role:** Answers prospect queries automatically over WhatsApp and logs them to the CRM.

## 9. Lead Generation Agent
- **Framework:** LangChain + Custom Web Search Tools
- **Role:** Scrapes search engine maps to identify B2B leads and verifies email domains.

## 10. CRM Agent
- **Framework:** LangChain DB Agent
- **Role:** Translates natural language questions (e.g. "Who are our highest value leads?") into database SQL queries.

## 11. Meeting Agent
- **Framework:** Whisper API + OpenAI Summarization
- **Role:** Converts meeting recordings into concise action bullet points and syncs them to task trackers.

## 12. Analytics Agent
- **Framework:** Pandas Query Agent
- **Role:** Processes custom CSV/Excel reports and generates narrative insights.

---

## Setup & Execution (Python Env)

### 1. Installation
Install the necessary AI and Graph libraries:
```bash
pip install langgraph langchain langchain-openai crewai pydantic
```

### 2. Running the Sales Agent
```bash
python sales_agent.py
```
