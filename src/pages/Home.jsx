import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const floatingContainerRef = useRef(null);

  const portfolioImages = [
    "/home_images/1.jpg",
    "/home_images/2.jpg",
    "/home_images/3.jpg",
    "/home_images/4.jpg",
  ];

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % portfolioImages.length);
    }, 5000);

    return () => clearInterval(rotationInterval);
  }, [portfolioImages.length]);

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
    <main className=" text-white">
      {/* Hero Section */}
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
              className="px-6 py-3 border border-emerald-600 rounded-md  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Floating Image Gallery */}
        <div
          ref={floatingContainerRef}
          className="w-full md:w-2/5 h-80 md:h-96 relative rounded-lg overflow-hidden shadow-xl"
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

      {/* Skills Section */}
      <section className="py-16 px-4 md:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-500">
          Featured Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Frontend Development",
              description: "React, Vue, Tailwind CSS",
              icon: "💻",
            },
            {
              title: "Backend Development",
              description: "Node.js, Express, Django",
              icon: "⚙️",
            },
            {
              title: "UI/UX Design",
              description: "Figma, Adobe XD, User Research",
              icon: "🎨",
            },
            {
              title: "Cloud Services",
              description: "AWS, Azure, Google Cloud",
              icon: "☁️",
            },
            {
              title: "Database Management",
              description: "MongoDB, PostgreSQL, Firebase",
              icon: "🗄️",
            },
            {
              title: "DevOps",
              description: "Docker, CI/CD, Kubernetes",
              icon: "🔄",
            },
          ].map((skill, index) => (
            <article
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-2xl mb-3">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">
                {skill.title}
              </h3>
              <p className="text-gray-300">{skill.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 md:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-500">
          Latest Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "E-commerce Platform",
              description:
                "A fully functional online store with payment processing and inventory management",
              tech: "React, Node.js, MongoDB, Stripe",
            },
            {
              title: "Portfolio Website",
              description:
                "A personal portfolio showcasing skills and projects with modern design",
              tech: "React, Tailwind CSS, Framer Motion",
            },
          ].map((project, index) => (
            <article
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-emerald-900 h-48 flex items-center justify-center">
                <span className="text-4xl text-emerald-300">
                  Project {index + 1}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-emerald-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-sm text-emerald-300 mb-4">
                  <strong>Technologies:</strong> {project.tech}
                </p>
                <Link
                  to={`/projects/${project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-emerald-500 hover:text-emerald-400 font-medium inline-flex items-center"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
