import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import projectsData from "../data/projectsData";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ImageModal from "./ImageModal";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);

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

  return (
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
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={openProjectDetails}
              ref={(el) => (projectRefs.current[index] = { current: el })}
            />
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
      <ProjectDetailsModal
        project={selectedProject}
        onClose={closeProjectDetails}
        onImageClick={openFullImage}
      />

      {/* Full Image Modal */}
      <ImageModal imageSrc={selectedImage} onClose={closeFullImage} />
    </section>
  );
};

export default ProjectsSection;
