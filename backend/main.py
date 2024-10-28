# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Load the model
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

# Define input data model
class PropertyData(BaseModel):
    rooms: int
    building_area: float
    landsize: float
    distance: float

# Prediction endpoint
@app.post("/predict")
async def predict_price(data: PropertyData):
    input_data = [[data.rooms, data.building_area, data.landsize, data.distance]]
    prediction = model.predict(input_data)
    return {"predicted_price": prediction[0]}

@app.get("/")
async def root():
    return {"message": "Welcome to the Property Price Prediction API"}


@app.get("/heatmap")
async def get_heatmap_data():
    # Sample data for testing, replace with actual data logic
    data = pd.DataFrame({"Regionname": ["Region1", "Region2"], "Price": [500000, 700000]})
    heatmap_data = data.to_dict(orient="records")
    return heatmap_data