import React from 'react';
import NearbyMedicalMapOSM from '../components/NearbyMedicalMapOSM';

// Example result page that shows prediction info and the nearby places map
export default function DiseaseResult({ prediction }) {
  const disease = prediction?.diseases?.[0] || null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700">{disease?.disease || 'Prediction Result'}</h1>
        {disease?.description && <p className="text-gray-700 mt-2">{disease.description}</p>}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Medications</h2>
        <ul className="list-disc list-inside">
          {(disease?.medications || []).map((m, i) => (
            <li key={i}>{m.name} — {m.dosage} ({m.purpose})</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Precautions</h2>
        <ul className="list-disc list-inside">
          {(disease?.precautions || []).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Nearby map section */}
      <NearbyMedicalMapOSM />
    </div>
  );
}
