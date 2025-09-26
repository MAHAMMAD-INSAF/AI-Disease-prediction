import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true, trim: true },
  symptoms: { type: String, required: true, trim: true },
  prediction: { type: Object }, // AI prediction response
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model('Patient', patientSchema);
