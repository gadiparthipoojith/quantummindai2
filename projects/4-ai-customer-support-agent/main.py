from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os
import json

app = FastAPI(title="AI Customer Support Agent API")

class ChatQuery(BaseModel):
    message: str
    session_id: str

# Mock Database for CRM tickets
tickets_db = {}

def get_ticket(ticket_id: str):
    return tickets_db.get(ticket_id, {"error": "Ticket not found"})

def create_ticket(email: str, subject: str, description: str):
    ticket_id = f"TKT-{len(tickets_db) + 1001}"
    tickets_db[ticket_id] = {
        "id": ticket_id,
        "email": email,
        "subject": subject,
        "description": description,
        "status": "OPEN"
    }
    return tickets_db[ticket_id]

@app.post("/api/chat")
async def chat_support(query: ChatQuery):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Fallback support responses simulating dynamic function call routing
        if "order" in query.message.lower():
            return {
                "message": "I found your order! However, it appears delayed in transit. Let me create a support ticket for you.",
                "action": "create_ticket",
                "ticket": create_ticket("client@example.com", "Order Delayed Tracking Request", query.message)
            }
        return {
            "message": "Thank you for contacting support. I have searched our database. Our refund policy allows returns within 30 days of purchase.",
            "action": "info_retrieval"
        }

    client = openai.OpenAI(api_key=api_key)
    
    # System instructions defining function tools
    tools = [
        {
            "type": "function",
            "function": {
                "name": "create_ticket",
                "description": "Create a new support ticket in the CRM for manual inspection",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "email": {"type": "string", "description": "Client email address"},
                        "subject": {"type": "string", "description": "Short summary of the problem"},
                        "description": {"type": "string", "description": "Full description of the ticket content"}
                    },
                    "required": ["email", "subject", "description"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "get_ticket",
                "description": "Retrieve ticket details from the CRM",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticket_id": {"type": "string", "description": "Ticket ID starting with TKT-"}
                    },
                    "required": ["ticket_id"]
                }
            }
        }
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an automated support agent. Help the user. Use tools to create or search tickets if needed."},
                {"role": "user", "content": query.message}
            ],
            tools=tools
        )
        
        message = response.choices[0].message
        
        if message.tool_calls:
            tool_call = message.tool_calls[0]
            args = json.loads(tool_call.function.arguments)
            
            if tool_call.function.name == "create_ticket":
                res = create_ticket(args["email"], args["subject"], args["description"])
                return {"message": "I have successfully created a support ticket for you.", "action": "create_ticket", "ticket": res}
            
            elif tool_call.function.name == "get_ticket":
                res = get_ticket(args["ticket_id"])
                return {"message": "I found the ticket details in our CRM.", "action": "get_ticket", "ticket": res}

        return {"message": message.content, "action": "chat"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
