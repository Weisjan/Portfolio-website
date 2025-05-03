import { useState } from "react";

const CyberpunkRoadmap = () => {
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
      year: "2022 Q3",
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
      completed: true,
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

  return (
    <section className="w-full overflow-hidden py-12 px-4" id="roadmap">
      <div className="max-w-6xl mx-auto relative">
        {/* Title with Cyberpunk style */}
        <div className="relative mb-12 text-center">
          <h2 className="text-5xl font-bold tracking-tighter text-emerald-400">
            SKILL MATRIX
          </h2>
          <div className="h-1 w-32 bg-emerald-500 mx-auto mt-2 shadow-lg shadow-emerald-500/50"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded border transition-all duration-300 ${
              filter === "all"
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/50"
                : "bg-black border-gray-700 text-gray-300 hover:border-emerald-500"
            }`}
          >
            ALL SYSTEMS
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded border transition-all duration-300 ${
                filter === key
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/50"
                  : "bg-black border-gray-700 text-gray-300 hover:border-emerald-500"
              }`}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Roadmap SVG visualization */}
        <div className="relative w-full mt-12 mb-8 h-96">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 350"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Render tracks */}
            {Object.keys(trackGroups).map((trackNum, trackIndex) => {
              const trackY = 70 + trackIndex * 100;
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
                  {/* Background horizontal track line */}
                  <path
                    d={`M50,${trackY} H950`}
                    strokeWidth="6"
                    stroke="#1a1a2e"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Inner track line */}
                  <path
                    d={`M50,${trackY} H950`}
                    strokeWidth="2"
                    stroke="#2d2d44"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Colored progress line with glow */}
                  <path
                    d={`M50,${trackY} H${
                      50 + (900 * completionPercentage) / 100
                    }`}
                    strokeWidth="2"
                    stroke={trackColor}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 2px " + trackColor + ")",
                    }}
                  />

                  {/* Track labels - dynamic category name and completion percentage */}
                  <text
                    x="20"
                    y={trackY + 5}
                    className={`fill-${
                      category === "frontend"
                        ? "cyan"
                        : category === "backend"
                        ? "fuchsia"
                        : "yellow"
                    }-400`}
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    textAnchor="middle"
                  >
                    {categories[category].name.substring(0, 1)}
                  </text>

                  {/* Milestone points */}
                  {milestones.map((milestone, index) => {
                    const xPosition =
                      50 + (900 / (totalMilestones - 1 || 1)) * index;
                    const categoryColor =
                      categories[milestone.category].trackColor;

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
                          r="12"
                          className={`${
                            milestone.completed
                              ? "fill-gray-900"
                              : "fill-gray-900"
                          }`}
                          stroke={categoryColor}
                          strokeWidth="2"
                          style={{
                            filter: milestone.completed
                              ? `drop-shadow(0 0 3px ${categoryColor})`
                              : "none",
                          }}
                        />

                        {/* Inner circle/icon */}
                        {milestone.completed ? (
                          <circle
                            cx={xPosition}
                            cy={trackY}
                            r="5"
                            fill={categoryColor}
                            style={{
                              filter: `drop-shadow(0 0 2px ${categoryColor})`,
                            }}
                          />
                        ) : (
                          <circle
                            cx={xPosition}
                            cy={trackY}
                            r="5"
                            className="fill-gray-800"
                            stroke={categoryColor}
                            strokeWidth="1"
                          />
                        )}

                        {/* Connection lines */}
                        {index < milestones.length - 1 && (
                          <line
                            x1={xPosition + 12}
                            y1={trackY}
                            x2={
                              xPosition +
                              (900 / (totalMilestones - 1 || 1) - 12)
                            }
                            y2={trackY}
                            stroke={categoryColor}
                            strokeWidth="1"
                            strokeDasharray="4 2"
                            opacity="0.6"
                          />
                        )}

                        {/* Year marker */}
                        <text
                          x={xPosition}
                          y={trackY - 20}
                          textAnchor="middle"
                          fill="#6b7280"
                          style={{ fontSize: "8px" }}
                        >
                          {milestone.year}
                        </text>

                        {/* Milestone title */}
                        <text
                          x={xPosition}
                          y={trackY + 25}
                          textAnchor="middle"
                          fill="#d1d5db"
                          style={{
                            fontSize: "9px",
                            fontWeight: milestone.completed ? "bold" : "normal",
                          }}
                        >
                          {milestone.title}
                        </text>

                        {/* Cyberpunk tooltip display on hover */}
                        {activePoint === milestone.id && (
                          <foreignObject
                            x={xPosition < 150 ? xPosition : xPosition - 120}
                            y={trackY - 120}
                            width="240"
                            height="120"
                          >
                            <div
                              className="bg-black p-3 rounded border-l-2 border-emerald-500 w-full h-full flex flex-col text-white overflow-visible relative"
                              style={{
                                fontSize: "10px",
                                transform: xPosition < 150 ? "none" : "none",
                              }}
                            >
                              <div className="z-10">
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-bold text-sm text-emerald-400">
                                    {milestone.title}
                                  </h4>
                                  <span className="text-gray-400 text-xs">
                                    {milestone.year}
                                  </span>
                                </div>

                                <p className="mb-1 text-xs text-gray-300">
                                  {milestone.description}
                                </p>

                                <div className="flex items-center gap-2 mb-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-sm text-xs ${
                                      milestone.completed
                                        ? "bg-emerald-900/50 text-emerald-300"
                                        : "bg-gray-800 text-gray-400"
                                    }`}
                                  >
                                    {milestone.completed
                                      ? "UNLOCKED"
                                      : "LOCKED"}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-1">
                                  {milestone.skills.map((skill, i) => (
                                    <span
                                      key={i}
                                      className="text-xs text-gray-400"
                                    >
                                      » {skill}
                                    </span>
                                  ))}
                                </div>
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

export default CyberpunkRoadmap;
