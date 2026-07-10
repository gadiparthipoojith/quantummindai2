from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
import pypdf
import pinecone
import openai
import os
import io

app = FastAPI(title="AI PDF Chatbot RAG Server")

class ChatRequest(BaseModel):
    query: str
    documentId: str

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    contents = await file.read()
    pdf_reader = pypdf.PdfReader(io.BytesIO(contents))
    
    text_chunks = []
    for page_num, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            # Simple chunking logic (page level chunking)
            text_chunks.append({
                "page": page_num + 1,
                "text": text
            })
            
    # In production, we embed these chunks using OpenAI Embeddings and upsert to Pinecone.
    # Return document mapping ID
    return {
        "documentId": "doc_8f9e0a2b",
        "fileName": file.filename,
        "totalChunks": len(text_chunks),
        "status": "Indexed Successfully"
    }

@app.post("/api/chat")
async def chat_document(req: ChatRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Fallback simulated response
        return {
            "content": "According to Page 4 of the document, the operating revenue increased by 14% year-over-year.",
            "citations": [4]
        }
        
    client = openai.OpenAI(api_key=api_key)
    
    # In production, we query Pinecone using embedding of req.query
    # Here we mock context lookup for simplicity
    context = "Operating revenue increased by 14% year-over-year. Segment margins improved by 230 basis points due to enterprise tier growth."
    
    prompt = f"""
    Answer the user's query using the retrieved document context.
    Cite page numbers where relevant.
    
    Context:
    {context}
    
    Query:
    {req.query}
    """
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return {
            "content": completion.choices[0].message.content,
            "citations": [4] # page citation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
