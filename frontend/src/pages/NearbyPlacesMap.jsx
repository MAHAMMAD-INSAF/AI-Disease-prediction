import { useState, useCallback } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Button from '../components/Button.jsx';
import { FaMapMarkerAlt } from 'react-icons/fa';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '15px',
  marginTop: '20px',
};

const libraries = ['places'];

export default function NearbyPlacesMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleFetchPlaces = useCallback(() => {
    setLoading(true);
    setError('');
    setShowMap(true);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          const response = await axios.post('http://localhost:5000/api/places/nearby', {
            latitude,
            longitude,
          });
          setPlaces(response.data);
        } catch (err) {
          setError('Could not fetch nearby places. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      }
    );
  }, []);

  if (loadError) return <div>Error loading maps. Please check your API key and internet connection.</div>;

  return (
    <div className="mt-8 text-center">
      {!showMap && (
        <Button
          onClick={handleFetchPlaces}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 text-lg flex items-center gap-3 mx-auto"
        >
          <FaMapMarkerAlt /> Show Nearby Hospitals & Medical Shops
        </Button>
      )}

      {loading && <p className="mt-4 text-gray-600">Fetching your location and nearby places...</p>}
      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {isLoaded && showMap && userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={14}
        >
          {/* User's Location Marker */}
          <Marker position={userLocation} title="Your Location" />

          {/* Nearby Places Markers */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={() => setSelectedPlace(place)}
              icon={{
                url: place.type === 'hospital' ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          ))}

          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-lg text-blue-800">{selectedPlace.name}</h3>
                <p className="text-sm capitalize font-medium text-gray-600">{selectedPlace.type === 'hospital' ? 'Hospital' : 'Medical Shop'}</p>
                <p className="text-sm text-gray-700 mt-1">{selectedPlace.address}</p>
                {selectedPlace.rating && <p className="text-sm mt-1">Rating: {selectedPlace.rating} ({selectedPlace.user_ratings_total} reviews)</p>}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name)}&query_place_id=${selectedPlace.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 block">
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}