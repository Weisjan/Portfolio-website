import React from "react";
import { getTechBadgeColor } from "../data/projectsData";

const ProjectDetailsModal = ({ project, onClose, onImageClick }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-emerald-500/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner elements */}
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
            {project.title}
          </h3>
          <button
            onClick={onClose}
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
          {/* Image gallery */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden border border-emerald-800/30 rounded-lg group cursor-pointer"
                onClick={(e) => onImageClick(img, e)}
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-48 object-cover transform transition-all duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <button
                    className="bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    onClick={(e) => onImageClick(img, e)}
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
            <p className="text-gray-300">{project.detailedDescription}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-mono text-emerald-400 mb-2">
              &lt;Features/&gt;
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
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
              {project.tech.map((tech, idx) => (
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
              href={project.demo}
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
              href={project.source}
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
  );
};

export default ProjectDetailsModal;
