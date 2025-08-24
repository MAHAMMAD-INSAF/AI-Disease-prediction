import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200 ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
