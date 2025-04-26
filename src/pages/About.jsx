const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-emerald-500">About Me</h1>

      <div className="mb-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3">
          <div className="bg-emerald-900 h-64 w-64 mx-auto rounded-full flex items-center justify-center">
            <span className="text-4xl text-emerald-300">Profile</span>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Jan Weis</h2>
          <p className="text-gray-300 mb-4">
            I'm a passionate software developer with 2+ years of experience
            creating engaging digital experiences. I specialize in building
            modern web applications using React, Node.js, and related
            technologies.
          </p>
          <p className="text-gray-300">
            Based in Gdańsk, I enjoy turning complex problems into simple,
            beautiful, and intuitive solutions. When I'm not coding, you can
            find me at rock concerts, playing chess, or experimenting with new
            recipes.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-emerald-500">My Journey</h2>
        <div className="space-y-8">
          <div className="flex">
            <div className="mr-4 text-center">
              <div className="bg-emerald-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="h-full w-0.5 bg-emerald-600 mx-auto my-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400">
                Early Beginnings
              </h3>
              <p className="text-gray-300 mt-2">
                Started my journey in web development by creating simple
                websites and learning the fundamentals of HTML, CSS, and
                JavaScript.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-center">
              <div className="bg-emerald-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="h-full w-0.5 bg-emerald-600 mx-auto my-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400">
                Computer Science Degree
              </h3>
              <p className="text-gray-300 mt-2">
                Pursued a degree in Automatic control, Robotics and Cybernetics
                to deepen my understanding of algorithms, data structures, and
                software engineering principles.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-center">
              <div className="bg-emerald-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400">
                Professional Career
              </h3>
              <p className="text-gray-300 mt-2">
                Gained hands on experience working as a software developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-emerald-500">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Technical Skills
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Frontend: React, JavaScript, Html, Css, Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Backend: Python, C++
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Database: PostgreSQL
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                DevOps: AWS, Git
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Soft Skills
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Project Management & Team Leadership
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Problem Solving & Critical Thinking
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Clear Communication & Documentation
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-emerald-500">•</span>
                Continuous Learning & Adaptability
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
