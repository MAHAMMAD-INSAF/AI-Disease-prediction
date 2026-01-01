import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import patientRoutes from '../backend/routes/patient.js';
import placesRoutes from '../backend/routes/places.js';
import placesFreeRoutes from '../backend/routes/placesFree.js';

// Cache app and DB connection across Lambda invocations
let app;
let isConnected = false;

const initApp = () => {
  if (app) return app;
  app = express();
  app.use(cors());
  app.use(express.json());

  // Mount backend routers (they use express.Router)
  app.use('/api/patients', patientRoutes);
  app.use('/api/places', placesRoutes);
  app.use('/api/places', placesFreeRoutes);

  return app;
};

const connectDB = async () => {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error('Missing MONGO_URI environment variable.');
    throw new Error('Missing MONGO_URI environment variable');
  }

  // Use global to avoid creating new connections on each invocation
  if (!global._mongoPromise) {
    global._mongoPromise = mongoose.connect(MONGO_URI, { /* options can be added here */ });
  }

  await global._mongoPromise;
  isConnected = true;
};

export default async function handler(req, res) {
  try {
    await connectDB();
    const server = initApp();
    return server(req, res);
  } catch (err) {
    console.error('API handler error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
