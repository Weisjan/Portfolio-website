import { useEffect, useRef } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = 200);

    const waveGradients = [
      [
        { offset: 0, color: "#059669" }, // Emerald 600
        { offset: 0.6, color: "#047857" }, // Emerald 700
        { offset: 1, color: "#111827" }, // Gray 900
      ],
      [
        { offset: 0, color: "#10b981" }, // Emerald 500
        { offset: 0.7, color: "#059669" }, // Emerald 600
        { offset: 1, color: "#1f2937" }, // Gray 800
      ],
      [
        { offset: 0, color: "#34d399" }, // Emerald 400
        { offset: 0.6, color: "#10b981" }, // Emerald 500
        { offset: 1, color: "#111827" }, // Gray 900
      ],
    ];

    let phase = 0;

    const waveData = [
      { amplitude: 15, frequency: 0.008, speed: 0.03, opacity: 0.3 },
      { amplitude: 10, frequency: 0.01, speed: 0.025, opacity: 0.25 },
      { amplitude: 5, frequency: 0.013, speed: 0.02, opacity: 0.2 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      waveData.forEach((wave, index) => {
        ctx.beginPath();

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        waveGradients[index].forEach((gc) => {
          gradient.addColorStop(gc.offset, gc.color);
        });

        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x++) {
          const y =
            Math.sin(x * wave.frequency + phase * wave.speed) * wave.amplitude;
          const verticalOffset = 20 * index;
          ctx.lineTo(x, height / 2 + y + verticalOffset);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.globalAlpha = wave.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      phase += 0.05;
      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      draw();
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";

    const mainContent =
      document.getElementById("root") || document.getElementById("__next");
    if (mainContent) {
      mainContent.style.flexGrow = "1";
      mainContent.style.display = "flex";
      mainContent.style.flexDirection = "column";
    }

    return () => {};
  }, []);

  return (
    <footer className="relative py-6 mt-auto overflow-hidden">
      {/* Wave canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "180px", zIndex: 0 }}
      />

      {/* Footer content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/Weisjan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="sr-only">Twitter</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jan-weis01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>
        </div>
        <p className="text-gray-400">© {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
