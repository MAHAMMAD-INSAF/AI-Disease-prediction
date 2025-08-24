import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className = "", type = "button" }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: '#4F46E5' }}
    whileTap={{ scale: 0.97 }}
    className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold ${className}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </motion.button>
);

export default Button;
