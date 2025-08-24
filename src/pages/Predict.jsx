

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaHeartbeat } from 'react-icons/fa';
import { MdOutlineHealing } from 'react-icons/md';

export default function Predict() {
  const [symptoms, setSymptoms] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const basicInfo = JSON.parse(localStorage.getItem('patientBasicInfo')) || {};
    const fullInfo = { ...basicInfo, symptoms };
    localStorage.setItem('patientInfo', JSON.stringify(fullInfo));
    navigate('/result');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center mb-10 gap-4">
            <FaHeartbeat className="text-6xl text-pink-600 animate-pulse" />
            <h2 className="text-4xl font-bold text-blue-700 tracking-tight">Describe Your Symptoms</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="flex items-start gap-3">
              <MdOutlineHealing className="text-3xl text-green-600 mt-2" />
              <textarea
                name="symptoms"
                className="w-full p-5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-300 focus:outline-none text-lg resize-none"
                rows="6"
                placeholder="e.g. fever, cough, sore throat..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              ></textarea>
            </div>
<Button type="submit" className="w-full py-4 text-lg mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">Predict Disease</Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}
