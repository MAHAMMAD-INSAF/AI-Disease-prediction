import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import bg from '../assets/bg-health-ai.jpg';
import { FaHeartbeat } from 'react-icons/fa';

export default function Home() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-2 sm:px-8"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Card className="w-full max-w-3xl bg-gradient-to-r from-white to-blue-50 text-center py-14 px-6 md:px-16 border-2 border-blue-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <FaHeartbeat className="text-6xl text-red-600 animate-pulse mb-6 mx-auto" />
          <h2 className="text-5xl font-extrabold text-blue-800 tracking-tight leading-tight mb-4">
            Welcome to <span className="text-red-600">HealthPredict</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
            Get fast and accurate disease predictions with our AI-powered health assistant.
          </p>
          <Link to="/patient-info" aria-label="Start Diagnosis">
            <Button className="px-12 py-4 text-xl mt-2">Start Diagnosis</Button>
          </Link>
        </motion.div>
      </Card>
    </div>
  );
}
