import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const floatingContainerRef = useRef(null);

  const portfolioImages = [
    "/home_images/1.jpg",
    "/home_images/2.jpg",
    "/home_images/3.jpg",
    "/home_images/4.jpg",
  ];

  // Add automatic rotation through images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [portfolioImages.length]);

  // Add floating animation effect
  useEffect(() => {
    if (!floatingContainerRef.current) return;

    let animationFrameId;
    const startTime = Date.now();

    const animateFloat = () => {
      const elapsedTime = (Date.now() - startTime) * 0.001;
      const yOffset = Math.sin(elapsedTime) * 3;

      if (floatingContainerRef.current) {
        floatingContainerRef.current.style.transform = `translateY(${yOffset}px)`;
      }

      animationFrameId = requestAnimationFrame(animateFloat);
    };

    animationFrameId = requestAnimationFrame(animateFloat);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row py-16 px-4 md:px-12 items-center justify-between">
      {/* Introduction Content */}
      <div className="w-full md:w-3/5 text-left mb-12 md:mb-0">
        <h1 className="text-5xl font-bold mb-6">
          <Typewriter
            options={{
              strings: [
                "Software <span class='text-emerald-400'>Engineer</span>",
                "Hello <span class='text-emerald-400'>World!</span>",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-xl">
          A creative developer's space to showcase projects and skills
        </p>
        <div className="flex flex-wrap justify-start gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 border border-emerald-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* Floating Image Gallery */}
      <div
        ref={floatingContainerRef}
        className="w-full md:w-2/5 h-80 md:h-96 relative rounded-lg overflow-hidden shadow-xl transition-transform duration-300 ease-in-out"
        aria-label="Portfolio showcase gallery"
      >
        <div className="relative w-full h-full">
          {portfolioImages.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out 
              ${
                activeIndex === index
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              }`}
              style={{
                zIndex: activeIndex === index ? 10 : 0,
              }}
              aria-hidden={activeIndex !== index}
            >
              <img
                src={src}
                alt={`Portfolio showcase ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Gallery Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {portfolioImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-emerald-400 w-4"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
