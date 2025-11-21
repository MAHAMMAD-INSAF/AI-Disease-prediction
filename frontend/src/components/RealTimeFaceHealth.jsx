import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { motion, AnimatePresence } from "framer-motion";

export default function RealTimeFaceHealth() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [condition, setCondition] = useState("Loading...");
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [detections, setDetections] = useState(null);
  const [isModelReady, setIsModelReady] = useState(false);

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user",
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        console.log("Loading models...");
        // Only load the models we have available
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        console.log("Models loaded successfully");
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
    if (!isModelReady) {
      console.log("Models not ready yet");
      return;
    }

    if (!webcamRef.current || !webcamRef.current.video) {
      console.log("Webcam not initialized");
      return;
    }

    if (!canvasRef.current) {
      console.log("Canvas not initialized");
      return;
    }

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    if (video.readyState !== 4) {
      console.log("Video not ready, state:", video.readyState);
      return;
    }

    console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight);
    
    // Ensure video dimensions are valid
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log("Invalid video dimensions");
      
      return;
    }

    try {
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      faceapi.matchDimensions(canvas, displaySize);

      const result = await faceapi
        .detectSingleFace(
          video, 
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 160,
            scoreThreshold: 0.2
          })
        )
        .withFaceExpressions();

      setDetections(result);
      const resizedDetections = result ? faceapi.resizeResults(result, displaySize) : null;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      if (result && result.expressions) {
        faceapi.draw.drawDetections(canvas, resizedDetections);

        const expressions = result.expressions;
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
    } catch (error) {
      console.error("Error in face detection:", error);
      setCondition("Error analyzing face");
    }
  };

  useEffect(() => {
    if (isModelReady) {
      const interval = setInterval(analyzeFrame, 100); // Increased frequency for better responsiveness
      return () => clearInterval(interval);
    }
  }, [isModelReady]);

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🧠 Real-Time Facial Condition</h2>
      <div className="relative w-full max-w-md mx-auto">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
          className="rounded-xl"
          style={{
            width: '100%',
            height: 'auto'
          }}
        />
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full"
        />
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
          <>
            <p className="text-sm text-gray-500 mt-1">Dominant Emotion: <span className="font-medium capitalize">{dominantEmotion}</span></p>
            {detections && detections.expressions && (
              <div className="mt-3 w-full max-w-sm mx-auto">
                {Object.entries(detections.expressions).map(([emotion, score]) => (
                  <div key={emotion} className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600 capitalize w-24">{emotion}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          emotion === dominantEmotion ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12">{(score * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
