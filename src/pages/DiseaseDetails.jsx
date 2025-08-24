import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaPills, FaAppleAlt, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

// Disease data with medication, diet, and precaution information
const diseaseData = {
  'Flu': {
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.',
    medications: [
      { name: 'Oseltamivir (Tamiflu)', dosage: '75mg twice daily for 5 days', purpose: 'Antiviral medication to reduce flu symptoms' },
      { name: 'Acetaminophen', dosage: '500-1000mg every 4-6 hours', purpose: 'Reduce fever and relieve body aches' },
      { name: 'Ibuprofen', dosage: '200-400mg every 6-8 hours', purpose: 'Reduce inflammation and pain relief' },
      { name: 'Cough suppressant', dosage: 'As directed on package', purpose: 'Relieve dry cough' }
    ],
    diet: [
      { food: 'Warm chicken soup', benefit: 'Provides hydration and nutrients' },
      { food: 'Citrus fruits (oranges, lemons)', benefit: 'Rich in vitamin C to boost immunity' },
      { food: 'Ginger tea', benefit: 'Anti-inflammatory and soothing for throat' },
      { food: 'Garlic', benefit: 'Natural antiviral properties' },
      { food: 'Yogurt', benefit: 'Probiotics for gut health' },
      { food: 'Warm water with honey', benefit: 'Soothes throat and provides energy' }
    ],
    precautions: [
      'Get plenty of rest and sleep',
      'Stay hydrated by drinking 8-10 glasses of water daily',
      'Avoid close contact with others to prevent spread',
      'Wash hands frequently with soap and water',
      'Cover mouth and nose when coughing or sneezing',
      'Stay home from work/school until fever-free for 24 hours',
      'Avoid touching eyes, nose, and mouth',
      'Clean and disinfect frequently touched surfaces'
    ],
    severity: 'moderate',
    recoveryTime: '7-10 days'
  },
  'Common Cold': {
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that affects the nose and throat.',
    medications: [
      { name: 'Decongestant (Pseudoephedrine)', dosage: '30-60mg every 4-6 hours', purpose: 'Relieve nasal congestion' },
      { name: 'Antihistamine (Chlorpheniramine)', dosage: '4mg every 4-6 hours', purpose: 'Reduce runny nose and sneezing' },
      { name: 'Throat lozenges', dosage: 'As needed', purpose: 'Soothe sore throat' },
      { name: 'Saline nasal spray', dosage: '2-3 sprays per nostril', purpose: 'Moisturize nasal passages' }
    ],
    diet: [
      { food: 'Warm herbal teas', benefit: 'Soothes throat and provides hydration' },
      { food: 'Chicken broth', benefit: 'Provides electrolytes and easy to digest' },
      { food: 'Bananas', benefit: 'Easy to digest and provides potassium' },
      { food: 'Oatmeal', benefit: 'Gentle on stomach and provides energy' },
      { food: 'Berries', benefit: 'Rich in antioxidants' }
    ],
    precautions: [
      'Get adequate rest (7-9 hours of sleep)',
      'Drink warm fluids throughout the day',
      'Use humidifier to add moisture to air',
      'Avoid cold beverages and ice cream',
      'Stay away from smoke and pollutants',
      'Gargle with warm salt water',
      'Keep head elevated while sleeping',
      'Avoid strenuous activities'
    ],
    severity: 'mild',
    recoveryTime: '3-7 days'
  },
  'Malaria': {
    name: 'Malaria',
    description: 'A serious and sometimes fatal disease caused by parasites transmitted through infected mosquito bites.',
    medications: [
      { name: 'Artemisinin-based combination therapy (ACT)', dosage: 'As prescribed by doctor', purpose: 'Primary treatment for malaria' },
      { name: 'Chloroquine', dosage: '600mg base initially, then 300mg', purpose: 'For chloroquine-sensitive malaria' },
      { name: 'Primaquine', dosage: '15mg daily for 14 days', purpose: 'Prevent relapse (after ACT)' },
      { name: 'Paracetamol', dosage: '500-1000mg every 4-6 hours', purpose: 'Reduce fever and pain' }
    ],
    diet: [
      { food: 'High-protein foods (eggs, fish)', benefit: 'Support immune system recovery' },
      { food: 'Fresh fruits (papaya, pomegranate)', benefit: 'Rich in vitamins and antioxidants' },
      { food: 'Coconut water', benefit: 'Natural electrolyte replacement' },
      { food: 'Leafy green vegetables', benefit: 'Iron and folate for blood health' },
      { food: 'Whole grains', benefit: 'Sustained energy release' }
    ],
    precautions: [
      'Complete full course of prescribed medication',
      'Use mosquito nets while sleeping',
      'Apply insect repellent containing DEET',
      'Wear long-sleeved clothing in evening',
      'Remove standing water around home',
      'Monitor temperature daily',
      'Seek immediate medical attention for worsening symptoms',
      'Avoid travel to malaria-endemic areas until fully recovered'
    ],
    severity: 'severe',
    recoveryTime: '14-21 days'
  }
};

export default function DiseaseDetails() {
  const { diseaseName } = useParams();
  const navigate = useNavigate();
  const disease = diseaseData[diseaseName];

  if (!disease) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-2">
        <Card className="w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={() => navigate('/result')}
              className="flex items-center gap-2 mb-6"
            >
              <FaArrowLeft /> Back to Results
            </Button>
            <motion.div
              className="text-center mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold text-blue-700 mb-4">{disease.name}</h1>
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
          {/* Medications Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaPills className="text-3xl text-red-600" />
              <h2 className="text-3xl font-bold text-gray-800">Medications</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {disease.medications.map((med, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{med.name}</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Dosage:</strong> {med.dosage}</p>
                  <p className="text-sm text-gray-600"><strong>Purpose:</strong> {med.purpose}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Diet Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaAppleAlt className="text-3xl text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">Recommended Diet</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {disease.diet.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{item.food}</h3>
                  <p className="text-sm text-gray-600">{item.benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Precautions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaExclamationTriangle className="text-3xl text-orange-600" />
              <h2 className="text-3xl font-bold text-gray-800">Precautions & Care</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <ul className="space-y-3">
                {disease.precautions.map((precaution, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{precaution}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="mt-8 text-center">
              <Button
                className="px-6 py-3"
                onClick={() => navigate(`/disease/${diseaseName}/precaution-diet`, {
                  state: {
                    disease: disease.name,
                    precautions: disease.precautions,
                    diet: disease.diet.map(d => d.food)
                  }
                })}
              >
                View Precaution & Diet Page
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
}
