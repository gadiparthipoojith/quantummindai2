from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import tool
import os

@tool
def fetch_arxiv_papers(query: str) -> str:
    """Search arXiv database for scientific preprints and papers matching a query."""
    # Mocking scientific paper retrieval
    return f"Paper 1: 'Stateful Agent Orchestration' - arXiv:2403.1192. Abstract: Discusses LangGraph state charts.\nPaper 2: 'Retrieval Augmented Grading' - arXiv:2401.4091."

@tool
def summarize_text(text: str) -> str:
    """Summarize scientific text and extract core concepts."""
    return f"Summary: Stateful graph transitions improve agent reliability compared to standard reactive chains."

def run_research(query: str):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Local mock response
        return "Stateful agent frameworks like LangGraph solve state management errors (arXiv:2403.1192)."
        
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)
    tools = [fetch_arxiv_papers, summarize_text]
    
    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )
    
    return agent.run(query)

if __name__ == "__main__":
    res = run_research("Find papers about AI agent design patterns and compile a summary.")
    print("Research Result:")
    print(res)
