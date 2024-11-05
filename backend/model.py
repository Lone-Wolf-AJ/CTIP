import numpy as np
from sklearn.metrics import mean_squared_error, r2_score
import joblib

import pandas as pd
import matplotlib.pyplot as plt
import seaborn
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor


# Load the dataset
data = pd.read_csv('Property_Sales_of_Melbourne_City.csv')

# Drop the unnecesary data
data = data.drop(['Address', 'Date'], axis=1)

# Fill missing numerical values with the mean of the respective column
numerical_cols = data.select_dtypes(include=['int64', 'float64']).columns
data[numerical_cols] = data[numerical_cols].fillna(data[numerical_cols].mean())

# Remove rows with extreme values based on the Price column
Q1 = data['Price'].quantile(0.25)
Q3 = data['Price'].quantile(0.75)
IQR = Q3 - Q1
data = data[~((data['Price'] < (Q1 - 1.5 * IQR)) | (data['Price'] > (Q3 + 1.5 * IQR)))]

# Selecting relevant features
X = data[['Rooms', 'BuildingArea', 'Landsize', 'Distance']]
y = data['Price']

# Split the data to train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model Training using Gradient Boosting Regressor
model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Print the evaluation results
print(f"Mean Squared Error (MSE): {mse}")
print(f"R² Score: {r2}")

# Visualizations
# Individual Plot: Actual vs Predicted Prices
plt.figure(figsize=(14, 8))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.title('Actual vs Predicted Prices')
plt.xlabel('Actual Prices')
plt.ylabel('Predicted Prices')
plt.grid()
plt.show()

# Individual Plot: Residual Plot
residuals = y_test - y_pred
plt.figure(figsize=(14, 8))
plt.scatter(y_pred, residuals, alpha=0.5)
plt.axhline(0, color='red', linestyle='--', lw=2)
plt.title('Residuals vs Predicted Prices')
plt.xlabel('Predicted Prices')
plt.ylabel('Residuals')
plt.grid()
plt.show()

# Visualizations for Price vs Important Attributes

# Price vs Rooms
# Average Price vs Number of Rooms
avg_price_by_rooms = data.groupby('Rooms')['Price'].mean().reset_index()

plt.figure(figsize=(12, 6))
seaborn.barplot(x='Rooms', y='Price', data=avg_price_by_rooms, hue='Rooms', legend=False,  palette='viridis')
plt.title('Average Price vs Number of Rooms')
plt.xlabel('Number of Rooms')
plt.ylabel('Average Price')
plt.xticks(rotation=0)  # Rotate x-axis labels for better readability
plt.tight_layout()
plt.show()



# Price vs Distance from CBD
# Create bins for Distance from CBD
bins = np.arange(0, data['Distance'].max() + 5, 5)  # Binning distances every 5 km
data['Distance_Binned'] = pd.cut(data['Distance'], bins)

# Aggregate data to get average price per distance bin
avg_price_by_distance = data.groupby('Distance_Binned')['Price'].mean().reset_index()

# Plot
plt.figure(figsize=(12, 6))
seaborn.barplot(x='Distance_Binned', y='Price', data=avg_price_by_distance, palette='viridis', hue='Distance_Binned', legend=False)
plt.title('Average Price vs Distance from CBD')
plt.xlabel('Distance from CBD (Binned)')
plt.ylabel('Average Price')
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.tight_layout()
plt.show()
