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
      className="mb-15 px-4 md:px-12 relative overflow-hidden fade-in-section "
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
