

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaUserAlt, FaPhoneAlt, FaHome, FaCalendarAlt } from 'react-icons/fa';

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', dateOfBirth: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('patientBasicInfo', JSON.stringify(form));
    navigate('/predict');
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
            <h2 className="text-4xl font-bold text-blue-700">Patient Information</h2>
            <p className="text-gray-600 mt-2">Please provide your basic details before diagnosis</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <InputField
              icon={<FaUserAlt className="text-blue-600" />}
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<FaPhoneAlt className="text-green-600" />}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <TextareaField
              icon={<FaHome className="text-pink-600" />}
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              required
            />
            <InputField
              icon={<FaCalendarAlt className="text-purple-600" />}
              name="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
            <Button className="w-full py-4 text-lg mt-2" type="submit">Next</Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
}

function InputField({ icon, name, type, placeholder, value, onChange, required }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3.5">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

function TextareaField({ icon, name, placeholder, value, onChange, rows, required }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4">{icon}</div>
      <textarea
        name={name}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-300 focus:outline-none text-lg resize-none"
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

