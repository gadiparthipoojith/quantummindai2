# AetherForge Collective — AI Automation Workflows (n8n, Zapier, Make.com)

This guide documents the production-grade integration workflows for all 9 automated processes.

---

## 1. Lead Generation Workflow (n8n)
- **Import File:** [n8n_lead_gen_workflow.json](file:///c:/Users/gadip/OneDrive/Desktop/FreeLancing/automations/n8n_lead_gen_workflow.json)
- **Description:** Receives inbound webhooks from lead forms, parses them with OpenAI API tools, pushes qualified leads to Supabase, and updates Slack.

## 2. Invoice Automation (Zapier)
- **Trigger:** Stripe (New Invoice Created)
- **Action:**
  1. Filter for specific agency customers.
  2. Parse line items and map billing taxes.
  3. Push details to QuickBooks / Xero.
  4. Auto-email client PDF receipt using Gmail node.

## 3. Email Automation (n8n)
- **Trigger:** IMAP / Gmail node (New message in Inbox)
- **Action:**
  1. Classify sentiment with AI (positive, negative, inquiry).
  2. Draft reply inside drafts folder.
  3. Send Slack notification for high-urgency client escalations.

## 4. CRM Automation (Make.com)
- **Trigger:** Webhook (New Contact form submission)
- **Action:**
  1. Verify email validity via ZeroBounce.
  2. Add lead record in HubSpot / Salesforce.
  3. Assign sales lead owner based on geography.

## 5. WhatsApp Automation (Make.com)
- **Trigger:** Twilio Hook (New WhatsApp Message)
- **Action:**
  1. Query Pinecone database vector space for match.
  2. Generate RAG context response.
  3. Reply back to client chat stream.

## 6. Social Media Automation (n8n)
- **Trigger:** Schedule node (Every Monday at 9 AM)
- **Action:**
  1. Pull drafted content from Google Sheets / Airtable database.
  2. Auto-generate promotional images using BannerBear.
  3. Schedule postings across LinkedIn, Twitter/X, and Instagram threads.

## 7. Document Processing & PDF Automation (n8n)
- **Trigger:** Google Drive / OneDrive (New file uploaded in 'Invoices' folder)
- **Action:**
  1. Extract structured invoice tables using OCR (OpenAI Document Intelligence).
  2. Convert line items into unified JSON schemas.
  3. Insert billing line items to financial ledger sheets.

## 8. Excel Automation (Zapier)
- **Trigger:** Webhook (New database records log)
- **Action:**
  1. Format numbers, clean columns, and append rows in Google Sheets / Excel.
  2. Calculate performance metrics (latency, error rates).
  3. Schedule monthly report summaries.

---

## Setup Instructions
- **n8n:** Open n8n Canvas, click `Import from File`, select the workflow JSON, and configure your API tokens (OpenAI, Supabase, Slack).
- **Zapier:** Set up custom triggers matching the schema guidelines.
- **Make.com:** Recreate scenarios utilizing direct HTTP webhooks.
