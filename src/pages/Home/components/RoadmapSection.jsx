import { useState } from "react";

const RoadmapSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [filter, setFilter] = useState("all");

  // Define your roadmap milestones with categories
  const milestones = [
    {
      id: "html-css",
      title: "HTML/CSS Mastery",
      completed: true,
      description: "Foundation of web development",
      skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox/Grid"],
      year: "2022 Q3",
      category: "frontend",
    },
    {
      id: "javascript",
      title: "JavaScript",
      completed: true,
      description: "Programming fundamentals",
      skills: ["ES6+", "DOM Manipulation", "Async/Await", "APIs"],
      year: "2022 Q4",
      category: "frontend",
    },
    {
      id: "react",
      title: "React",
      completed: true,
      description: "Component-based UI",
      skills: ["React Hooks", "State Management", "Component Design", "JSX"],
      year: "2023 Q1",
      category: "frontend",
    },
    {
      id: "node",
      title: "Node.js",
      completed: true,
      description: "Server-side JavaScript",
      skills: ["Express", "RESTful APIs", "Authentication", "Middleware"],
      year: "2023 Q1",
      category: "backend",
    },
    {
      id: "databases",
      title: "Databases",
      completed: true,
      description: "Data persistence",
      skills: ["MongoDB", "SQL", "Data Modeling", "CRUD Operations"],
      year: "2023 Q2",
      category: "backend",
    },
    {
      id: "graduation",
      title: "Graduation",
      completed: true,
      description: "Academic achievement",
      skills: ["Computer Science Degree", "Final Project", "Thesis Defense"],
      year: "2023 Q4",
      category: "education",
    },
    {
      id: "typescript",
      title: "TypeScript",
      completed: true,
      description: "Type-safe JavaScript",
      skills: ["Static Types", "Interfaces", "Generics", "Advanced Types"],
      year: "2024 Q1",
      category: "frontend",
    },
    {
      id: "ai-ml",
      title: "AI/ML Fundamentals",
      completed: false,
      description: "Machine Learning Basics",
      skills: ["Python", "TensorFlow", "Supervised Learning", "Data Analysis"],
      year: "2024 Q2",
      category: "ai",
    },
    {
      id: "devops",
      title: "DevOps",
      completed: false,
      description: "Deployment & Operations",
      skills: ["Docker", "CI/CD", "AWS", "Monitoring"],
      year: "2025 Q1",
      category: "backend",
    },
    {
      id: "deep-learning",
      title: "Deep Learning",
      completed: false,
      description: "Advanced Neural Networks",
      skills: ["Neural Networks", "Computer Vision", "NLP", "Transformers"],
      year: "2025 Q3",
      category: "ai",
    },
  ];

  // Category metadata - used only for filtering now
  const categories = {
    frontend: {
      name: "Frontend",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      hoverBg: "bg-emerald-900/50",
    },
    backend: {
      name: "Backend",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      hoverBg: "bg-emerald-900/50",
    },
    ai: {
      name: "AI/ML",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      hoverBg: "bg-emerald-900/50",
    },
    education: {
      name: "Education",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      hoverBg: "bg-emerald-900/50",
    },
  };

  // Filter milestones based on selected category
  const filteredMilestones =
    filter === "all"
      ? milestones
      : milestones.filter((m) => m.category === filter);

  return (
    <section className="w-full overflow-hidden" id="roadmap">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400">
          ROADMAP
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-5">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === "all"
                ? "bg-emerald-400 text-black font-bold"
                : "bg-black text-emerald-400 hover:bg-gray-900"
            }`}
          >
            All
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm  transition-all flex items-center ${
                filter === key
                  ? `bg-emerald-400 text-black font-bold`
                  : `bg-black text-gray-300 hover:bg-gray-900`
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Full-width horizontal line with markers */}
        <div className="relative w-full mb-48">
          {/* Main path container */}
          <div className="relative">
            {/* SVG Path - Full width straight line */}
            <div className="w-screen relative h-32 left-1/2 transform -translate-x-1/2">
              <svg
                className="w-full h-32 absolute"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
              >
                {/* Base path background - full width */}
                <path
                  d="M0,50 L1200,50"
                  strokeWidth="4"
                  stroke="#1f1f1f"
                  fill="none"
                />

                {/* Colored progress path */}
                <path
                  d={`M0,50 L${
                    (filteredMilestones.filter((m) => m.completed).length /
                      filteredMilestones.length) *
                    1200
                  },50`}
                  strokeWidth="6"
                  stroke="#10b981"
                  fill="none"
                />
              </svg>

              {/* Milestone points positioned along the path */}
              <div className="absolute top-2.5 left-0 w-full h-full pointer-events-none">
                {filteredMilestones.map((milestone, index) => {
                  // Distribute points evenly along the path
                  const position = {
                    left: `${
                      5 + (index / (filteredMilestones.length - 1)) * 90
                    }%`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  };

                  return (
                    <div
                      key={milestone.id}
                      className="absolute pointer-events-auto"
                      style={position}
                      onMouseEnter={() => setActivePoint(milestone.id)}
                      onMouseLeave={() => setActivePoint(null)}
                    >
                      {/* Milestone node with check or loading icon */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full border-4 flex items-center justify-center cursor-pointer transition-transform mb-2
                          ${
                            milestone.completed
                              ? "border-emerald-500"
                              : "border-none"
                          } 
                          ${
                            activePoint === milestone.id
                              ? "scale-125 z-10"
                              : "scale-100"
                          }
                          bg-black`}
                        >
                          {milestone.completed ? (
                            // Check mark for completed
                            <svg
                              className="w-6 h-6 text-emerald-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            // Loading wheel for in-progress
                            <svg
                              className="animate-spin w-10 h-10 text-emerald-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Milestone title below the node */}
                        <div className="text-xs text-center w-20 text-emerald-400 font-medium">
                          {milestone.title}
                        </div>
                      </div>

                      {/* Tooltip appears on hover */}
                      {activePoint === milestone.id && (
                        <div
                          className="absolute bg-black p-4 rounded-lg shadow-lg border-l-4 border-emerald-400 w-72 z-20"
                          style={{
                            top: "0%", // Moved down to account for title
                            left:
                              index < filteredMilestones.length / 2
                                ? "0"
                                : "auto",
                            right:
                              index < filteredMilestones.length / 2
                                ? "auto"
                                : "0",
                          }}
                        >
                          <h4 className="font-bold mb-1 text-lg">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {milestone.year}
                          </p>
                          <p className="mb-2">{milestone.description}</p>
                          <div className="flex items-center mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                milestone.completed
                                  ? "bg-emerald-900/70 text-emerald-300"
                                  : "bg-gray-800 text-gray-400"
                              }`}
                            >
                              {milestone.completed
                                ? "Completed"
                                : "In Progress"}
                            </span>
                          </div>
                          <ul className="text-sm space-y-1">
                            {milestone.skills.map((skill, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2 text-emerald-400">•</span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="absolute -top-2 left-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-black border-l-transparent border-r-transparent"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
