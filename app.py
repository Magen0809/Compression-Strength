import streamlit as st
import pandas as pd
import joblib

# Load trained model
model = joblib.load('best_model.pkl')

st.set_page_config(page_title="Compression Strength Predictor", layout="centered")

st.title("💪 Compression Strength Predictor (ML Model)")

st.markdown("Enter the values below to predict the compressive strength of the material.")

# Input sliders
cement = st.slider("Cement (%)", 0.0, 100.0, 10.0)
sand = st.slider("Sand (%)", 0.0, 100.0, 20.0)
glass = st.slider("Glass Waste (%)", 0.0, 100.0, 5.0)
water = st.slider("Water (L)", 100.0, 300.0, 200.0)

# Prepare input for model
input_df = pd.DataFrame({
    'cement': [cement],
    'sand': [sand],
    'glass': [glass],
    'water': [water]
})

st.write("### Input Data", input_df)

# Predict
if st.button("Predict Compression Strength"):
    prediction = model.predict(input_df)
    st.success(f"Predicted Compressive Strength: {prediction[0]:.2f} MPa")
