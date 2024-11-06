# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import traceback
import pandas as pd
import numpy as np

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

# Load the dataset once to be used for both endpoints
data = pd.read_csv('melb_data.csv')

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

# Endpoint for heatmap of all Melbourne
@app.get("/heatmap")
async def get_heatmap_data():
    heatmap_data = data.groupby('Suburb').agg(
        median_price=('Price', 'median'),
        Lattitude=('Lattitude', 'first'),
        Longtitude=('Longtitude', 'first')
    ).reset_index()
    return heatmap_data.to_dict(orient="records")

# Endpoint for heatmap of a specific suburb
@app.get("/suburb-heatmap")
async def get_suburb_heatmap_data(suburb: str):
    try:
        print(f"Received request for suburb: {suburb}")

        if data.empty:
            raise HTTPException(status_code=500, detail="Data not loaded")

        required_columns = ['Suburb', 'Price', 'Lattitude', 'Longtitude', 'Rooms', 'BuildingArea', 'Landsize', 'Distance']
        missing_columns = [col for col in required_columns if col not in data.columns]
        if missing_columns:
            raise HTTPException(status_code=500, detail=f"Missing columns in dataset: {missing_columns}")

        suburb_data = data[data['Suburb'].str.lower().str.strip() == suburb.lower().strip()]
        if suburb_data.empty:
            raise HTTPException(status_code=404, detail="No data found for this suburb")

        suburb_data = suburb_data.replace([np.inf, -np.inf], np.nan).fillna({
            'Price': 0,
            'Rooms': 0,
            'BuildingArea': 0,
            'Landsize': 0,
            'Distance': 0,
            'Lattitude': -37.8136,
            'Longtitude': 144.9631
        })

        heatmap_data = suburb_data[['Price', 'Lattitude', 'Longtitude', 'Rooms', 'BuildingArea', 'Landsize', 'Distance']].to_dict(orient="records")
        return heatmap_data

    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")

# Attribute effect on price endpoint
@app.get("/attribute-effect")
async def get_attribute_effect(suburb: str):
    suburb_data = data[data['Suburb'].str.lower().str.strip() == suburb.lower().strip()]
    if suburb_data.empty:
        raise HTTPException(status_code=404, detail="No data found for this suburb")

    # Correlation with price to see effect of each attribute
    correlation = suburb_data[['Rooms', 'BuildingArea', 'Landsize', 'Distance', 'Price']].corr()['Price']
    correlation = correlation.drop('Price')  # Exclude price itself
    return correlation.to_dict()

# Histogram for property types with room/toilet count
@app.get("/property-type-histogram")
async def get_property_type_histogram(suburb: str):
    suburb_data = data[data['Suburb'].str.lower().str.strip() == suburb.lower().strip()]
    if suburb_data.empty:
        raise HTTPException(status_code=404, detail="No data found for this suburb")

    # Filter required columns for property types, room count, and toilet count
    histogram_data = suburb_data[['Type', 'Rooms', 'Bathroom', 'Price']]
    histogram_data = histogram_data.dropna()

    return histogram_data.to_dict(orient="records")

# New endpoint for price distribution by property type, room count, and toilet count
@app.get("/price-distribution")
@app.get("/price-distribution")
async def get_price_distribution(suburb: str):
    # Filter the data by suburb
    suburb_data = data[data['Suburb'].str.lower().str.strip() == suburb.lower().strip()]

    if suburb_data.empty:
        raise HTTPException(status_code=404, detail="No data found for this suburb")

    # Ensure that data has required columns
    required_columns = ['Rooms', 'Price', 'Bathroom', 'Type']
    missing_columns = [col for col in required_columns if col not in suburb_data.columns]
    if missing_columns:
        raise HTTPException(status_code=500, detail=f"Missing columns in dataset: {missing_columns}")

    # Return only necessary columns
    result_data = suburb_data[['Rooms', 'Price', 'Bathroom', 'Type']].to_dict(orient="records")
    return result_data