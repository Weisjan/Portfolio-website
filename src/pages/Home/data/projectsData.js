const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A fully functional online store with payment processing and inventory management",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "https://example.com/demo",
    source: "https://github.com/Weisjan/Address-browser",
    detailedDescription:
      "This e-commerce platform features real-time inventory tracking, secure payment processing with Stripe integration, and a responsive admin dashboard. It includes features like user authentication, shopping cart functionality, order history, and product reviews.",
    images: [
      "/projects_images/addres_search_1.png",
      "/projects_images/addres_search_2.png",
      "/projects_images/addres_search_3.png",
    ],
    features: [
      "User authentication & profiles",
      "Product search & filtering",
      "Shopping cart & checkout",
      "Payment processing",
      "Order tracking & history",
      "Admin dashboard",
    ],
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing skills and projects with modern design",
    tech: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    demo: "https://example.com/demo",
    source: "https://github.com/Weisjan/Address-browser",
    detailedDescription:
      "This portfolio website features smooth animations, responsive design, and a modern user interface. It includes sections for showcasing projects, skills, and contact information. The site is optimized for performance and accessibility.",
    images: ["/home_images/2.jpg", "/home_images/3.jpg", "/home_images/4.jpg"],
    features: [
      "Responsive design",
      "Custom animations",
      "Dark/light mode",
      "Project showcase",
      "Skills section",
      "Contact form",
    ],
  },
  {
    id: 3,
    title: "Portfolio test",
    description:
      "A personal portfolio showcasing skills and projects with modern design",
    tech: ["React", "Tailwind CSS", "Framer Motion", "NextJS", "MongoDB"],
    demo: "https://example.com/demo",
    source: "https://github.com/Weisjan/Address-browser",
    detailedDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    images: ["/home_images/2.jpg", "/home_images/3.jpg", "/home_images/4.jpg"],
    features: [
      "Responsive design",
      "Custom animations",
      "Dark/light mode",
      "Project showcase",
      "Skills section",
      "Contact form",
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
  };

  return techColors[techName] || techColors.default;
};

export default projectsData;
