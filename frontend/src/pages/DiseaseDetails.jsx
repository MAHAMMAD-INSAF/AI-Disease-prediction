import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaPills, FaAppleAlt, FaExclamationTriangle, FaArrowLeft, FaInfoCircle, FaStethoscope, FaClock } from 'react-icons/fa';

export default function DiseaseDetails() {
  const { diseaseName } = useParams();
  const navigate = useNavigate();

  const patientInfo = JSON.parse(localStorage.getItem('patientInfo')) || {};
  const disease = (patientInfo.prediction?.diseases || []).find(d => d.disease === diseaseName);

  if (!disease) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-2">
        <Card className="w-full text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Disease Not Found</h2>
            <p className="text-gray-600 mb-6">The requested disease information is not available.</p>
            <Button onClick={() => navigate('/result')}>Back to Results</Button>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-2">
      <Card className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* Header */}
          <div className="mb-8">
            <Button onClick={() => navigate('/result')} className="flex items-center gap-2 mb-6">
              <FaArrowLeft /> Back to Results
            </Button>
            <motion.div className="text-center mb-8" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl font-bold text-blue-700 mb-4">{disease.disease}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{disease.description}</p>
              <div className="mt-6 flex justify-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  disease.severity === 'mild' ? 'bg-green-100 text-green-800' :
                  disease.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Severity: {disease.severity}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Recovery: {disease.recoveryTime}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Medications */}
          <motion.div className="mb-12" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-6">
              <FaPills className="text-3xl text-red-600" />
              <h2 className="text-3xl font-bold text-gray-800">Medications</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {disease.medications.map((med, idx) => (
                <motion.div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{med.name}</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Dosage:</strong> {med.dosage}</p>
                  <p className="text-sm text-gray-600"><strong>Purpose:</strong> {med.purpose}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Diet */}
          <motion.div className="mb-12" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-6">
              <FaAppleAlt className="text-3xl text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">Recommended Diet</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {disease.diet.map((item, idx) => (
                <motion.div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Precautions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="flex items-center gap-3 mb-6">
              <FaExclamationTriangle className="text-3xl text-yellow-600" />
              <h2 className="text-3xl font-bold text-gray-800">Precautions</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {disease.precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
}
