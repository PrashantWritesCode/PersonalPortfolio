export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  importance: number; // 1-10 (affects planet size)
  techStack: string[]; // Array of skill names
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  highlights?: string[]; // Key features or achievements
}

export const projects: ProjectData[] = [
  {
    id: "sanatan-gpt",
    name: "Sanatan GPT",
    tagline: "AI-powered spiritual knowledge assistant",
    description: "An intelligent chatbot that provides insights from ancient Vedic texts and scriptures.",
    importance: 9,
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Vercel"],
    liveUrl: "https://sanatan-gpt.vercel.app",
    githubUrl: "https://github.com/PrashantWritesCode/sanatan-gpt",
    featured: true,
    highlights: [
      "AI-powered responses from Vedic texts",
      "Multi-language support",
      "Real-time streaming responses"
    ],
  },
  {
    id: "mossip-integration",
    name: "MOSSIP Integration",
    tagline: "Enterprise API integration platform",
    description: "A robust middleware solution for integrating legacy systems with modern cloud services.",
    importance: 8,
    techStack: ["Node.js", "Express", "Azure Functions", "Redis", "PostgreSQL"],
    liveUrl: "https://mossip-demo.azurewebsites.net",
    githubUrl: "https://github.com/PrashantWritesCode/mossip-integration",
    highlights: [
      "Enterprise-grade API integration",
      "Real-time data synchronization",
      "99.9% uptime with Azure Functions"
    ],
  },
  {
    id: "riverside-mvp",
    name: "Riverside MVP",
    tagline: "Real-time collaboration workspace",
    description: "A minimum viable product for team collaboration with video conferencing and shared tools.",
    importance: 7,
    techStack: ["React", "WebRTC", "Socket.io", "MongoDB", "AWS S3"],
    liveUrl: "https://riverside-mvp.netlify.app",
    githubUrl: "https://github.com/PrashantWritesCode/riverside-mvp",
    highlights: [
      "Real-time video conferencing with WebRTC",
      "Collaborative whiteboard",
      "Cloud file storage with AWS S3"
    ],
  },
  {
    id: "portfolio-galaxy",
    name: "Portfolio Galaxy",
    tagline: "3D interactive portfolio experience",
    description: "An immersive 3D portfolio built with React Three Fiber featuring orbital navigation.",
    importance: 10,
    techStack: ["Next.js", "Three.js", "React Three Fiber", "Zustand", "Framer Motion"],
    liveUrl: "https://prashant-portfolio.vercel.app/v2",
    githubUrl: "https://github.com/PrashantWritesCode/PersonalPortfolio",
    featured: true,
    highlights: [
      "3D solar system navigation",
      "Dynamic planet generation from data",
      "Smooth camera animations with emotion layer"
    ],
  },
  {
    id: "azure-devops-pipeline",
    name: "Azure DevOps Pipeline",
    tagline: "Automated CI/CD infrastructure",
    description: "Enterprise-grade continuous integration and deployment pipeline on Azure.",
    importance: 6,
    techStack: ["Azure DevOps", "Docker", "Kubernetes", "Terraform", ".NET"],
    highlights: [
      "Automated CI/CD with Azure DevOps",
      "Kubernetes orchestration",
      "Infrastructure as Code with Terraform"
    ],
  },
  {
    id: "ecommerce-dashboard",
    name: "E-Commerce Dashboard",
    tagline: "Analytics and insights platform",
    description: "Real-time analytics dashboard for e-commerce businesses with predictive insights.",
    importance: 7,
    techStack: ["Angular", "TypeScript", "Chart.js", "REST API", "PostgreSQL"],
    highlights: [
      "Real-time sales analytics",
      "Predictive insights with ML",
      "Custom chart visualizations"
    ],
  },
  {
    id: "chatbot-framework",
    name: "Chatbot Framework",
    tagline: "Multi-platform bot engine",
    description: "Extensible framework for building conversational AI across multiple platforms.",
    importance: 8,
    techStack: ["Python", "FastAPI", "NLP", "Redis", "Docker"],
    highlights: [
      "Multi-platform bot deployment",
      "Natural language processing",
      "Extensible plugin architecture"
    ],
  },
];
