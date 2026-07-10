from typing import Annotated, TypedDict, Union
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
import os

# Define the state shape for the sales agent
class AgentState(TypedDict):
    messages: list[BaseMessage]
    lead_score: int
    qualified: bool
    email_draft: str

# Define tools/actions
def qualify_lead(state: AgentState) -> dict:
    messages = state["messages"]
    last_message = messages[-1].content.lower()
    
    score = 40
    if "budget" in last_message or "pricing" in last_message:
        score += 30
    if "enterprise" in last_message or "integration" in last_message:
        score += 30
        
    return {
        "lead_score": score,
        "qualified": score >= 70
    }

def generate_outbound(state: AgentState) -> dict:
    if not state["qualified"]:
        return {"email_draft": "Lead unqualified. Scheduling no follow-ups."}
        
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {
            "email_draft": "Hi Partner,\n\nI noticed you are looking for enterprise AI integrations. Let's schedule a call next Tuesday.\n\nBest,\nSales Agent"
        }
        
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)
    prompt = f"Draft a high-converting, professional meeting request email for a lead interested in AI agents. Lead info: {state['messages'][-1].content}"
    response = llm.invoke(prompt)
    
    return {"email_draft": response.content}

# Router logic
def route_next_step(state: AgentState):
    if state["qualified"]:
        return "generate_outbound"
    return END

# Build the LangGraph workflow
workflow = StateGraph(AgentState)

# Define nodes
workflow.add_node("qualify_lead", qualify_lead)
workflow.add_node("generate_outbound", generate_outbound)

# Set entry point
workflow.set_entry_point("qualify_lead")

# Define conditional edge
workflow.add_conditional_edges(
    "qualify_lead",
    route_next_step,
    {
        "generate_outbound": "generate_outbound",
        END: END
    }
)

# Connect outbound node to end
workflow.add_edge("generate_outbound", END)

# Compile graph
sales_agent = workflow.compile()

if __name__ == "__main__":
    initial_state = {
        "messages": [HumanMessage(content="We are looking to deploy an enterprise-grade AI chatbot with a budget of $15,000 next month.")],
        "lead_score": 0,
        "qualified": False,
        "email_draft": ""
    }
    result = sales_agent.invoke(initial_state)
    print("Email Draft Generated:")
    print(result["email_draft"])
