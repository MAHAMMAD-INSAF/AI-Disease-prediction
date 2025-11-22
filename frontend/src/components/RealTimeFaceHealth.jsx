import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { motion, AnimatePresence } from "framer-motion";

const RealTimeFaceHealth = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [condition, setCondition] = useState("Loading...");
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [detections, setDetections] = useState(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const intervalRef = useRef(null);

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user",
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        setCondition("Loading AI Models...");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
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
    if (!webcamRef.current || !webcamRef.current.video || !canvasRef.current) {
      return;
    }

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    // Ensure video is ready and has dimensions
    if (video.readyState !== 4 || video.videoWidth === 0) {
      return;
    }
    
    // Match canvas dimensions to video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      return;
    }

    try {
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      faceapi.matchDimensions(canvas, displaySize);

      const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
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
    if (isModelReady && isWebcamReady) {
      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Start analysis
      intervalRef.current = setInterval(analyzeFrame, 200); // Analyze every 200ms
    }

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isModelReady, isWebcamReady]);

  const isLoading = !isModelReady || !isWebcamReady;

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 min-h-[450px]">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🧠 Real-Time Facial Condition</h2>
      <div className="relative w-full max-w-md mx-auto aspect-video flex items-center justify-center bg-gray-200 rounded-xl overflow-hidden">
        {isLoading && (
          <div className="absolute z-10 flex flex-col items-center text-gray-600">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>{condition}</p>
          </div>
        )}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
          className="rounded-xl"
          onUserMedia={() => { setCondition("Starting Webcam..."); setIsWebcamReady(true); }}
          style={{
            width: '100%',
            height: 'auto'
          }}
        />
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0"
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

export default RealTimeFaceHealth;
