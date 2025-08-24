

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

export default function Result() {
  const navigate = useNavigate();
  const patientInfo = JSON.parse(localStorage.getItem('patientInfo')) || {};

  const predictions = [
    { disease: 'Flu', accuracy: 85 },
    { disease: 'Common Cold', accuracy: 70 },
    { disease: 'Malaria', accuracy: 60 },
  ];

  const handleDiseaseClick = (diseaseName) => {
    navigate(`/disease/${diseaseName}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12 tracking-wide">
            Diagnosis Results
          </h2>

          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 space-y-6 border border-blue-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Patient Info</h3>
            <div className="space-y-4 text-lg text-gray-700 max-w-2xl mx-auto">
              {['name', 'phone', 'address', 'symptoms'].map((field) => (
                <div key={field} className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-blue-600 font-medium capitalize">{field}:</span>
                  <p className="font-semibold text-gray-600 max-w-[70%] text-right">{patientInfo[field]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {predictions.map((item, index) => (
              <motion.div
                key={index}
                className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl shadow-2xl border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.07, boxShadow: '0 8px 30px rgba(37, 99, 235, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => handleDiseaseClick(item.disease)}
              >
                <h3 className="text-3xl font-semibold mb-6">{item.disease}</h3>
                <p className="text-lg font-medium mb-3">Estimated Accuracy</p>
                <p className="font-bold text-4xl mb-6">{item.accuracy}%</p>

                <div className="w-full bg-blue-300 h-4 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.accuracy}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
