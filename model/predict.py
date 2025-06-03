from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load model
with open('model/model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        input_data = request.json
        
        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Predict
        prediction = model.predict(input_df)[0]
        
        return jsonify({
            'prediction': round(float(prediction), 2),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)
