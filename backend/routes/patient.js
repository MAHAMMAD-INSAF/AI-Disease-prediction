import express from 'express';
import Patient from '../models/Patient.js';
import dotenv from 'dotenv';
import { getDeepseekPredictions } from '../deepseek.js';

dotenv.config();
const router = express.Router();

// POST /api/patient/predict
router.post('/predict', async (req, res) => {
  const { name, phone, address, symptoms } = req.body;
  if (!name || !phone || !address || !symptoms) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Call DeepSeek API
    const prediction = await getDeepseekPredictions(symptoms);

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

export default router;
