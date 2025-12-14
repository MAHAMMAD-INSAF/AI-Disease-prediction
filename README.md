# HealthPredict: AI-Powered Disease Prediction System

**HealthPredict** is an intelligent web application designed to provide preliminary disease predictions based on user-submitted symptoms. Leveraging a powerful Large Language Model (LLM), this tool offers a user-friendly interface for patients to input their details and symptoms, receiving instant, AI-driven insights into potential health conditions.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or MongoDB Atlas account

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MAHAMMAD-INSAF/AI-Disease-prediction.git
   cd AI-Disease-prediction
   ```

2. **Set up the Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory
   - Copy the contents from `.env.example` into your new `.env` file
   - Update the following variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `DEEPMED_API_KEY`: Your OpenRouter API key
     - `PORT`: Server port (default: 5000)

3. **Set up the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server:**
   ```bash
   # From the /backend directory
   npm start
   # or for development
   npm run dev
   ```
   The backend will be running on `http://localhost:5000`

2. **Start the Frontend Development Server:**
   ```bash
   # From the /frontend directory
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`

## 📋 Usage

1. **Patient Registration**: Fill out the patient information form with basic details
2. **Symptom Input**: Describe your symptoms using text input or voice recognition
3. **AI Prediction**: Receive instant disease predictions with accuracy percentages
4. **Detailed Results**: View comprehensive information about predicted diseases
5. **Nearby Facilities**: Find hospitals and pharmacies in your area using the interactive map
6. **Face Analysis**: Optional real-time facial expression analysis for additional insights

## 🔧 API Documentation

### Patient Prediction Endpoint

**POST** `/api/patients/predict`

Submits patient information and symptoms to get a disease prediction. Saves or updates the patient record in the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St, Anytown",
  "symptoms": "fever, cough, headache"
}
```

**Response:**
```json
{
  "diseases": [
    {
      "disease": "Common Cold",
      "accuracy": 85,
      "description": "A viral infection of the upper respiratory tract",
      "severity": "mild",
      "recoveryTime": "1-2 weeks",
      "medications": [
        {
          "name": "Acetaminophen",
          "dosage": "500mg every 6 hours",
          "purpose": "Pain relief and fever reduction"
        }
      ],
      "diet": [
        "Stay hydrated with warm fluids",
        "Eat light, nutritious meals"
      ],
      "precautions": [
        "Rest and avoid strenuous activities",
        "Use tissues when sneezing"
      ]
    }
  ],
  "recommendations": "Consult a healthcare professional for persistent symptoms"
}
```

### Patient History Endpoint

**GET** `/api/patients/history`

Retrieves patient prediction history.

**Query Parameters:**
- `name`: Patient name
- `phone`: Patient phone number

### Nearby Places Endpoint

**POST** `/api/places/nearby-free`

Finds nearby medical facilities using OpenStreetMap data.

**Request Body:**
```json
{
  "lat": 40.7128,
  "lng": -74.0060,
  "radius": 3000
}
```

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Leaflet**: Interactive maps
- **Face-API.js**: Facial recognition and expression analysis
- **React Webcam**: Webcam integration

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Axios**: HTTP client
- **OpenRouter API**: AI model integration



