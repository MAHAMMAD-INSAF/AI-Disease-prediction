import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  symptoms: { type: String, required: true },
  prediction: { type: Object }, // DeepSeek API response
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', patientSchema);
