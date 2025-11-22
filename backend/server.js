import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patient.js";
import placesRoutes from "./routes/places.js";
import placesFreeRoutes from "./routes/placesFree.js";
import { getMedicalPredictions } from "./predictionService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/patients", patientRoutes);
app.use("/api/places", placesRoutes);
// Free Overpass-based places route: POST /api/places/nearby-free
app.use("/api/places", placesFreeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
