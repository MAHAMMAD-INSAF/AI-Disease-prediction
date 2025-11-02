import express from 'express';
import Patient from '../models/Patient.js';
import { getMedicalPredictions } from '../predictionService.js';

const router = express.Router();

// POST /api/patient/predict
router.post('/predict', async (req, res) => {
  const { name, phone, address, symptoms } = req.body;

  // More robust validation
  if ([name, phone, address, symptoms].some(field => typeof field !== 'string' || field.trim() === '')) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Call the prediction service
    const prediction = await getMedicalPredictions(symptoms);

    // Find patient by phone number and update, or create if not found (upsert)
    const patient = await Patient.findOneAndUpdate(
      { phone: phone },
      {
        name,
        phone,
        address,
        symptoms,
        prediction: prediction,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(prediction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// GET /api/patient/history
router.get('/history', async (req, res) => {
  const { name, phone } = req.query;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  try {
    const patients = await Patient.find({ name, phone }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch patient history" });
  }
});

export default router;
