import { useState, useRef, useMemo } from "react";

const RoadmapSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [filter, setFilter] = useState("all");
  const tooltipTimeoutRef = useRef(null);

  // Data
  const milestones = useMemo(
    () => [
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
        skills: [
          "SSR/SSG",
          "API Routes",
          "File-based Routing",
          "Edge Functions",
        ],
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
    ],
    []
  );

  // Category metadata
  const categories = useMemo(
    () => ({
      frontend: {
        name: "Frontend",
        trackColor: "#10b981",
      },
      backend: {
        name: "Backend",
        trackColor: "#10b981",
      },
      ai: {
        name: "AI/ML",
        trackColor: "#10b981",
      },
    }),
    []
  );

  // Process milestones based on filters
  const processedData = useMemo(() => {
    // Filter milestones based on selected category
    const filteredMilestones =
      filter === "all"
        ? milestones
        : milestones.filter((m) => m.category === filter);

    // Group milestones by track
    const trackGroups = {};
    filteredMilestones.forEach((milestone) => {
      const track = milestone.track || 1;
      if (!trackGroups[track]) trackGroups[track] = [];
      trackGroups[track].push(milestone);
    });

    // Sort milestones in each track chronologically
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

    return trackGroups;
  }, [filter, milestones]);

  // Calculate visually used space
  const trackCount = Object.keys(processedData).length;
  const svgHeight = Math.max(300, 150 + trackCount * 150);

  /**
   * Handles mouse enter event for milestone nodes
   * @param {string} id - Milestone ID
   */
  const handleMouseEnter = (id) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    setActivePoint(id);
  };

  /**
   * Handles mouse leave event for milestone nodes
   */
  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setActivePoint(null);
    }, 300);
  };

  /**
   * Calculates tooltip position based on milestone position
   * @param {number} xPosition - X coordinate of milestone
   * @param {number} trackY - Y coordinate of track
   * @returns {Object} - Tooltip position coordinates
   */
  const getTooltipPosition = (xPosition, trackY) => {
    let posX;
    // Position tooltip based on proximity to edges
    if (xPosition < 200) {
      posX = xPosition; // Left edge
    } else if (xPosition > 1000) {
      posX = xPosition - 260; // Right edge
    } else {
      posX = xPosition - 130; // Middle
    }

    return {
      x: posX,
      y: trackY - 180, // Position tooltip above milestone
    };
  };

  /**
   * Renders a timeline track with milestones
   * @param {string} trackNum - Track identifier
   * @param {number} trackIndex - Track index for positioning
   * @returns {JSX.Element} - Track SVG group
   */
  const renderTrack = (trackNum, trackIndex) => {
    const milestones = processedData[trackNum];
    const totalMilestones = milestones.length;
    const completedCount = milestones.filter((m) => m.completed).length;
    const completionPercentage =
      totalMilestones > 0 ? (completedCount / totalMilestones) * 100 : 0;

    // Calculate vertical position for this track
    const trackY = 150 + trackIndex * 150;

    // Get track color from the milestone category
    const category = milestones[0]?.category || "frontend";
    const trackColor = categories[category].trackColor;

    return (
      <g key={`track-${trackNum}`}>
        {/* Background and progress lines */}
        <path
          d={`M50,${trackY} H1150`}
          strokeWidth="8"
          stroke="#1a1a2e"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M50,${trackY} H1150`}
          strokeWidth="3"
          stroke="#2d2d44"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M50,${trackY} H${50 + (1100 * completionPercentage) / 100}`}
          strokeWidth="3"
          stroke={trackColor}
          strokeLinecap="round"
          fill="none"
          style={{ filter: `drop-shadow(0 0 3px ${trackColor})` }}
        />

        {/* Milestone points */}
        {milestones.map((milestone, index) => {
          const xPosition = 50 + (1100 / (totalMilestones - 1 || 1)) * index;
          const categoryColor = categories[milestone.category].trackColor;

          return (
            <g
              key={milestone.id}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(milestone.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Connection lines (rendered first) */}
              {index < milestones.length - 1 && (
                <line
                  x1={xPosition + 16}
                  y1={trackY}
                  x2={xPosition + (1100 / (totalMilestones - 1 || 1) - 16)}
                  y2={trackY}
                  stroke={categoryColor}
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  opacity="0.6"
                />
              )}

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
                  style={{ filter: `drop-shadow(0 0 3px ${categoryColor})` }}
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
            </g>
          );
        })}
      </g>
    );
  };

  /**
   * Renders milestone tooltips at the top layer
   * @returns {Array<JSX.Element>} - Tooltip SVG elements
   */
  const renderTooltips = () => {
    const tooltips = [];

    Object.keys(processedData).forEach((trackNum, trackIndex) => {
      const trackY = 150 + trackIndex * 150;
      const milestones = processedData[trackNum];
      const totalMilestones = milestones.length;

      milestones.forEach((milestone, index) => {
        const xPosition = 50 + (1100 / (totalMilestones - 1 || 1)) * index;
        const tooltipPos = getTooltipPosition(xPosition, trackY);

        // Only render the tooltip if this milestone is active
        if (activePoint === milestone.id) {
          tooltips.push(
            <foreignObject
              key={`tooltip-${milestone.id}`}
              x={tooltipPos.x}
              y={tooltipPos.y}
              width="320"
              height="250"
              style={{ overflow: "visible", zIndex: 1000 }}
            >
              <div
                className="bg-black p-4 rounded border-l-4 border-emerald-500 w-full h-full flex flex-col text-white relative shadow-xl shadow-emerald-500/30"
                style={{
                  fontSize: "12px",
                  zIndex: 1000,
                  position: "relative",
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => {
                  // Clear the timeout when mouse enters the tooltip
                  if (tooltipTimeoutRef.current) {
                    clearTimeout(tooltipTimeoutRef.current);
                    tooltipTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={() => {
                  // Hide tooltip when mouse leaves it
                  setActivePoint(null);
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
                      <span className="text-emerald-500 mr-1">»</span> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </foreignObject>
          );
        }
      });
    });

    return tooltips;
  };

  /**
   * Renders category filter buttons
   * @returns {JSX.Element} - Filter button group
   */
  const renderFilters = () => (
    <div className="flex flex-wrap justify-center gap-3 mb-5 relative z-10">
      <button
        onClick={() => setFilter("all")}
        className={`px-5 py-2 rounded border transition-all duration-300 ${
          filter === "all"
            ? "border-emerald-400"
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
              ? "border-emerald-400"
              : "bg-black border-gray-700 text-gray-300 hover:border-emerald-500"
          }`}
        >
          {category.name.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden py-8" id="roadmap">
      <div className="w-full relative">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-emerald-400">Roadmap</h2>
        </div>

        {/* Category Filters */}
        {renderFilters()}

        {/* Roadmap SVG visualization */}
        <div className="relative">
          <svg
            className="w-full"
            viewBox={`0 0 1200 ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Render all tracks */}
            {Object.keys(processedData).map((trackNum, index) =>
              renderTrack(trackNum, index)
            )}

            {/* Render all tooltips on top */}
            {renderTooltips()}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
