import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function PatientInfo() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem('patientBasicInfo'));
    if (savedInfo) {
      setName(savedInfo.name || '');
      setPhone(savedInfo.phone || '');
      setAddress(savedInfo.address || '');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    const basicInfo = { name, phone, address };
    localStorage.setItem('patientBasicInfo', JSON.stringify(basicInfo));
    navigate('/predict');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2 sm:px-6">
      <Card className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-700 tracking-tight">Patient Information</h2>
            <p className="mt-2 text-gray-600">Please provide your basic details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center gap-4">
              <FaUser className="text-2xl text-gray-400" />
              <input
                type="text" name="name" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
              />
            </div>

            <div className="flex items-center gap-4">
              <FaPhone className="text-2xl text-gray-400" />
              <input
                type="tel" name="phone" placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
              />
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-gray-400 mt-4" />
              <textarea
                name="address" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg resize-none"
                rows="3"
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Next
            </Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}
