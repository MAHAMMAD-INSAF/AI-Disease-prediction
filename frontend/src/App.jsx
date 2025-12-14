
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Home from './pages/Home';
import PatientForm from './pages/PatientForm';
import Predict from './pages/Predict';
import Result from './pages/Result';
import DiseaseDetails from './pages/DiseaseDetails';
import PrecautionDiet from './pages/PrecautionDiet';
import NearbyPlacesPage from './pages/NearbyPlacesPage';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.6,
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/patient-info"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PatientForm />
            </motion.div>
          }
        />
        <Route
          path="/predict"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Predict />
            </motion.div>
          }
        />
        <Route
          path="/result"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Result />
            </motion.div>
          }
        />
        <Route
          path="/disease/:diseaseName"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <DiseaseDetails />
            </motion.div>
          }
        />
        <Route
          path="/places/nearby"
          element={
            <motion.div
              className="flex flex-col flex-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NearbyPlacesPage />
            </motion.div>
          }
        />
          <Route
            path="/disease/:diseaseName/precaution-diet"
            element={
              <motion.div
                className="flex flex-col flex-1"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PrecautionDiet />
              </motion.div>
            }
          />
      </Routes>
    </AnimatePresence>
  );
}

import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar for desktop & mobile */}
          <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
          <main className="flex-grow container mx-auto px-2 md:px-8 py-8 flex">
            <Card className="w-full flex flex-col">
              <AnimatedRoutes />
            </Card>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
