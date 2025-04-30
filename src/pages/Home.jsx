import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const floatingContainerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);

  const portfolioImages = [
    "/home_images/1.jpg",
    "/home_images/2.jpg",
    "/home_images/3.jpg",
    "/home_images/4.jpg",
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A fully functional online store with payment processing and inventory management",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      demo: "https://example.com/demo",
      source: "https://github.com/Weisjan/Address-browser",
      detailedDescription:
        "This e-commerce platform features real-time inventory tracking, secure payment processing with Stripe integration, and a responsive admin dashboard. It includes features like user authentication, shopping cart functionality, order history, and product reviews.",
      images: [
        "/projects_images/addres_search_1.png",
        "/projects_images/addres_search_2.png",
        "/projects_images/addres_search_3.png",
      ],
      features: [
        "User authentication & profiles",
        "Product search & filtering",
        "Shopping cart & checkout",
        "Payment processing",
        "Order tracking & history",
        "Admin dashboard",
      ],
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A personal portfolio showcasing skills and projects with modern design",
      tech: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      demo: "https://example.com/demo",
      source: "https://github.com/Weisjan/Address-browser",
      detailedDescription:
        "This portfolio website features smooth animations, responsive design, and a modern user interface. It includes sections for showcasing projects, skills, and contact information. The site is optimized for performance and accessibility.",
      images: [
        "/home_images/2.jpg",
        "/home_images/3.jpg",
        "/home_images/4.jpg",
      ],
      features: [
        "Responsive design",
        "Custom animations",
        "Dark/light mode",
        "Project showcase",
        "Skills section",
        "Contact form",
      ],
    },
    {
      id: 3,
      title: "Portfolio test",
      description:
        "A personal portfolio showcasing skills and projects with modern design",
      tech: ["React", "Tailwind CSS", "Framer Motion", "NextJS", "MongoDB"],
      demo: "https://example.com/demo",
      source: "https://github.com/Weisjan/Address-browser",
      detailedDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      images: [
        "/home_images/2.jpg",
        "/home_images/3.jpg",
        "/home_images/4.jpg",
      ],
      features: [
        "Responsive design",
        "Custom animations",
        "Dark/light mode",
        "Project showcase",
        "Skills section",
        "Contact form",
      ],
    },
  ];

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const openFullImage = (img, e) => {
    e.stopPropagation();
    setSelectedImage(img);
  };

  const closeFullImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  // Function to determine the tech badge color
  const getTechBadgeColor = (techName) => {
    const techColors = {
      React: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      "Node.js": "bg-green-500/20 text-green-300 border-green-500/40",
      MongoDB: "bg-green-600/20 text-green-300 border-green-600/40",
      Stripe: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      "Tailwind CSS": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      "Framer Motion": "bg-pink-500/20 text-pink-300 border-pink-500/40",
      TypeScript: "bg-blue-600/20 text-blue-300 border-blue-600/40",
      NextJS: "bg-black/40 text-gray-300 border-gray-500/40",
      default: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    };

    return techColors[techName] || techColors.default;
  };

  return (
    <main className="text-white">
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
              className="px-6 py-3 border border-emerald-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

      {/* Projects Section */}
      <section
        ref={sectionRef}
        className="py-16 px-4 md:px-12 relative overflow-hidden fade-in-section"
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400 fade-up-element">
            Latest Projects
          </h2>

          <p className="text-xl text-center text-white mb-8 fade-up-element animation-delay-200">
            Visit my{" "}
            <a
              target="_blank"
              href="https://github.com/Weisjan"
              className="!text-emerald-400 hover:text-emerald-300 underline decoration-dotted"
            >
              GitHub
            </a>{" "}
            to see more
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(el) => (projectRefs.current[index] = { current: el })}
                className="project-card bg-gray-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2 relative group cursor-pointer"
                style={{ animationDelay: `${index * 150 + 400}ms` }}
                onClick={() => openProjectDetails(project)}
              >
                {/* Corner elements - Fixed with proper positioning and size */}
                {/* <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
                <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-emerald-400 to-emerald-600"></div>
                <div className="absolute top-0 right-0 w-1 h-24 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <div className="absolute bottom-0 left-0 w-1 h-24 bg-gradient-to-t from-emerald-400 to-emerald-600"></div>
                <div className="absolute bottom-0 right-0 w-24 h-1 bg-gradient-to-l from-emerald-400 to-emerald-600"></div>
                <div className="absolute bottom-0 right-0 w-1 h-24 bg-gradient-to-t from-emerald-400 to-emerald-600"></div> */}

                <div className="relative">
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {Array(3)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === 0
                              ? "bg-emerald-400"
                              : idx === 1
                              ? "bg-emerald-500"
                              : "bg-emerald-600"
                          }`}
                        ></div>
                      ))}
                  </div>
                </div>

                {/* Featured image with hover effect */}
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
                </div>

                <div className="p-6 border-t border-emerald-800/30">
                  <h3 className="text-2xl font-bold mb-2 font-mono text-emerald-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full border ${getTechBadgeColor(
                          tech
                        )}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center relative overflow-hidden group"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectDetails(project);
                    }}
                  >
                    <span className="mr-1">&lt;</span>
                    <span>View Details</span>
                    <span className="ml-1">/&gt;</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10 fade-up-element animation-delay-600">
            <Link
              to="/projects"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-mono uppercase tracking-wider rounded hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group"
            >
              <span className="relative z-10">View All Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </Link>
          </div>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeProjectDetails}
          >
            <div
              className="bg-gray-900 border border-emerald-500/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner elements - Fixed with proper positioning and size */}
              <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
              <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-emerald-400 to-emerald-600"></div>
              <div className="absolute top-0 right-0 w-1 h-32 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              <div className="absolute bottom-0 left-0 w-1 h-32 bg-gradient-to-t from-emerald-400 to-emerald-600"></div>
              <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-emerald-400 to-emerald-600"></div>
              <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-emerald-400 to-emerald-600"></div>

              <div className="flex justify-between items-center p-6 border-b border-emerald-800/30">
                <h3 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={closeProjectDetails}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {/* image gallery */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedProject.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden border border-emerald-800/30 rounded-lg group cursor-pointer"
                      onClick={(e) => openFullImage(img, e)}
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.title} screenshot ${idx + 1}`}
                        className="w-full h-48 object-cover transform transition-all duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <button
                          className="bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                          onClick={(e) => openFullImage(img, e)}
                        >
                          View Full Size
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-mono text-emerald-400 mb-2">
                    &lt;Description/&gt;
                  </h4>
                  <p className="text-gray-300">
                    {selectedProject.detailedDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-mono text-emerald-400 mb-2">
                    &lt;Features/&gt;
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="text-emerald-400 mr-2">&gt;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-mono text-emerald-400 mb-2">
                    &lt;Technologies/&gt;
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-sm px-3 py-1.5 rounded-full border ${getTechBadgeColor(
                          tech
                        )}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-emerald-800/30">
                  <a
                    target="_blank"
                    href={selectedProject.demo}
                    className="px-4 py-2 bg-emerald-900/30 border border-emerald-500/50 text-emerald-400 rounded flex items-center justify-center hover:bg-emerald-800/50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    target="_blank"
                    href={selectedProject.source}
                    className="px-4 py-2 bg-gray-800/50 border border-emerald-500/50 text-emerald-400 rounded flex items-center justify-center hover:bg-gray-800/80 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    View Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 flex items-center justify-center p-4"
            onClick={closeFullImage}
          >
            <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
              <button
                onClick={closeFullImage}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Full size view"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
