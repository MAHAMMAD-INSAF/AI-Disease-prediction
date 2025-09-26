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
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Patient Information</h1>
            <p className="mt-2 text-lg text-gray-600">Please provide your basic details to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400" />
              <input
                type="text" name="name" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg transition"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400" />
              <input
                type="tel" name="phone" placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg transition"
              />
            </div>

            <div className="relative">
              <FaMapMarkerAlt className="absolute top-5 left-4 text-xl text-gray-400" />
              <textarea
                name="address" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg resize-none transition"
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
