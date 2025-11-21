const express = require('express');
const axios = require('axios');
const router = express.Router();

const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

// Helper to fetch places from Google API
const fetchPlaces = async (lat, lng, type) => {
  try {
    const response = await axios.get(PLACES_API_URL, {
      params: {
        location: `${lat},${lng}`,
        radius: 3000, // 3km radius
        type: type,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });
    // Format and return the results
    return response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating || null,
      user_ratings_total: place.user_ratings_total || 0,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      type: type, // Add the type to distinguish them
    }));
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error.response ? error.response.data : error.message);
    return []; // Return empty array on error
  }
};

router.post('/nearby', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    // Fetch both hospitals and pharmacies in parallel
    const [hospitals, pharmacies] = await Promise.all([
      fetchPlaces(latitude, longitude, 'hospital'),
      fetchPlaces(latitude, longitude, 'pharmacy'),
    ]);

    // Combine and send the results
    const places = [...hospitals, ...pharmacies];
    res.json(places);

  } catch (error) {
    console.error('Failed to fetch nearby places:', error);
    res.status(500).json({ error: 'Failed to fetch nearby places.' });
  }
});

module.exports = router;