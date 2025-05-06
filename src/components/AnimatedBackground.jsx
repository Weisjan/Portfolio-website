import { useEffect, useState } from "react";

const AnimatedGradientBackground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gradientOpacity, setGradientOpacity] = useState(0);

  // Colors for the gradient
  const colors = {
    blue: "#0099ff",
    cyan: "#00ffff",
    purple: "#9900ff",
    teal: "#00ffd5",
  };

  // Add a second animation for wave-like effect
  const [wave, setWave] = useState(0);

  useEffect(() => {
    // Fade in the gradient
    const fadeIn = setTimeout(() => {
      setGradientOpacity(0.8);
    }, 300);

    // Set up animation for faster wave-like movement
    const positionInterval = setInterval(() => {
      setPosition({
        x: Math.sin(Date.now() / 2000) * 30,
        y: Math.cos(Date.now() / 2500) * 30,
      });
    }, 30);

    // Additional wave animation
    const waveInterval = setInterval(() => {
      setWave(Date.now() / 1000);
    }, 30);

    return () => {
      clearInterval(positionInterval);
      clearInterval(waveInterval);
      clearTimeout(fadeIn);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Dark background overlay */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Animated gradients */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: gradientOpacity,
          transform: `scale(1.05) rotate(${Math.sin(wave / 2) * 2}deg)`,
        }}
      >
        {/* Blue gradient */}
        <div
          className="absolute rounded-full w-1/2 h-1/2 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.blue}22 0%, transparent 70%)`,
            left: `calc(20% + ${position.x}px)`,
            top: `calc(40% + ${position.y}px)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.8s ease-out, top 0.8s ease-out",
          }}
        />

        {/* Cyan gradient */}
        <div
          className="absolute rounded-full w-1/2 h-1/2 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.cyan}22 0%, transparent 70%)`,
            left: `calc(70% + ${-position.x}px)`,
            top: `calc(60% + ${-position.y * 1.2}px)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.8s ease-out, top 0.8s ease-out",
          }}
        />

        {/* Purple accent */}
        <div
          className="absolute rounded-full w-1/3 h-1/3 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.purple}22 0%, transparent 70%)`,
            left: `calc(50% + ${position.y * 1.2}px)`,
            top: `calc(30% + ${position.x * 1.1}px)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.8s ease-out, top 0.8s ease-out",
          }}
        />

        {/* Teal accent */}
        <div
          className="absolute rounded-full w-1/4 h-1/4 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.teal}22 0%, transparent 70%)`,
            left: `calc(30% + ${-position.y * 1.3}px)`,
            top: `calc(70% + ${-position.x * 1.2}px)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.8s ease-out, top 0.8s ease-out",
          }}
        />
      </div>
    </div>
  );
};

// Example usage of the animated background in your layout
const Layout = () => {
  return (
    <div>
      <AnimatedGradientBackground />
    </div>
  );
};

export default Layout;
