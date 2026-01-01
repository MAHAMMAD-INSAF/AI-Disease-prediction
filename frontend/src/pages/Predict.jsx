import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaStethoscope, FaMicrophone } from 'react-icons/fa';
import { toast } from 'sonner';
import RealTimeFaceHealth from '../components/RealTimeFaceHealth';

export default function Predict() {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechRecognitionSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Listen for a single utterance
      recognition.interimResults = false; // No interim results
      recognition.lang = 'en-US'; // Set language explicitly
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
          toast.warning("Speech not detected", { description: "We couldn't hear you. Please try speaking again." });
        } else {
          toast.error("Speech Recognition Error", { description: `An error occurred: ${event.error}` });
        }
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        if (transcript) {
          setSymptoms(prevSymptoms => {
            // Append the new transcript with a space if needed
            return (prevSymptoms ? `${prevSymptoms.trim()} ${transcript.trim()}` : transcript.trim()).trim();
          });
        }
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const handleListen = () => {
    console.log('handleListen called, isListening:', isListening);
    // Prevent starting if it's already listening, even if the state hasn't updated yet.
    if (!recognitionRef.current) {
      console.log('No recognition instance available');
      return;
    }

    if (isListening) {
      console.log('Stopping recognition');
      recognitionRef.current?.stop();
      setIsListening(false); // Immediately update UI state
    } else {
      console.log('Starting recognition');
      recognitionRef.current?.start();
      setIsListening(true); // Immediately update UI state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const patientInfo = JSON.parse(localStorage.getItem('patientBasicInfo')) || {};

    if (!symptoms.trim()) {
      setError('Please enter your symptoms.');
      setIsLoading(false);
      return;
    }

    const formData = {
      ...patientInfo,
      symptoms,
    };

    try {
      // --- Use same-origin endpoint so this works on Vercel too ---
      const response = await axios.post('/api/patients/predict', formData);
      
      // Store the full prediction result
      localStorage.setItem('patientInfo', JSON.stringify({ ...patientInfo, symptoms, prediction: response.data }));

      navigate('/result');
    } catch (err) {
      console.error("Prediction API error:", err);
      setError('Failed to get predictions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-700">Describe Your Symptoms</h2>
            <p className="text-gray-600 mt-2">Please be as detailed as possible for an accurate diagnosis.</p>
          </div>
          <div className="mb-8 text-center">
            {showWebcam ? (
              <div className="flex flex-col items-center gap-4">
                <RealTimeFaceHealth />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowWebcam(false)}>
                  Close Webcam
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowWebcam(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Facial Expression Analysis
              </Button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <FaStethoscope className="absolute left-4 top-4 text-blue-600" />
              {speechRecognitionSupported && (
                <button
                  type="button"
                  onClick={handleListen}
                  className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  <FaMicrophone />
                </button>
              )}
              <textarea
                name="symptoms"
                placeholder="e.g., I have a high fever, headache, and a sore throat..."
                className="w-full pl-12 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg resize-none"
                rows={5}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center font-medium">{error}</p>}
            <Button className="w-full py-4 text-lg mt-2" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center" aria-label="Analyzing">
                  {"Analyzing...".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                    >{char === " " ? "\u00A0" : char}</motion.span>
                  ))}
                </div>
              ) : 'Get Prediction'}
            </Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}