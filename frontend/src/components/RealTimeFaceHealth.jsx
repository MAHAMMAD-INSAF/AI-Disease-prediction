import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { motion, AnimatePresence } from "framer-motion";

export default function RealTimeFaceHealth() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [condition, setCondition] = useState("Loading...");
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [isModelReady, setIsModelReady] = useState(false);

  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user",
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setIsModelReady(true);
        setCondition("Ready to Analyze");
      } catch (error) {
        console.error("Error loading models:", error);
        setCondition("Model loading failed");
      }
    };
    loadModels();
  }, []);

  const analyzeFrame = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      isModelReady &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectSingleFace(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = detections ? faceapi.resizeResults(detections, displaySize) : null;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      if (detections && detections.expressions) {
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        const expressions = detections.expressions;
        const { happy, neutral, sad, angry, disgusted, fearful, surprised } = expressions;

        const emotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        setDominantEmotion(emotion);

        const goodScore = happy + neutral;
        const badScore = sad + angry + disgusted + fearful + surprised;

        if (goodScore > badScore) {
          setCondition("Good Condition 😊");
        } else {
          setCondition("Bad Condition 😟");
        }
      } else {
        setCondition("No Face Detected");
        setDominantEmotion(null);
      }
    }
  };

  useEffect(() => {
    if (isModelReady) {
      const interval = setInterval(analyzeFrame, 500);
      return () => clearInterval(interval);
    }
  }, [isModelReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🧠 Real-Time Facial Condition</h2>
      <div className="relative w-full max-w-md mx-auto">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-xl w-full h-auto"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="w-full text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={condition}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`text-lg font-semibold ${
              condition.includes("Good") ? "text-green-600" : condition.includes("Bad") ? "text-red-600" : "text-gray-600"
            }`}
          >
            {condition}
          </motion.p>
        </AnimatePresence>
        {dominantEmotion && (
          <p className="text-sm text-gray-500 mt-1">Detected Emotion: <span className="font-medium">{dominantEmotion}</span></p>
        )}
      </div>
    </div>
  );
}
