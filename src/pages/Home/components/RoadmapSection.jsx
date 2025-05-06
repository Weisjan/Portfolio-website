import { useState, useRef, useMemo, useEffect } from "react";
import { milestones, categories } from "../data/roadmapData";

const RoadmapSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [filter, setFilter] = useState("frontend");
  const [isMobile, setIsMobile] = useState(false);
  const tooltipTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const processedData = useMemo(() => {
    const filteredMilestones = milestones.filter((m) => m.category === filter);

    const trackGroups = {};
    filteredMilestones.forEach((milestone) => {
      const track = milestone.track || 1;
      if (!trackGroups[track]) trackGroups[track] = [];
      trackGroups[track].push(milestone);
    });

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
  }, [filter]);

  const dimensions = useMemo(() => {
    const trackCount = Object.keys(processedData).length;

    if (isMobile) {
      const maxMilestonesInTrack = Math.max(
        ...Object.values(processedData).map((track) => track.length)
      );
      return {
        svgWidth: Math.min(350, window.innerWidth - 40),
        svgHeight: maxMilestonesInTrack * 120 + 100,
        trackSpacing: 120,
        milestoneSpacing: 120,
      };
    } else {
      return {
        svgWidth: 1200,
        svgHeight: Math.max(300, 150 + trackCount * 150),
        trackSpacing: 150,
        milestoneSpacing: 0,
      };
    }
  }, [processedData, isMobile]);

  const handleMouseEnter = (id) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    setActivePoint(id);
  };

  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setActivePoint(null);
    }, 300);
  };

  const getTooltipPosition = (x, y) => {
    if (isMobile) {
      let posY;
      if (y > 500) {
        posY = y - 130;
      } else {
        posY = y - 60;
      }
      // For mobile: position tooltip to the right of the milestone
      return {
        x: x + 24,
        y: posY,
      };
    } else {
      // For desktop: position tooltip above the milestone
      let posX;
      if (x < 200) {
        posX = x; // Left edge
      } else if (x > dimensions.svgWidth - 200) {
        posX = x - 300; // Right edge
      } else {
        posX = x - 130; // Middle
      }

      return {
        x: posX,
        y: y - 150,
      };
    }
  };

  const renderMobileTrack = (trackNum, trackIndex) => {
    const trackMilestones = processedData[trackNum];
    const totalMilestones = trackMilestones.length;
    const completedCount = trackMilestones.filter((m) => m.completed).length;
    const completionPercentage =
      totalMilestones > 0 ? (completedCount / totalMilestones) * 100 : 0;

    const trackX = 50 + trackIndex * dimensions.trackSpacing;

    const category = trackMilestones[0]?.category || "frontend";
    const trackColor = categories[category].trackColor;

    return (
      <g key={`mobile-track-${trackNum}`} className="track-group">
        {/* Vertical track line */}
        <line
          x1={trackX}
          y1="60"
          x2={trackX}
          y2={60 + dimensions.milestoneSpacing * (totalMilestones - 1)}
          strokeWidth="8"
          stroke="#1a1a2e"
          strokeLinecap="round"
        />

        <line
          x1={trackX}
          y1="60"
          x2={trackX}
          y2={60 + dimensions.milestoneSpacing * (totalMilestones - 1)}
          strokeWidth="3"
          stroke="#2d2d44"
          strokeLinecap="round"
        />

        {/* Completed progress line */}
        <line
          x1={trackX}
          y1="60"
          x2={trackX}
          y2={
            60 +
            (dimensions.milestoneSpacing *
              (totalMilestones - 1) *
              completionPercentage) /
              100
          }
          strokeWidth="3"
          stroke={trackColor}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 3px ${trackColor})` }}
        />

        {/* Render each milestone node */}
        {trackMilestones.map((milestone, index) => {
          const yPosition = 60 + index * dimensions.milestoneSpacing;

          return (
            <g
              key={milestone.id}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(milestone.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Milestone circle */}
              <circle
                cx={trackX}
                cy={yPosition}
                r="16"
                className="fill-gray-900"
                stroke={trackColor}
                strokeWidth="3"
                style={{
                  filter: milestone.completed
                    ? `drop-shadow(0 0 4px ${trackColor})`
                    : "none",
                }}
              />

              {/* Inner circle/icon */}
              {milestone.completed ? (
                <circle
                  cx={trackX}
                  cy={yPosition}
                  r="7"
                  fill={trackColor}
                  style={{ filter: `drop-shadow(0 0 3px ${trackColor})` }}
                />
              ) : (
                <circle
                  cx={trackX}
                  cy={yPosition}
                  r="7"
                  className="fill-gray-800"
                  stroke={trackColor}
                  strokeWidth="1"
                />
              )}

              {/* Milestone title */}
              <text
                x={trackX + 25}
                y={yPosition + 5}
                textAnchor="start"
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

  const renderDesktopTrack = (trackNum, trackIndex) => {
    const trackMilestones = processedData[trackNum];
    const totalMilestones = trackMilestones.length;
    const completedCount = trackMilestones.filter((m) => m.completed).length;
    const completionPercentage =
      totalMilestones > 0 ? (completedCount / totalMilestones) * 100 : 0;

    // Calculate vertical position for this track
    const trackY = 150 + trackIndex * dimensions.trackSpacing;

    // Get track color from the milestone category
    const category = trackMilestones[0]?.category || "frontend";
    const trackColor = categories[category].trackColor;

    return (
      <g key={`desktop-track-${trackNum}`}>
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
        {trackMilestones.map((milestone, index) => {
          const xPosition = 50 + (1100 / (totalMilestones - 1 || 1)) * index;

          return (
            <g
              key={milestone.id}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(milestone.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Connection lines (rendered first) */}
              {index < trackMilestones.length - 1 && (
                <line
                  x1={xPosition + 16}
                  y1={trackY}
                  x2={xPosition + (1100 / (totalMilestones - 1 || 1) - 16)}
                  y2={trackY}
                  stroke={trackColor}
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
                stroke={trackColor}
                strokeWidth="3"
                style={{
                  filter: milestone.completed
                    ? `drop-shadow(0 0 4px ${trackColor})`
                    : "none",
                }}
              />

              {/* Inner circle/icon */}
              {milestone.completed ? (
                <circle
                  cx={xPosition}
                  cy={trackY}
                  r="7"
                  fill={trackColor}
                  style={{ filter: `drop-shadow(0 0 3px ${trackColor})` }}
                />
              ) : (
                <circle
                  cx={xPosition}
                  cy={trackY}
                  r="7"
                  className="fill-gray-800"
                  stroke={trackColor}
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

  const renderTooltips = () => {
    const tooltips = [];

    Object.keys(processedData).forEach((trackNum, trackIndex) => {
      const trackMilestones = processedData[trackNum];

      trackMilestones.forEach((milestone, index) => {
        // Only render the tooltip if this milestone is active
        if (activePoint === milestone.id) {
          let tooltipPos;

          if (isMobile) {
            // Mobile positioning (vertical timeline)
            const trackX = 50 + trackIndex * dimensions.trackSpacing;
            const yPosition = 60 + index * dimensions.milestoneSpacing;
            tooltipPos = getTooltipPosition(trackX, yPosition);
          } else {
            // Desktop positioning (horizontal timeline)
            const trackY = 150 + trackIndex * dimensions.trackSpacing;
            const xPosition =
              50 + (1150 / (trackMilestones.length - 1 || 1)) * index;
            tooltipPos = getTooltipPosition(xPosition, trackY);
          }

          tooltips.push(
            <foreignObject
              key={`tooltip-${milestone.id}`}
              x={tooltipPos.x}
              y={tooltipPos.y}
              width={isMobile ? "240" : "250"}
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
                <div className="flex justify-between items-center">
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

  const renderFilters = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-5 relative z-10">
      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-6 py-3 border border-emerald-400 rounded-md transition-colors duration-300  ${
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
    <section
      className="overflow-hidden py-8 flex-grow md:px-40 mx-auto "
      id="roadmap"
      ref={containerRef}
    >
      <div className="w-full relative px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">
            Roadmap
          </h2>
        </div>

        {/* Category Filters */}
        {renderFilters()}

        {/* Roadmap SVG visualization */}
        <div className="relative overflow-x-auto">
          <svg
            className="w-full"
            viewBox={`0 0 ${dimensions.svgWidth} ${dimensions.svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Render all tracks based on device orientation */}
            {Object.keys(processedData).map((trackNum, index) =>
              isMobile
                ? renderMobileTrack(trackNum, index)
                : renderDesktopTrack(trackNum, index)
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
