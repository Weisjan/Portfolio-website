const projectsData = [
  {
    id: 1,
    title: "Address Browser",
    description:
      "full-stack web application for browsing hierarchical Polish address data",
    tech: ["PostgreSQL", "Fastapi", "React", "Tailwind CSS", "Node.js"],
    demo: "https://example.com/demo",
    source: "https://github.com/Weisjan/Address-browser",
    detailedDescription:
      "Address Browser is a full-stack web application for querying hierarchical address data from Polish public services (GUGiK). The application features a Python-based backend (FastAPI), a PostgreSQL database for relational data storage, and a modern React frontend for an intuitive user experience.",
    images: [
      "/projects_images/addres_search_1.png",
      "/projects_images/addres_search_2.png",
      "/projects_images/addres_search_3.png",
    ],
    features: [
      "Integration with GUGiK SOAP API for hierarchical address data retrieval",
      "Relational database schema using PostgreSQL",
      "FastAPI backend exposing a REST API for querying address data",
      "React-based frontend with live search and filter functionality",
      "Modular component architecture with Vite-based development workflow",
    ],
  },
];

// Tech badge color mapping helper function
export const getTechBadgeColor = (techName) => {
  const techColors = {
    React: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "Node.js": "bg-green-500/20 text-green-300 border-green-500/40",
    MongoDB: "bg-green-600/20 text-green-300 border-green-600/40",
    Stripe: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    "Tailwind CSS": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    "Framer Motion": "bg-pink-500/20 text-pink-300 border-pink-500/40",
    TypeScript: "bg-blue-600/20 text-blue-300 border-blue-600/40",
    NextJS: "bg-black/40 text-gray-300 border-gray-500/40",
    default: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    PostgreSQL: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    Fastapi: "bg-blue-600/20 text-blue-400 border-blue-600/40",
  };

  return techColors[techName] || techColors.default;
};

export default projectsData;
