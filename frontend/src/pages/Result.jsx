import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Result() {
  const navigate = useNavigate();
  const patientInfo = JSON.parse(localStorage.getItem('patientInfo')) || {};

  const predictions = patientInfo.prediction?.diseases || [];

  const handleDiseaseClick = (diseaseName) => {
    navigate(`/disease/${diseaseName}`);
  };

  if (!patientInfo.name || !predictions.length) {
    return (
      <div className="max-w-xl mx-auto p-8 mt-12">
        <Card className="w-full text-center p-10">
          <h2 className="text-2xl font-bold text-red-600 mb-4">No Predictions Found</h2>
          <p className="mb-6 text-gray-700">Please complete the symptom form first.</p>
          <Button
            onClick={() => navigate('/predict')}
          >
            Go to Symptom Form
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
            Diagnosis Results
          </h2>

          {/* Patient Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Patient Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg text-gray-700">
              {['name', 'phone', 'address', 'symptoms'].map((field) => (
                <div key={field} className={`border-b border-gray-200 py-2 ${field === 'symptoms' || field === 'address' ? 'md:col-span-2' : ''}`}>
                  <span className="text-blue-600 font-medium capitalize">{field}:</span>
                  <p className="font-normal text-gray-600 mt-1">{patientInfo[field]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Predictions */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {predictions.map((item, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.07, boxShadow: '0 8px 30px rgba(37, 99, 235, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => handleDiseaseClick(item.disease)}
              >
                <h3 className="text-2xl font-bold text-blue-700 mb-4 truncate">{item.disease}</h3>
                <p className="text-sm text-gray-500 mb-2">Estimated Accuracy</p>
                <p className="font-bold text-5xl mb-6 text-gray-800">{item.accuracy}%</p>

                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
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
