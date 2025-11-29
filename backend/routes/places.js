import express from 'express';

const router = express.Router();

// Simple placeholder routes for /api/places
router.get('/', (req, res) => {
  res.json({ message: 'Places API root. Use POST /api/places/nearby-free for Overpass lookup.' });
});

// Optional: guide client to the free Overpass endpoint
router.post('/nearby', (req, res) => {
  res.status(501).json({ error: 'Deprecated. Use /api/places/nearby-free (POST) for Overpass queries.' });
});

export default router;
