import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaTablets, FaUtensils, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import Card from '../components/Card';

export default function PredictionResult() {
  const location = useLocation();
  const { prediction } = location.state || { prediction: null };

  if (!prediction) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">No prediction data available.</h2>
        <p className="mt-2 text-gray-600">Please go back and submit your symptoms first.</p>
      </div>
    );
  }

  const { diseases, recommendations } = prediction;

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <FaStethoscope className="mx-auto text-5xl text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Medical Prediction Results</h1>
          <p className="mt-4 text-lg text-gray-600">Based on the symptoms you provided.</p>
        </div>
      </motion.div>

      {diseases?.map((diseaseInfo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
        >
          <Card className="mb-8 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-blue-800">{diseaseInfo.disease}</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getSeverityColor(diseaseInfo.severity)}`}>
                  {diseaseInfo.severity}
                </span>
              </div>
              <p className="text-sm text-gray-500">Accuracy: {diseaseInfo.accuracy}%</p>
              <p className="mt-4 text-gray-700">{diseaseInfo.description}</p>
              <p className="mt-2 text-sm text-gray-600"><strong>Recovery Time:</strong> {diseaseInfo.recoveryTime}</p>
            </div>

            {diseaseInfo.medications && (
              <div className="border-t border-gray-200 p-6">
                <h3 className="flex items-center text-lg font-semibold text-gray-800"><FaTablets className="mr-3 text-blue-500" />Medications</h3>
                <ul className="mt-4 space-y-3">
                  {diseaseInfo.medications.map((med, i) => (
                    <li key={i} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-gray-600"><strong>Dosage:</strong> {med.dosage}</p>
                      <p className="text-sm text-gray-600"><strong>Purpose:</strong> {med.purpose}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 border-t border-gray-200">
              {diseaseInfo.diet && (
                <div className="p-6">
                  <h3 className="flex items-center text-lg font-semibold text-gray-800"><FaUtensils className="mr-3 text-green-500" />Diet Recommendations</h3>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                    {diseaseInfo.diet.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {diseaseInfo.precautions && (
                <div className="p-6 md:border-l border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold text-gray-800"><FaExclamationTriangle className="mr-3 text-yellow-500" />Precautions</h3>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                    {diseaseInfo.precautions.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}

      {recommendations && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: diseases.length * 0.2 + 0.2 }}>
          <Card>
            <div className="p-6">
              <h2 className="flex items-center text-xl font-bold text-gray-800"><FaInfoCircle className="mr-3 text-indigo-500" />General Recommendations</h2>
              <p className="mt-4 text-gray-700">{recommendations}</p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}