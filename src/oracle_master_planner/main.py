import os
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from oracle_master_planner.iching_logic import perform_divination

app = FastAPI(title="Oracle & Calendar Master Planner API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DivineRequest(BaseModel):
    question: str = ""

@app.get("/")
def read_root():
    return {"status": "online", "engine": "Gemini 2.5 Pro Triad Architecture"}

# Support BOTH routes so neither the frontend nor the test runner throws a 404
@app.post("/api/v1/divine")
@app.post("/cast")
def cast_oracle(request: DivineRequest):
    return perform_divination(question=request.question)
