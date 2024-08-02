from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class DataModel(BaseModel):
    data: List[str]

@app.get("/")
async def root():
    return {"message": "backend is up and running"}

@app.post("/bfhl")
async def bfhl(data_model: DataModel):
    data = data_model.data
    user_id = "smitkumar_kunpara_14082003"
    email = "smitkumar_kunpara@srmap.edu.in"
    roll_number = "AP21110011275"
    numbers = []
    alphabets = []
    highest_alphabet = []
    is_success = True
    for item in data:
        if item.isnumeric():
            numbers.append(item)
        else:
            alphabets.append(item)
    if alphabets:
        highest_alphabet.append(max(alphabets))
    
    return {
        "is_success": is_success,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }

@app.get("/bfhl")
async def bfhl_get():
    return {
        "operation_code": 1
    }
    
    