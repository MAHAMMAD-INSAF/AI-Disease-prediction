import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaHeartbeat, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { MdOutlineHealing } from 'react-icons/md';
import axios from 'axios';

export default function Predict() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // Setup Speech Recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error("This browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setSymptoms(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError('Voice recognition failed. Please check microphone permissions.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const basicInfo = JSON.parse(localStorage.getItem('patientBasicInfo')) || {};
      const response = await axios.post('http://localhost:5000/api/predict', {
        ...basicInfo,
        symptoms: symptoms,
      });

      // Example backend response format:
      // { predictions: [ { disease: "Flu", accuracy: 85, precautions: [...], diet: [...] }, ... ] }
      const prediction = response.data || {};

      const fullInfo = { ...basicInfo, symptoms, prediction };
      localStorage.setItem('patientInfo', JSON.stringify(fullInfo));

      navigate('/result');
    } catch (err) {
      console.error(err);
      setError('Failed to get predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleListen = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
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
            <div className="flex items-center justify-center gap-4 mb-2">
              <FaHeartbeat className="text-5xl text-pink-500 animate-pulse" />
              <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Symptom Analysis</h2>
            </div>
            <p className="text-gray-600">Describe your symptoms below, or use the microphone to speak.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative flex items-start gap-3">
              <MdOutlineHealing className="text-3xl text-green-500 mt-4" />
              <textarea
                name="symptoms"
                className="w-full p-5 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-300 focus:outline-none text-lg resize-none"
                rows="6"
                placeholder="e.g. fever, cough, sore throat..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              ></textarea>
              <button
                type="button"
                onClick={handleListen}
                className={`absolute right-4 top-4 p-3 rounded-full transition-colors duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg animate-pulse'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                title={isListening ? 'Stop listening' : 'Start listening'}
              >
                {isListening ? (
                  <FaMicrophoneSlash className="text-lg" />
                ) : (
                  <FaMicrophone className="text-xl" />
                )}
              </button>
            </div>

            {error && <p className="text-red-600 font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              {loading ? 'Predicting...' : 'Predict Disease'}
            </Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}
