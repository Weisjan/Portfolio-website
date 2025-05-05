import { User } from "lucide-react";
import { useState, useEffect } from "react";

const quotesData = [
  { quote: "Persistence overrides resistance.", author: "Neo Cortex" },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
  },
  {
    quote: "In the digital world, we are the architects of our own reality.",
    author: "Ada Lovelace",
  },
  {
    quote: "Code is poetry written for machines and humans alike.",
    author: "Anonymous",
  },
];

const AboutSection = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotesData[0]);

  // Function to select random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    return quotesData[randomIndex];
  };

  // Set initial random quote on component mount
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => {
      setGlitchActive(false);
      // Change the quote when the glitch effect ends
      setCurrentQuote(getRandomQuote());
    }, 1000);
  };

  return (
    <section className="w-full py-15 relative overflow-hidden">
      <div className="container mx-auto z-10 relative px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Quote Container - Left side */}
          <div className="w-full md:w-2/5 bg-gray-900/70 border border-emerald-500/30 rounded-xl px-6 py-2 backdrop-blur-sm shadow-lg shadow-emerald-500/20 relative">
            <div
              className={`transition-all duration-300 flex flex-col h-full justify-between ${
                glitchActive ? "translate-x-1" : ""
              }`}
            >
              <div className="text-3xl text-emerald-400 mb-2 font-bold">"</div>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-lg md:text-xl font-medium text-emerald-100 text-center relative">
                  <span
                    className={`relative z-10 ${
                      glitchActive
                        ? "before:content-[''] before:absolute before:text-rose-500 before:left-0.5 before:top-0.5 before:opacity-70 before:z-0"
                        : ""
                    }`}
                  >
                    {currentQuote.quote}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex flex-col items-end">
                <p className="text-emerald-400 font-medium">
                  - {currentQuote.author}
                </p>
                <div className="text-3xl text-emerald-400 font-bold">"</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500 rounded-br-lg"></div>
          </div>

          {/* Profile Container - Right side */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center md:justify-end md:pl-8">
            <div className="relative mb-6 md:mb-0 md:mr-6">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-900 to-teal-600 flex items-center justify-center overflow-hidden border-4 border-emerald-500/50 shadow-lg shadow-emerald-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent animate-pulse"></div>
                <User
                  className="w-20 h-20 text-emerald-200"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-emerald-300 mb-2">
                More about me
              </h2>
              <p className="text-emerald-100 mb-4">
                Click the button below for a new quote.
              </p>

              <button
                onClick={triggerGlitch}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-md relative overflow-hidden transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 group"
              >
                <span className="relative z-10">New Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
