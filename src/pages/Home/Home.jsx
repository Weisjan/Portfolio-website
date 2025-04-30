import HeroSection from "./components/HeroSection";
import RoadmapSection from "./components/RoadmapSection";
import ProjectsSection from "./components/ProjectsSection";

const Home = () => {
  return (
    <main className="text-white">
      {/* Hero Section - Extracted to separate component */}
      <HeroSection />

      {/* Roadmap Section - New component */}
      <RoadmapSection />

      {/* Projects Section */}
      <ProjectsSection />
    </main>
  );
};

export default Home;
