import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const quotesData = [
  {
    quote: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
  },
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
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(quotesData[0]);

  // Set random quote on component mount (page refresh)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    setCurrentQuote(quotesData[randomIndex]);
  }, []);

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  return (
    <section className="w-full py-12 relative overflow-hidden">
      <div className="container mx-auto z-10 relative ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Quote Container - Smaller side element */}
          <div className="w-full md:w-1/3 bg-gray-900/70 border border-emerald-500/30 rounded-lg p-3 backdrop-blur-sm shadow-md shadow-emerald-500/20">
            <div className="flex flex-col">
              <div className="text-xl text-emerald-400 font-bold">"</div>
              <p className="text-xl text-center text-white mb-2 ">
                {currentQuote.quote}
              </p>
              <div className="flex justify-end">
                <p className="text-sm text-emerald-400 font-medium">
                  - {currentQuote.author}
                </p>
                <div className="text-xl text-emerald-400 font-bold ml-1 ">
                  "
                </div>
              </div>
            </div>
          </div>
          {/* Profile Container - Main content */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center justify-end">
            <div className="relative mb-6 md:mb-0 md:mr-6">
              <div className="w-50 h-50 rounded-full overflow-hidden  shadow-md">
                <img
                  src="../home_images/avatar.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">
                More about me
              </h2>
              <p className="text-white mb-4">
                Click the button below to read more.
              </p>

              <button
                onClick={handleNavigateToAbout}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span className="relative z-10">View Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
