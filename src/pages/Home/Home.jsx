import HeroSection from "./components/HeroSection";
import RoadmapSection from "./components/RoadmapSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";

const Home = () => {
  return (
    <main className="text-white transition-all duration-500 ease-in-out">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="transition-all duration-500">
          <HeroSection />
        </div>

        <div className="transition-all duration-500">
          <RoadmapSection />
        </div>

        <div className="transition-all duration-500">
          <ProjectsSection />
        </div>

        <div className="transition-all duration-500">
          <AboutSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
