import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

// Add this new component
const ColorfulGlitchBackground = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitches, setGlitches] = useState([]);

  // Color options for glitch lines
  const glitchColors = ["bg-red-500", "bg-emerald-500", "bg-blue-500"];

  useEffect(() => {
    // Function to create a colorful set of glitch elements
    const createGlitchEffect = () => {
      const newGlitches = [];
      // Create 15-25 colorful glitch lines for a rich effect
      const count = Math.floor(Math.random() * 10) + 5;

      for (let i = 0; i < count; i++) {
        // Random color from our palette
        const colorClass =
          glitchColors[Math.floor(Math.random() * glitchColors.length)];

        newGlitches.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 40}%`, // Bias to start more from left
          width: `${Math.random() * 60 + 5}%`, // Longer horizontal lines
          height: `${Math.random() * 2 + 1}px`, // Thin lines
          opacity: Math.random() * 0.6 + 0.4,
          colorClass,
          // Add a bit of horizontal offset for some lines
          offsetX: Math.random() > 0.7 ? `${Math.random() * 10 - 5}px` : "0px",
        });
      }

      setGlitches(newGlitches);
      setIsGlitching(true);

      // Hide the glitch effect after a short duration (300-800ms)
      setTimeout(() => {
        setIsGlitching(false);
      }, Math.random() * 500 + 300);
    };

    // Randomly trigger the glitch effect
    const scheduleNextGlitch = () => {
      // Random interval between 15-20 seconds as requested
      const nextGlitchDelay = Math.random() * 5000 + 15000;

      setTimeout(() => {
        createGlitchEffect();
        // Schedule the next glitch
        scheduleNextGlitch();
      }, nextGlitchDelay);
    };

    // Start the scheduling
    scheduleNextGlitch();

    // Clean up on unmount
    return () => {
      // No specific cleanup needed as component unmount will clear all timeouts
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Glitch elements container */}
      <div
        className={`transition-opacity duration-100 ${
          isGlitching ? "opacity-100" : "opacity-0"
        }`}
      >
        {glitches.map((glitch) => (
          <div
            key={glitch.id}
            className={`absolute ${glitch.colorClass}`}
            style={{
              top: glitch.top,
              left: glitch.left,
              width: glitch.width,
              height: glitch.height,
              opacity: glitch.opacity,
              transform: `translateX(${glitch.offsetX})`,
              boxShadow:
                glitch.colorClass !== "bg-white"
                  ? `0 0 6px ${glitch.colorClass.replace("bg-", "rgb-")}`
                  : "0 0 6px rgba(255,255,255,0.8)",
            }}
          />
        ))}

        {/* Occasional digital noise sections */}
        {isGlitching && Math.random() > 0.6 && (
          <div
            className="absolute bg-black opacity-80"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 60}%`,
              width: `${Math.random() * 30 + 10}%`,
              height: `${Math.random() * 10 + 5}%`,
            }}
          />
        )}

        {/* RGB Split effect occasionally */}
        {isGlitching && Math.random() > 0.7 && (
          <>
            <div
              className="absolute bg-red-500 opacity-30 mix-blend-screen"
              style={{
                top: "45%",
                left: "30%",
                width: "40%",
                height: "10%",
                transform: "translateX(-2px)",
              }}
            />
            <div
              className="absolute bg-blue-500 opacity-30 mix-blend-screen"
              style={{
                top: "45%",
                left: "30%",
                width: "40%",
                height: "10%",
                transform: "translateX(2px)",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900 relative">
      {/* Add the glitch background here */}
      <ColorfulGlitchBackground />

      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
