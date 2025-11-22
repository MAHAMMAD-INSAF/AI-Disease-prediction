import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Helper component to move map to user's location when it becomes available
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
}

export default function NearbyMedicalMapOSM() {
  const [userLoc, setUserLoc] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [radius, setRadius] = useState(3000); // meters
  const [filter, setFilter] = useState({ hospital: true, pharmacy: true });
  const mapRef = useRef(null);

  // Compute distance (meters) between two lat/lng points (Haversine)
  const distanceMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000; // Earth radius meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Request user's location and fetch from backend with radius
  const handleShowNearby = () => {
    setError('');
    setPlaces([]);
    setLoading(true);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLoc({ lat, lng });

        try {
          // Send coordinates + radius to backend route which calls Overpass API
          const res = await axios.post('/api/places/nearby-free', { lat, lng, radius });
          const fetched = res.data.places || [];

          // annotate with distance and filter client-side as well
          const annotated = fetched.map((p) => ({
            ...p,
            distance: Math.round(distanceMeters(lat, lng, p.lat, p.lng)),
          }));

          setPlaces(annotated.sort((a, b) => a.distance - b.distance));
        } catch (err) {
          console.error('Backend error', err);
          setError('Failed to fetch nearby places. Try again later.');
        } finally {
          setLoading(false);
        }
      },
      (geoErr) => {
        console.error('Geolocation error', geoErr);
        setError('Unable to retrieve your location. Please allow location access.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  // Filtered places based on checkboxes and radius
  const visiblePlaces = useMemo(() => {
    if (!userLoc) return [];
    return places.filter(p => p.distance <= radius && (p.type === 'hospital' ? filter.hospital : filter.pharmacy));
  }, [places, radius, filter, userLoc]);

  const panToPlace = (p) => {
    if (!mapRef.current) return;
    mapRef.current.setView([p.lat, p.lng], 16);
    // Open a popup at this location
    L.popup({ maxWidth: 300 })
      .setLatLng([p.lat, p.lng])
      .setContent(`<strong>${p.name}</strong><div style="font-size:12px;margin-top:6px;">${p.address || ''}</div>`)
      .openOn(mapRef.current);
  };

  // Create memoized icons for user, hospital, and pharmacy using inline SVG divIcons
  const userIcon = useMemo(() => {
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="u-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#u-shadow)">
          <circle cx="20" cy="12" r="8" fill="#2563eb" stroke="#fff" stroke-width="2" />
          <path d="M20 29 C20 29 13 23 13 17 A7 7 0 1 1 27 17 C27 23 20 29 20 29 Z" fill="#2563eb" opacity="0.95"/>
        </g>
      </svg>
    `;
    return L.divIcon({ html: svg, className: 'user-location-icon', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] });
  }, []);

  const hospitalIcon = useMemo(() => {
    const svg = `
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" fill="#ef4444" stroke="#fff" stroke-width="2" />
        <rect x="10" y="12" width="16" height="12" rx="2" fill="#fff" />
        <rect x="15" y="14" width="6" height="8" fill="#ef4444" />
      </svg>
    `;
    return L.divIcon({ html: svg, className: 'place-icon', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36] });
  }, []);

  const pharmacyIcon = useMemo(() => {
    const svg = `
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" fill="#16a34a" stroke="#fff" stroke-width="2" />
        <path d="M12 18h12M18 12v12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
    return L.divIcon({ html: svg, className: 'place-icon', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36] });
  }, []);

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left panel: controls + list */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold">Find nearby</h4>
              <div className="text-sm text-gray-500">Radius: {(radius/1000).toFixed(1)} km</div>
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">Radius (meters)</label>
              <input type="range" min="500" max="15000" step="500" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" />
            </div>

            <div className="mb-3 flex gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filter.hospital} onChange={(e) => setFilter(f => ({...f, hospital: e.target.checked}))} />
                <span className="text-sm">Hospitals</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filter.pharmacy} onChange={(e) => setFilter(f => ({...f, pharmacy: e.target.checked}))} />
                <span className="text-sm">Pharmacies</span>
              </label>
            </div>

            <div className="mb-3">
              <button onClick={handleShowNearby} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md w-full">{loading ? 'Searching...' : 'Detect & Search'}</button>
            </div>

            <div className="text-sm text-gray-600 mb-3">Found: <strong>{visiblePlaces.length}</strong></div>

            <div className="space-y-2 max-h-[60vh] overflow-auto">
              {visiblePlaces.length === 0 && <div className="text-gray-500">No places found yet.</div>}
              {visiblePlaces.map((p) => (
                <div key={p.id} className="p-2 rounded-md border hover:bg-gray-50 cursor-pointer" onClick={() => panToPlace(p)}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                    <div className="text-xs text-gray-500">{(p.distance/1000).toFixed(2)} km</div>
                  </div>
                  <div className="text-xs text-gray-600">{p.type} {p.address ? `• ${p.address}` : ''}</div>
                </div>
              ))}
            </div>
            {error && <div className="text-red-500 mt-3">{error}</div>}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <div className="mb-2"><strong>Legend:</strong></div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-red-600 inline-block"/> <span>Hospital</span></div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-green-600 inline-block"/> <span>Pharmacy</span></div>
          </div>
        </div>

        {/* Right panel: map */}
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md border border-gray-200 p-2">
          {userLoc ? (
            <div style={{ height: '70vh' }}>
              <MapContainer
                center={[userLoc.lat, userLoc.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%', borderRadius: 12 }}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
              >
                <RecenterMap lat={userLoc.lat} lng={userLoc.lng} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &amp; CARTO'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* User marker (custom SVG divIcon to avoid external image issues) */}
                <Marker position={[userLoc.lat, userLoc.lng]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* Place markers with custom icons */}
                {visiblePlaces.map((p) => (
                  <Marker
                    key={p.id}
                    position={[p.lat, p.lng]}
                    icon={p.type === 'hospital' ? hospitalIcon : pharmacyIcon}
                    eventHandlers={{ click: () => panToPlace(p) }}
                  >
                    <Popup>
                      <div className="popup-content" style={{ minWidth: 220 }}>
                        <div className="place-name">{p.name}</div>
                        <div className="place-type">{p.type} • {(p.distance/1000).toFixed(2)} km</div>
                        {p.address && <div className="place-address" style={{ marginTop: 6 }}>{p.address}</div>}
                        <div className="mt-3 flex gap-3">
                          <a href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=18/${p.lat}/${p.lng}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open in map</a>
                          <a href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`} target="_blank" rel="noreferrer" className="text-gray-600 underline">Open in Google Maps</a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-gray-500">Click "Detect & Search" to show map and nearby places.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
