from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from the microservice!"}

class CalculationRequest(BaseModel):
    num1: float
    num2: float
    operation: str

@app.post("/calculate")
def calculate(req: CalculationRequest):
    if req.operation == "add":
        result = req.num1 + req.num2
    elif req.operation == "subtract":
        result = req.num1 - req.num2
    elif req.operation == "multiply":
        result = req.num1 * req.num2
    elif req.operation == "divide":
        if req.num2 == 0:
            return {"error": "Division by zero is not allowed."}
        result = req.num1 / req.num2
    else:
        return {"error": "Invalid operation."}
    return {"result": result}