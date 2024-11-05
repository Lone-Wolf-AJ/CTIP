# backend/main.py
from fastapi import FastAPI
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
    # Load data and group by Suburb, calculating the average price and representative coordinates
    data = pd.read_csv('melb_data.csv')  # Ensure 'melb_data.csv' contains 'Suburb', 'Lattitude', 'Longtitude', 'Price'
    
    # Group by suburb, calculating the average price, and take the first latitude/longitude for simplicity
    heatmap_data = data.groupby('Suburb').agg(
        median_price=('Price', 'median'),
        Lattitude=('Lattitude', 'first'),
        Longtitude=('Longtitude', 'first')
    ).reset_index()
    
    # Convert to a list of dictionaries for JSON response
    return heatmap_data.to_dict(orient="records")