# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

# Load the dataset once to be used for both endpoints
data = pd.read_csv('melb_data.csv')  # Ensure 'melb_data.csv' contains 'Suburb', 'Lattitude', 'Longtitude', 'Price'

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
    # Group by suburb, calculating the median price, and take the first latitude/longitude for simplicity
    heatmap_data = data.groupby('Suburb').agg(
        median_price=('Price', 'median'),
        Lattitude=('Lattitude', 'first'),
        Longtitude=('Longtitude', 'first')
    ).reset_index()
    
    # Convert to a list of dictionaries for JSON response
    return heatmap_data.to_dict(orient="records")

# Endpoint for heatmap of a specific suburb
@app.get("/suburb-heatmap")
async def get_suburb_heatmap_data(suburb: str):
    try:
        print(f"Received request for suburb: {suburb}")  # Debugging statement

        # Filter data by the specified suburb
        suburb_data = data[data['Suburb'].str.lower().str.strip() == suburb.lower().strip()]

        if suburb_data.empty:
            print(f"No data found for suburb: {suburb}")  # Debug statement
            raise HTTPException(status_code=404, detail="No data found for this suburb")

        # Prepare the data for each property in the suburb
        heatmap_data = suburb_data[['Price', 'Lattitude', 'Longtitude']].to_dict(orient="records")
        
        print(f"Returning data for suburb: {suburb}, Number of properties: {len(heatmap_data)}")  # Debugging statement
        return heatmap_data

    except Exception as e:
        print(f"An error occurred: {e}")  # Print the error
        raise HTTPException(status_code=500, detail="Internal server error")
