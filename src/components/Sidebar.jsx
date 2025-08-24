import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUserAlt, FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar({ isOpen, toggle }) {
  return (
    <>
      {/* Overlay when sidebar open on small screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <h2 className="text-2xl font-extrabold tracking-wide">HealthPredict</h2>
          <button
            onClick={toggle}
            aria-label="Close sidebar"
            className="md:hidden focus:outline-none"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col mt-6 space-y-4 px-6">
          {[
            { to: '/', label: 'Home', icon: <FaHome /> },
            { to: '/patient-info', label: 'Patient Info', icon: <FaUserAlt /> },
            { to: '/predict', label: 'Predict', icon: <FaHeartbeat /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-semibold transition-colors
                 ${
                   isActive
                     ? 'bg-blue-600 shadow-md'
                     : 'hover:bg-blue-600 hover:bg-opacity-70'
                 }`
              }
              onClick={() => isOpen && toggle()}
            >
              <motion.span
                className="text-xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.span>
              {label}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
