import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/patient-info', label: 'Patient Info' },
    { to: '/predict', label: 'Predict' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 shadow-2xl sticky top-0 z-50 py-4">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12">
        <motion.h1 
          className="text-3xl font-extrabold text-white tracking-wide select-none"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          HealthPredict
        </motion.h1>
        <div className="flex space-x-8 text-lg font-semibold">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="relative group">
              <motion.span
                whileHover={{ scale: 1.1, y: -2 }}
                className={`cursor-pointer transition-all duration-300 ${
                  location.pathname === to 
                    ? 'text-white font-bold drop-shadow-lg' 
                    : 'text-purple-100 hover:text-white'
                }`}
              >
                {label}
              </motion.span>
              {location.pathname === to && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

