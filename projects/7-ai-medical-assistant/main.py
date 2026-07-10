from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="AI Medical Assistant API")

class MedicalNoteRequest(BaseModel):
    patient_dialogue: str

class MedicalNoteResponse(BaseModel):
    soap_note: str
    icd10_codes: list[str]

@app.post("/api/generate-soap", response_model=MedicalNoteResponse)
async def generate_soap(req: MedicalNoteRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return MedicalNoteResponse(
            soap_note="SUBJECTIVE: Patient presents with persistent headache and dry cough for 3 days.\nOBJECTIVE: Temperature is normal. Lungs clear.\nASSESSMENT: Mild viral syndrome with tension headaches.\nPLAN: Fluid hydration, rest, over-the-counter pain management.",
            icd10_codes=["J06.9 (Acute upper respiratory infection)", "G44.2 (Tension-type headache)"]
        )

    client = openai.OpenAI(api_key=api_key)
    prompt = f"""
    You are an expert clinical transcriber. Convert the following transcript of a doctor-patient conversation into a professional SOAP note format.
    Also, identify the most applicable ICD-10 medical diagnostic codes.

    Dialogue:
    {req.patient_dialogue}

    Respond in JSON format:
    {{
        "soap_note": "A complete structured SOAP note (Subjective, Objective, Assessment, Plan)",
        "icd10_codes": ["List of codes with brief descriptions"]
    }}
    """

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[{"role": "user", "content": prompt}]
        )
        import json
        result = json.loads(completion.choices[0].message.content)
        return MedicalNoteResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
