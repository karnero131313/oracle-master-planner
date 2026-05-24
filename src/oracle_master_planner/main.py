from fastapi import FastAPI
from pydantic import BaseModel
from .iching_logic import perform_divination

class DivinationRequest(BaseModel):
    question: str

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "The Oracle is awake."}

@app.post("/api/v1/divine")
def get_divination(request: DivinationRequest):
    """
    Accepts a question and returns a full I Ching divination.
    """
    divination_result = perform_divination(request.question)
    return divination_result
