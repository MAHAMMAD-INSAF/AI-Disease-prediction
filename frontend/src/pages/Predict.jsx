import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaStethoscope } from 'react-icons/fa';
import RealTimeFaceHealth from '../components/RealTimeFaceHealth';

export default function Predict() {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const patientInfo = JSON.parse(localStorage.getItem('patientBasicInfo')) || {};

    if (!symptoms.trim()) {
      setError('Please enter your symptoms.');
      setIsLoading(false);
      return;
    }

    const formData = {
      ...patientInfo,
      symptoms,
    };

    try {
      // --- THIS IS THE FIX ---
      // The URL is corrected from '/api/predict' to '/api/patients/predict'
      const response = await axios.post('http://localhost:5000/api/patients/predict', formData);
      
      // Store the full prediction result
      localStorage.setItem('patientInfo', JSON.stringify({ ...patientInfo, prediction: response.data }));

      navigate('/result');
    } catch (err) {
      console.error("Prediction API error:", err);
      setError('Failed to get predictions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-700">Describe Your Symptoms</h2>
            <p className="text-gray-600 mt-2">Please be as detailed as possible for an accurate diagnosis.</p>
          </div>
          <div className="mb-8">
            <RealTimeFaceHealth />
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <FaStethoscope className="absolute left-4 top-4 text-blue-600" />
              <textarea
                name="symptoms"
                placeholder="e.g., I have a high fever, headache, and a sore throat..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg resize-none"
                rows={5}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center font-medium">{error}</p>}
            <Button className="w-full py-4 text-lg mt-2" type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Get Prediction'}
            </Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}