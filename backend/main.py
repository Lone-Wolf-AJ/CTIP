from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class PropertyData(BaseModel):
    rooms: int
    building_area: float
    landsize: float
    distance: float

@app.post("/predict")
async def predict_property_price(data: PropertyData):
    # For now, return a dummy prediction
    return {"predicted_price": 1000000}  # Placeholder value

