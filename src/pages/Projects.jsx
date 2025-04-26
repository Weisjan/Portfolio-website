const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "test",
      image: "ecommerce",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "#",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "test",
      image: "portfolio",
      tech: ["Vue.js", "Tailwind CSS", "Netlify"],
      link: "#",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-emerald-500">My Projects</h1>

      <div className="mb-8">
        <p className="text-gray-300 text-lg">
          Below are some of the projects I've worked on. Each demonstrates
          different skills and technologies in my developer toolkit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
          >
            <div className="bg-emerald-900 h-48 flex items-center justify-center">
              <span className="text-4xl text-emerald-300">{project.image}</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-emerald-400">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-emerald-300 mb-2">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-900 text-emerald-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.link}
                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
