import React from "react";
import { getTechBadgeColor } from "../data/projectsData";

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <article
      className="project-card bg-gray-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2 relative group cursor-pointer"
      style={{ animationDelay: `${index * 150 + 400}ms` }}
      onClick={() => onClick(project)}
    >
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

      {/* Featured image */}
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
            onClick(project);
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
  );
};

export default ProjectCard;
