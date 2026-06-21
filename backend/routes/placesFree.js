import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST /nearby-free
// Body: { lat, lng }
// Calls Overpass API to get nearby hospitals and pharmacies within ~3000m
router.post('/nearby-free', async (req, res) => {
  try {
    const { lat, lng } = req.body || {};

    // Validate input
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Missing lat or lng in request body' });
    }
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      return res.status(400).json({ error: 'Invalid lat or lng' });
    }

    // Overpass QL: find nodes with amenity=hospital or amenity=pharmacy within 3000m
    // We intentionally query nodes only for simplicity (nodes contain lat/lon directly).
    // Allow optional radius (meters) from client, default 3000, cap to avoid large queries
    let radius = Number(req.body.radius || 3000);
    if (Number.isNaN(radius) || radius <= 0) radius = 3000;
    if (radius > 15000) radius = 15000; // cap radius to 15km

    // Overpass QL: find nodes with amenity=hospital or amenity=pharmacy within the radius
    const query = `[
  out:json][timeout:25];
  (node(around:${radius},${latNum},${lngNum})[amenity=hospital];
   node(around:${radius},${latNum},${lngNum})[amenity=pharmacy];);
  out body;`;

    const overpassUrl = 'https://overpass-api.de/api/interpreter';

    // POST the raw query to Overpass.
    // Some Overpass deployments expect a plain-text body and may reject certain content negotiation.
    // Also add a descriptive User-Agent (some proxies block missing/unknown agents).
    const overpassRes = await axios.post(overpassUrl, query, {
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'DiseasePrediction/1.0 (nearby-free-overpass)',
        'Accept': 'application/json',
      },
      timeout: 30000,
      // Avoid axios default transform that could affect plain-text body handling.
      transformResponse: [(data) => data],
      validateStatus: () => true,
    });

    if (overpassRes.status < 200 || overpassRes.status >= 300) {
      throw Object.assign(new Error(`Overpass request failed with status ${overpassRes.status}`), {
        response: { status: overpassRes.status, data: overpassRes.data },
      });
    }

    // Overpass returns JSON; axios transformResponse above leaves raw string/body.
    const parsed = typeof overpassRes.data === 'string' ? (() => {
      try {
        return JSON.parse(overpassRes.data);
      } catch {
        return null;
      }
    })() : overpassRes.data;

    const elements = parsed?.elements || [];

    // Map Overpass elements to a cleaned response
    const places = elements.map((el) => {
      const tags = el.tags || {};
      const name = tags.name || tags['official_name'] || 'Unnamed';

      // Construct address from common addr:* tags if available
      const addrParts = [];
      if (tags['addr:housenumber']) addrParts.push(tags['addr:housenumber']);
      if (tags['addr:street']) addrParts.push(tags['addr:street']);
      if (tags['addr:city']) addrParts.push(tags['addr:city']);
      if (tags['addr:postcode']) addrParts.push(tags['addr:postcode']);
      const address = tags['addr:full'] || addrParts.join(', ') || (tags['operator'] || '');

      const type = tags.amenity === 'hospital' ? 'hospital' : tags.amenity === 'pharmacy' ? 'pharmacy' : tags.amenity || 'unknown';

      return {
        id: el.id,
        name,
        address,
        type,
        lat: el.lat,
        lng: el.lon,
        rawTags: tags,
      };
    });

    return res.json({ count: places.length, places });

  } catch (err) {
    // Axios errors typically have: err.response, err.request, err.config
    // Add detailed logging so we can see Overpass failure reasons.
    if (err?.response) {
      const status = err.response.status;
      const data = err.response.data;
      console.error('Overpass error (response):', {
        status,
        // Avoid dumping huge payloads
        dataType: typeof data,
        dataPreview: typeof data === 'string' ? data.slice(0, 500) : JSON.stringify(data)?.slice(0, 500),
      });
    } else if (err?.request) {
      console.error('Overpass error (no response):', {
        message: err?.message,
        requestType: typeof err?.request,
      });
    } else {
      console.error('Overpass error (setup):', err?.message || err);
    }

    return res.status(502).json({ error: 'Failed to fetch nearby places from Overpass API' });
  }
});


export default router;
