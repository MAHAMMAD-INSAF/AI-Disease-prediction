# HealthPredict: AI-Powered Health Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

HealthPredict is an intelligent web application designed to provide users with instant, AI-driven preliminary health diagnoses. By leveraging a machine learning model, the application analyzes user-reported symptoms to predict potential diseases, offering detailed information and actionable next steps to guide users toward appropriate medical care.

## ✨ Key Features

- **Symptom-Based Disease Prediction**: Users can input their health symptoms in natural language to receive a list of potential diseases with calculated accuracy scores.
- **Detailed Disease Information**: Provides comprehensive details for each predicted disease, including:
  - Description, severity, and estimated recovery time.
  - Recommended medications with dosage and purpose.
  - Suggested dietary plans and lifestyle precautions.
- **Real-Time Facial Condition Analysis**: An innovative feature using the device's webcam and `face-api.js` to perform real-time facial expression analysis for a preliminary assessment of the user's general condition.
- **Nearby Medical Facility Locator**: An integrated OpenStreetMap feature that uses the user's geolocation to find and display nearby hospitals and pharmacies, complete with details and directions.
- **Responsive & Modern UI**: A clean, responsive, and intuitive user interface built with React and Tailwind CSS, enhanced with smooth animations from Framer Motion.
- **Patient History**: The backend is designed to save prediction history for registered users (based on name and phone number).

## 🚀 Technology Stack

### Frontend

- **Framework**: React.js
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Mapping**: React Leaflet & Leaflet.js
- **Facial Analysis**: face-api.js & React Webcam
- **Icons**: React Icons

### Backend

- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Machine Learning**: The prediction service is called from the Node.js backend, likely running a Python-based model.

## 📂 Project Structure

```
HealthPredict/
├── backend/
│   ├── models/
│   │   └── Patient.js        # Mongoose schema for patients
│   ├── routes/
│   │   └── patient.js        # API routes for patient and prediction logic
│   ├── predictionService.js  # Service to interact with the ML model
│   └── ...                   # Other backend files (server.js, etc.)
│
└── frontend/
    ├── public/
    │   └── models/           # Models for face-api.js
    ├── src/
    │   ├── assets/           # Images and static assets
    │   ├── components/       # Reusable React components (Navbar, Card, Button, etc.)
    │   ├── pages/            # Page components for different routes (Home, Predict, Result)
    │   ├── App.jsx           # Main application component with routing
    │   └── index.js          # Entry point for the React app
    └── ...
```

## ⚙️ Setup and Installation

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python and a virtual environment tool (for the ML model)
- MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/MAHAMMAD-INSAF/AI-Disease-prediction.git
cd AI-Disease-prediction
```

### 2. Backend Setup

```bash
cd backend

# Install Node.js dependencies
npm install

# Create a .env file and add your environment variables
touch .env
```

Your `.env` file should contain:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install frontend dependencies
npm install

# Copy face-api.js models to the public folder
# Download from the face-api.js repository and place them in `frontend/public/models`
```

### 4. Running the Application

1.  **Start the Backend Server**:
    ```bash
    cd backend
    npm start
    ```

2.  **Start the Frontend Development Server**:
    ```bash
    cd frontend
    npm start
    ```

The application should now be running at `http://localhost:3000`.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.