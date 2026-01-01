import React, { useState } from "react";
import axios from "axios";
import RealTimeFaceHealth from "../components/RealTimeFaceHealth";

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPrediction(null);

    try {
      // This endpoint should match your backend route, e.g., /api/patients/predict
      const response = await axios.post("/api/patients/predict", { symptoms });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Failed to get prediction. Please check the console for details.");
      console.error("Prediction API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          AI Disease Predictor
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Symptom Input and Prediction */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🩺 Symptom Checker</h2>
            <form onSubmit={handlePredict}>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., fever, headache, cough"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows="4"
              ></textarea>
              <button type="submit" disabled={isLoading} className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition">
                {isLoading ? "Analyzing..." : "Predict Disease"}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {prediction && <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg"><p className="text-green-800 font-semibold">{prediction}</p></div>}
          </div>

          {/* Right Column: Real-time Face Health */}
          <RealTimeFaceHealth />
        </div>
      </div>
    </div>
  );
}