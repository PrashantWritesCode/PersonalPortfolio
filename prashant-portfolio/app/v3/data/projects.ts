export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "sanatan-gpt",
    title: "Sanatan GPT",
    tagline: "AI-powered spiritual knowledge assistant",
    description:
      "An intelligent chatbot that provides insights from ancient Vedic texts and scriptures. Built with OpenAI's GPT models and fine-tuned on religious texts to answer spiritual queries with contextual accuracy.",
    stack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Vercel"],
    liveUrl: "https://sanatan-gpt.vercel.app",
    githubUrl: "https://github.com/PrashantWritesCode/sanatan-gpt",
  },
  {
    id: "mossip-integration",
    title: "MOSSIP Integration",
    tagline: "Enterprise API integration platform",
    description:
      "A robust middleware solution for integrating legacy systems with modern cloud services. Features real-time data synchronization, error handling, and comprehensive monitoring dashboards.",
    stack: ["Node.js", "Express", "Azure Functions", "Redis", "PostgreSQL"],
    liveUrl: "https://mossip-demo.azurewebsites.net",
    githubUrl: "https://github.com/PrashantWritesCode/mossip-integration",
  },
  {
    id: "riverside-mvp",
    title: "Riverside MVP",
    tagline: "Real-time collaboration workspace",
    description:
      "A minimum viable product for team collaboration with video conferencing, shared whiteboards, and document editing. Built for startups looking to streamline remote work workflows.",
    stack: ["React", "WebRTC", "Socket.io", "MongoDB", "AWS S3"],
    liveUrl: "https://riverside-mvp.netlify.app",
    githubUrl: "https://github.com/PrashantWritesCode/riverside-mvp",
  },
  {
    id: "portfolio-galaxy",
    title: "Portfolio Galaxy",
    tagline: "3D interactive portfolio experience",
    description:
      "An immersive 3D portfolio built with React Three Fiber featuring orbital navigation, achievement constellations, and guided tours through project planets. A unique way to showcase work with narrative storytelling.",
    stack: ["Next.js", "React Three Fiber", "Zustand", "Framer Motion", "Howler.js"],
    liveUrl: "https://prashant-portfolio.vercel.app/v2",
    githubUrl: "https://github.com/PrashantWritesCode/PersonalPortfolio",
  },
];
