// Sample features (replace with your model's features)
const features = {
    'SquareFt': {type: 'range', min: 500, max: 5000, step: 100, value: 1500},
    'Bedrooms': {type: 'range', min: 1, max: 6, step: 1, value: 3},
    'Location': {type: 'select', options: ['Urban', 'Suburban', 'Rural']}
};

// Generate UI controls
function generateControls() {
    const checkboxesDiv = document.getElementById('feature-checkboxes');
    const inputsDiv = document.getElementById('input-controls');
    
    Object.entries(features).forEach(([name, config]) => {
        // Create checkboxes
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `check-${name}`;
        checkbox.checked = true;
        checkboxesDiv.appendChild(checkbox);
        checkboxesDiv.appendChild(document.createTextNode(name));
        checkboxesDiv.appendChild(document.createElement('br'));
        
        // Create input controls
        const controlDiv = document.createElement('div');
        controlDiv.className = 'control';
        controlDiv.id = `control-${name}`;
        
        if (config.type === 'range') {
            controlDiv.innerHTML = `
                <label for="${name}">${name}:</label>
                <input type="range" id="${name}" min="${config.min}" max="${config.max}" 
                       step="${config.step}" value="${config.value}">
                <span id="value-${name}">${config.value}</span>
            `;
        } else {
            controlDiv.innerHTML = `
                <label for="${name}">${name}:</label>
                <select id="${name}">
                    ${config.options.map(opt => `<option>${opt}</option>`).join('')}
                </select>
            `;
        }
        inputsDiv.appendChild(controlDiv);
    });
}

// Connect to Python backend
async function predict() {
    const selectedFeatures = {};
    
    Object.keys(features).forEach(name => {
        if (document.getElementById(`check-${name}`).checked) {
            const inputEl = document.getElementById(name);
            selectedFeatures[name] = inputEl.type === 'range' ? 
                parseInt(inputEl.value) : inputEl.value;
        }
    });
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(selectedFeatures)
        });
        
        const result = await response.json();
        document.getElementById('prediction-result').innerHTML = `
            <h3>Predicted Price: $${result.prediction.toLocaleString()}</h3>
        `;
    } catch (error) {
        console.error('Prediction error:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateControls();
    document.getElementById('predict-btn').addEventListener('click', predict);
});
