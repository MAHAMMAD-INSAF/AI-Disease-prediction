import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function PrecautionDiet() {
  const { diseaseName } = useParams();
  const navigate = useNavigate();
  const [diseaseData, setDiseaseData] = useState(null);

  useEffect(() => {
    // Get predictions from localStorage
    const patientInfo = JSON.parse(localStorage.getItem('patientInfo')) || {};
    const disease = (patientInfo.prediction?.diseases || []).find(d => d.disease === diseaseName);
    setDiseaseData(disease);
  }, [diseaseName]);

  if (!diseaseData) {
    return (
      <div className="max-w-xl mx-auto p-8 mt-12">
        <Card className="w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">No Data Found</h2>
          <p className="mb-6 text-gray-700">Precaution and diet information is missing.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <Card className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Precautions & Diet for {diseaseData.disease}
        </h2>

        {/* Precautions */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Precautions</h3>
          <ul className="list-disc list-inside text-gray-700">
            {diseaseData.precautions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Diet */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-600">Diet</h3>
          <ul className="list-disc list-inside text-gray-700">
            {diseaseData.diet.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate(-1)}>Back to Disease Details</Button>
        </div>
      </Card>
    </div>
  );
}
