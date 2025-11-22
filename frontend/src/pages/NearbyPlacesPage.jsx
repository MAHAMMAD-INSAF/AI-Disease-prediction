import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import NearbyMedicalMapOSM from '../components/NearbyMedicalMapOSM';

export default function NearbyPlacesPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Card className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Nearby hospitals & medical shops</h1>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>

        <div>
          {/* The map component handles geolocation and fetching places */}
          <NearbyMedicalMapOSM />
        </div>
      </Card>
    </div>
  );
}
