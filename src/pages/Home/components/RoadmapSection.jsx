import { useState } from "react";

const RoadmapSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [filter, setFilter] = useState("all");

  // Define your roadmap milestones with categories
  const milestones = [
    // FRONTEND TRACK
    {
      id: "html-css",
      title: "HTML/CSS",
      completed: true,
      description: "Foundation of web development",
      skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox/Grid"],
      year: "2020 Q3",
      category: "frontend",
      track: 1,
    },
    {
      id: "javascript",
      title: "JavaScript",
      completed: true,
      description: "Programming fundamentals",
      skills: ["ES6+", "DOM Manipulation", "Async/Await", "APIs"],
      year: "2022 Q4",
      category: "frontend",
      track: 1,
    },
    {
      id: "react",
      title: "React",
      completed: true,
      description: "Component-based UI",
      skills: ["React Hooks", "State Management", "Component Design", "JSX"],
      year: "2023 Q1",
      category: "frontend",
      track: 1,
    },
    {
      id: "typescript",
      title: "TypeScript",
      completed: false,
      description: "Type-safe JavaScript",
      skills: ["Static Types", "Interfaces", "Generics", "Advanced Types"],
      year: "2024 Q1",
      category: "frontend",
      track: 1,
    },
    {
      id: "next-js",
      title: "Next.js",
      completed: false,
      description: "React framework for production",
      skills: ["SSR/SSG", "API Routes", "File-based Routing", "Edge Functions"],
      year: "2024 Q3",
      category: "frontend",
      track: 1,
    },
    {
      id: "webgl",
      title: "WebGL/3D",
      completed: false,
      description: "Immersive web experiences",
      skills: ["Three.js", "Shaders", "3D Modeling", "Animation"],
      year: "2026 Q1",
      category: "frontend",
      track: 1,
    },

    // BACKEND TRACK
    {
      id: "node",
      title: "Node.js",
      completed: true,
      description: "Server-side JavaScript",
      skills: ["Express", "RESTful APIs", "Authentication", "Middleware"],
      year: "2023 Q1",
      category: "backend",
      track: 2,
    },
    {
      id: "databases",
      title: "Databases",
      completed: true,
      description: "Data persistence",
      skills: ["MongoDB", "SQL", "Data Modeling", "CRUD Operations"],
      year: "2023 Q2",
      category: "backend",
      track: 2,
    },
    {
      id: "graphql",
      title: "GraphQL",
      completed: false,
      description: "Modern API development",
      skills: ["Schemas", "Resolvers", "Apollo", "Type Systems"],
      year: "2024 Q4",
      category: "backend",
      track: 2,
    },
    {
      id: "devops",
      title: "DevOps",
      completed: false,
      description: "Deployment & Operations",
      skills: ["Docker", "CI/CD", "AWS", "Monitoring"],
      year: "2025 Q1",
      category: "backend",
      track: 2,
    },
    {
      id: "microservices",
      title: "Microservices",
      completed: false,
      description: "Distributed systems",
      skills: ["API Gateways", "Service Mesh", "Kubernetes", "Event Driven"],
      year: "2025 Q3",
      category: "backend",
      track: 2,
    },

    // AI/ML TRACK
    {
      id: "python",
      title: "Python",
      completed: true,
      description: "AI/ML foundation language",
      skills: ["Data Structures", "NumPy", "Pandas", "Scientific Computing"],
      year: "2023 Q3",
      category: "ai",
      track: 3,
    },
    {
      id: "ai-ml",
      title: "ML Fundamentals",
      completed: false,
      description: "Machine Learning Basics",
      skills: [
        "Supervised Learning",
        "Data Analysis",
        "Feature Engineering",
        "Statistics",
      ],
      year: "2024 Q2",
      category: "ai",
      track: 3,
    },
    {
      id: "tensorflow",
      title: "TensorFlow/PyTorch",
      completed: false,
      description: "Deep Learning Frameworks",
      skills: ["Neural Networks", "Model Training", "Transfer Learning"],
      year: "2024 Q4",
      category: "ai",
      track: 3,
    },
    {
      id: "deep-learning",
      title: "Deep Learning",
      completed: false,
      description: "Advanced Neural Networks",
      skills: ["CNN", "RNN", "Computer Vision", "NLP"],
      year: "2025 Q2",
      category: "ai",
      track: 3,
    },
    {
      id: "llm",
      title: "LLMs & Transformers",
      completed: false,
      description: "Large Language Models",
      skills: ["Attention Mechanisms", "Fine-tuning", "Prompting", "RAG"],
      year: "2025 Q4",
      category: "ai",
      track: 3,
    },
  ];

  // Category metadata with emerald colors
  const categories = {
    frontend: {
      name: "Frontend",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      glowColor: "shadow-emerald-500/50",
      trackColor: "#10b981", // Tailwind emerald-500
    },
    backend: {
      name: "Backend",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      glowColor: "shadow-emerald-500/50",
      trackColor: "#10b981", // Tailwind emerald-500
    },
    ai: {
      name: "AI/ML",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      glowColor: "shadow-emerald-500/50",
      trackColor: "#10b981", // Tailwind emerald-500
    },
  };

  // Filter milestones based on selected category
  const filteredMilestones =
    filter === "all"
      ? milestones
      : milestones.filter((m) => m.category === filter);

  // Group milestones by track for multi-track visualization
  const trackGroups = {};
  filteredMilestones.forEach((milestone) => {
    const track = milestone.track || 1;
    if (!trackGroups[track]) trackGroups[track] = [];
    trackGroups[track].push(milestone);
  });

  // Sort milestones in each track by chronological order
  Object.keys(trackGroups).forEach((track) => {
    trackGroups[track].sort((a, b) => {
      const yearA = parseInt(a.year.split(" ")[0]);
      const yearB = parseInt(b.year.split(" ")[0]);
      if (yearA !== yearB) return yearA - yearB;

      const quarterA = parseInt(a.year.split("Q")[1]);
      const quarterB = parseInt(b.year.split("Q")[1]);
      return quarterA - quarterB;
    });
  });

  // Calculate tooltip positioning for milestones near edges with expanded width
  const getTooltipPosition = (xPosition) => {
    // For milestones near the left edge
    if (xPosition < 200) {
      return { x: xPosition, align: "left" };
    }
    // For milestones near the right edge
    else if (xPosition > 1000) {
      return { x: xPosition - 260, align: "right" };
    }
    // For milestones in the middle
    else {
      return { x: xPosition - 130, align: "center" };
    }
  };

  return (
    <section className="w-full overflow-hidden py-12 px-0" id="roadmap">
      <div className="w-full relative">
        <div className="relative mb-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400 fade-up-element">
            Roadmap
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-5 relative z-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded border transition-all duration-300 ${
              filter === "all"
                ? " border border-emerald-400 rounded-md transition-colors duration-300"
                : "bg-black border-gray-700 text-gray-300 hover:border-emerald-500"
            }`}
          >
            ALL
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded border transition-all duration-300 ${
                filter === key
                  ? " border border-emerald-400 rounded-md transition-colors duration-300"
                  : "bg-black border-gray-700 text-gray-300 hover:border-emerald-500"
              }`}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Roadmap SVG visualization */}
        <div className="relative">
          <svg
            className="w-full h-full"
            viewBox="0 50 1200 550"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Render tracks */}
            {Object.keys(trackGroups).map((trackNum, trackIndex) => {
              const trackY = 200 + trackIndex * 150; // More space between tracks
              const milestones = trackGroups[trackNum];
              const totalMilestones = milestones.length;
              const completedCount = milestones.filter(
                (m) => m.completed
              ).length;
              const completionPercentage =
                totalMilestones > 0
                  ? (completedCount / totalMilestones) * 100
                  : 0;

              // Get track color from the milestone category
              const category = milestones[0]?.category || "frontend";
              const trackColor = categories[category].trackColor;

              return (
                <g key={`track-${trackNum}`}>
                  {/* Background horizontal track line - full width */}
                  <path
                    d={`M50,${trackY} H1150`}
                    strokeWidth="8"
                    stroke="#1a1a2e"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Inner track line - full width */}
                  <path
                    d={`M50,${trackY} H1150`}
                    strokeWidth="3"
                    stroke="#2d2d44"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Colored progress line with glow - adjusted for full width */}
                  <path
                    d={`M50,${trackY} H${
                      50 + (1100 * completionPercentage) / 100
                    }`}
                    strokeWidth="3"
                    stroke={trackColor}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 3px " + trackColor + ")",
                    }}
                  />

                  {/* Milestone points */}
                  {milestones.map((milestone, index) => {
                    // Spread across the SVG area
                    const xPosition =
                      50 + (1100 / (totalMilestones - 1 || 1)) * index;
                    const categoryColor =
                      categories[milestone.category].trackColor;
                    const tooltipPos = getTooltipPosition(xPosition);

                    return (
                      <g
                        key={milestone.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setActivePoint(milestone.id)}
                        onMouseLeave={() => setActivePoint(null)}
                      >
                        {/* Milestone node */}
                        <circle
                          cx={xPosition}
                          cy={trackY}
                          r="16"
                          className="fill-gray-900"
                          stroke={categoryColor}
                          strokeWidth="3"
                          style={{
                            filter: milestone.completed
                              ? `drop-shadow(0 0 4px ${categoryColor})`
                              : "none",
                          }}
                        />

                        {/* Inner circle/icon */}
                        {milestone.completed ? (
                          <circle
                            cx={xPosition}
                            cy={trackY}
                            r="7"
                            fill={categoryColor}
                            style={{
                              filter: `drop-shadow(0 0 3px ${categoryColor})`,
                            }}
                          />
                        ) : (
                          <circle
                            cx={xPosition}
                            cy={trackY}
                            r="7"
                            className="fill-gray-800"
                            stroke={categoryColor}
                            strokeWidth="1"
                          />
                        )}

                        {/* Connection lines */}
                        {index < milestones.length - 1 && (
                          <line
                            x1={xPosition + 16}
                            y1={trackY}
                            x2={
                              xPosition +
                              (1100 / (totalMilestones - 1 || 1) - 16)
                            }
                            y2={trackY}
                            stroke={categoryColor}
                            strokeWidth="2"
                            strokeDasharray="6 3"
                            opacity="0.6"
                          />
                        )}

                        {/* Milestone title */}
                        <text
                          x={xPosition}
                          y={trackY + 35}
                          textAnchor="middle"
                          fill="#d1d5db"
                          style={{
                            fontSize: "14px",
                            fontWeight: milestone.completed ? "bold" : "normal",
                          }}
                        >
                          {milestone.title}
                        </text>

                        {/* Tooltip display on hover */}
                        {activePoint === milestone.id && (
                          <foreignObject
                            x={tooltipPos.x}
                            y={trackY - 160}
                            width="320"
                            height="250"
                            style={{ overflow: "auto" }}
                          >
                            <div
                              className="bg-black p-4 rounded border-l-4 border-emerald-500 w-full h-full flex flex-col text-white relative shadow-xl shadow-emerald-500/30 "
                              style={{
                                fontSize: "12px",
                                zIndex: 100,
                              }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-lg text-emerald-400">
                                  {milestone.title}
                                </h4>
                              </div>

                              <p className="mb-2 text-sm text-gray-300">
                                {milestone.description}
                              </p>

                              <div className="flex items-center gap-2 mb-3">
                                <span
                                  className={`px-3 py-1 rounded text-sm font-bold ${
                                    milestone.completed
                                      ? "bg-emerald-900/60 text-emerald-300 border border-emerald-600"
                                      : "bg-gray-800 text-gray-400 border border-gray-700"
                                  }`}
                                >
                                  {milestone.completed ? "UNLOCKED" : "LOCKED"}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {milestone.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="text-sm text-gray-300 flex items-center"
                                  >
                                    <span className="text-emerald-500 mr-1">
                                      »
                                    </span>{" "}
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
