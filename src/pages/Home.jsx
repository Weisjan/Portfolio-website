import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6">
          <Typewriter
            options={{
              strings: [],
              autoStart: true,
              loop: false,
              html: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "Software <span class='text-emerald-400'>Developer</span>"
                )
                .pauseFor(1500)
                .deleteAll()
                .typeString(
                  "Hello <span class='text-emerald-400'>World!</span>"
                )
                .pauseFor(1500)
                .deleteAll()
                .typeString(
                  "Software <span class='text-emerald-400'>Developer</span>"
                )
                .start();
            }}
          />
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          A creative developer's space to showcase projects and skills
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-900 hover:text-white transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-500">
          Featured Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Frontend Development",
              description: "React, Vue, Tailwind CSS",
            },
            {
              title: "Backend Development",
              description: "Node.js, Express, Django",
            },
            {
              title: "UI/UX Design",
              description: "Figma, Adobe XD, User Research",
            },
            {
              title: "Cloud Services",
              description: "AWS, Azure, Google Cloud",
            },
            {
              title: "Database Management",
              description: "MongoDB, PostgreSQL, Firebase",
            },
            { title: "DevOps", description: "Docker, CI/CD, Kubernetes" },
          ].map((skill, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">
                {skill.title}
              </h3>
              <p className="text-gray-300">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-500">
          Latest Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "E-commerce Platform",
              description: "test",
              tech: "test",
            },
            {
              title: "Portfolio Website",
              description: "test",
              tech: "test",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="bg-emerald-900 h-48 flex items-center justify-center">
                <span className="text-4xl text-emerald-300">
                  Project {index + 1}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-emerald-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-sm text-emerald-300 mb-4">
                  Tech: {project.tech}
                </p>
                <Link
                  to={`/projects`}
                  className="text-emerald-500 hover:text-emerald-400 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="text-emerald-500 hover:text-emerald-400 font-medium"
          >
            View All Projects →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
