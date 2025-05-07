import { useState, useEffect } from "react";
import {
  Terminal,
  Cpu,
  Database,
  Code,
  Network,
  Globe,
  User,
  BookOpen,
  Award,
  GitBranch,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const CyberpunkAbout = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [glitchText, setGlitchText] = useState("");
  const [typedBio, setTypedBio] = useState("");
  const [typeIndex, setTypeIndex] = useState(0);

  const fullBio =
    "I'm a passionate software developer with 2+ years of experience creating engaging digital experiences. I specialize in building modern web applications using React, Node.js, and related technologies. Based in Gdańsk, I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you can find me at rock concerts, playing chess, or experimenting with new recipes.";

  // Glitch effect
  useEffect(() => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}:"<>?|';
    const glitchInterval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGlitchText(result);
    }, 100);

    return () => clearInterval(glitchInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (typeIndex < fullBio.length) {
      const timeout = setTimeout(() => {
        setTypedBio((prev) => prev + fullBio.charAt(typeIndex));
        setTypeIndex(typeIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [typeIndex, fullBio]);

  // Add styles to body and html to prevent overflow
  useEffect(() => {
    // Save original styles
    const originalBodyStyle = document.body.style.cssText;
    const originalHtmlStyle = document.documentElement.style.cssText;

    // Set styles to prevent overflow
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#000";
    document.body.style.minHeight = "100%";
    document.documentElement.style.height = "100%";

    // Cleanup function to restore original styles
    return () => {
      document.body.style.cssText = originalBodyStyle;
      document.documentElement.style.cssText = originalHtmlStyle;
    };
  }, []);

  // Journey timeline data
  const journeyData = [
    {
      title: "Early Beginnings",
      description:
        "Started my journey in web development by creating simple websites and learning the fundamentals of HTML, CSS, and JavaScript.",
      icon: <Code className="text-emerald-400" />,
    },
    {
      title: "Computer Science Degree",
      description:
        "Pursued a degree in Automatic control, Robotics and Cybernetics to deepen my understanding of algorithms, data structures, and software engineering principles.",
      icon: <BookOpen className="text-emerald-400" />,
    },
    {
      title: "Professional Career",
      description:
        "Gained hands on experience working as a software developer.",
      icon: <Award className="text-emerald-400" />,
    },
  ];

  // Skills data
  const technicalSkills = [
    {
      name: "Frontend",
      details: "React, JavaScript, Html, Css, Tailwind CSS",
      icon: <Globe />,
    },
    { name: "Backend", details: "Python, C++", icon: <Terminal /> },
    { name: "Database", details: "PostgreSQL", icon: <Database /> },
    { name: "DevOps", details: "AWS, Git", icon: <GitBranch /> },
  ];

  const softSkills = [
    { name: "Project Management & Team Leadership", icon: <User /> },
    { name: "Problem Solving & Critical Thinking", icon: <Cpu /> },
    { name: "Clear Communication & Documentation", icon: <Network /> },
    { name: "Continuous Learning & Adaptability", icon: <BookOpen /> },
  ];

  // Custom animation classes
  const animationClasses = {
    pulseBorder: "animate-[pulse-border_2s_infinite]",
    pulseLine: "animate-[pulse-line_3s_infinite]",
    skillBar: "animate-[skill-bar_1s_forwards]",
    fadeIn: "animate-[fadeIn_0.5s_forwards]",
    blink: "animate-[blink_1s_infinite]",
  };

  return (
    <div className="max-w-4xl mx-auto bg-black bg-opacity-80 text-emerald-300 p-6 rounded-lg border border-emerald-500 shadow-lg shadow-emerald-500/30 flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold glitch-text relative">
          <span className="text-emerald-500">ABOUT</span>
          <span className="absolute top-0 left-0 text-red-500 opacity-50 ml-1">
            {glitchText}
          </span>
        </h1>
        <div className="flex gap-2">
          {["profile", "journey", "skills"].map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded uppercase text-sm font-mono transition-all duration-300 ${
                activeSection === section
                  ? "bg-emerald-600 text-black"
                  : "bg-black border border-emerald-500 text-emerald-500 hover:bg-emerald-900"
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className={`mb-12 ${animationClasses.fadeIn}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-64 w-64 border-4 border-emerald-500 rounded-full overflow-hidden flex items-center justify-center bg-emerald-900 relative">
                  <span className="text-4xl text-emerald-300 font-mono">
                    JW
                  </span>
                  <div
                    className={`absolute inset-0 border-4 border-transparent rounded-full ${animationClasses.pulseBorder}`}
                  ></div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-black px-2 py-1 border border-emerald-500 text-emerald-500 font-mono text-xs">
                  SCAN COMPLETE
                </div>
              </div>
              <h2 className="text-2xl font-bold text-emerald-400 font-mono mt-2">
                JAN WEIS
              </h2>
              <div className="text-xs font-mono text-emerald-600 flex items-center">
                <span className="inline-block h-2 w-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                DEVELOPER STATUS: ONLINE
              </div>
            </div>

            <div className="col-span-2 font-mono">
              <div className="border border-emerald-700 rounded p-4 bg-black bg-opacity-70">
                <div className="flex items-center mb-4">
                  <Terminal className="text-emerald-500 mr-2" size={18} />
                  <span className="text-emerald-500"> user.profile</span>
                </div>
                <div className="h-40 overflow-auto">
                  <p className="text-emerald-300 text-sm leading-relaxed">
                    {typedBio}
                    <span className={animationClasses.blink}>_</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-emerald-500">
                  <div>LOCATION: GDAŃSK</div>
                  <div>STATUS: FUNCTIONAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journey Section */}
      {activeSection === "journey" && (
        <section className={`mb-12 ${animationClasses.fadeIn}`}>
          <h2 className="text-3xl font-bold mb-6 text-emerald-500 font-mono flex items-center">
            <Code className="mr-2" /> SYSTEM.TIMELINE
          </h2>
          <div className="space-y-6">
            {journeyData.map((item, index) => (
              <div key={index} className="flex group">
                <div className="mr-4 text-center relative">
                  <div className="bg-black border-2 border-emerald-500 h-12 w-12 rounded-full flex items-center justify-center text-emerald-500 font-bold font-mono group-hover:bg-emerald-900 transition-all duration-300">
                    {item.icon}
                  </div>
                  {index < journeyData.length - 1 && (
                    <div className="h-full w-0.5 bg-emerald-700 mx-auto my-2 relative">
                      <div
                        className={`absolute inset-0 w-full bg-emerald-400 ${animationClasses.pulseLine}`}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="bg-black bg-opacity-50 border border-emerald-700 p-4 rounded-lg flex-1 hover:border-emerald-400 transition-all duration-300 group-hover:translate-x-1">
                  <h3 className="text-xl font-bold text-emerald-400 font-mono">
                    {item.title}
                  </h3>
                  <p className="text-emerald-300 mt-2 font-mono text-sm">
                    {item.description}
                  </p>
                  <div className="mt-2 text-xs text-emerald-600 font-mono flex justify-end">
                    <span className="animate-pulse">[DATA VERIFIED]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <section className={`mb-12 ${animationClasses.fadeIn}`}>
          <h2 className="text-3xl font-bold mb-6 text-emerald-500 font-mono flex items-center">
            <Database className="mr-2" /> ABILITY.MATRIX
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-emerald-700 rounded-lg p-4 bg-black bg-opacity-60 hover:border-emerald-500 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-emerald-400 font-mono flex items-center">
                <Code className="mr-2" />
                TECHNICAL SKILLS
              </h3>
              <ul className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <li key={index} className="group">
                    <div className="flex items-center mb-1">
                      <span className="text-emerald-500 mr-2">
                        {skill.icon}
                      </span>
                      <span className="font-mono text-emerald-300">
                        {skill.name}
                      </span>
                    </div>
                    <div className="h-2 bg-emerald-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-emerald-500 rounded-full group-hover:${animationClasses.skillBar}`}
                        style={{ width: `${70 + Math.random() * 25}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-emerald-600 font-mono">
                      {skill.details}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-emerald-700 rounded-lg p-4 bg-black bg-opacity-60 hover:border-emerald-500 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-emerald-400 font-mono flex items-center">
                <User className="mr-2" />
                SOFT SKILLS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="border border-emerald-900 p-3 rounded hover:bg-emerald-900 hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <div className="text-emerald-500 mb-2">{skill.icon}</div>
                    <div className="font-mono text-xs text-emerald-300">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="mt-auto text-xs text-emerald-600 font-mono border-t border-emerald-900 pt-4 flex flex-col md:flex-row justify-between">
        <div>SYSTEM V.2.0.25</div>
        <div className={`${animationClasses.pulseBorder} my-2 md:my-0`}>
          CONNECTION SECURE
        </div>
        <div>
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Social links */}
      <div className="w-full flex justify-center gap-6 mt-4 py-4 border-t border-emerald-900">
        <a
          href="#"
          className="text-emerald-500 hover:text-emerald-300 transition-colors"
        >
          <Github size={24} />
        </a>
        <a
          href="#"
          className="text-emerald-500 hover:text-emerald-300 transition-colors"
        >
          <Twitter size={24} />
        </a>
        <a
          href="#"
          className="text-emerald-500 hover:text-emerald-300 transition-colors"
        >
          <Linkedin size={24} />
        </a>
      </div>

      <div className="text-center text-xs text-emerald-700 mt-2">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </div>
  );
};

export default CyberpunkAbout;
