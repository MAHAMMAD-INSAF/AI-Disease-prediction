import React from 'react';
import NearbyMedicalMapOSM from '../components/NearbyMedicalMapOSM';

export default function NearbyPlacesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Nearby Medical Places</h2>
      <NearbyMedicalMapOSM />
    </div>
  );
}
