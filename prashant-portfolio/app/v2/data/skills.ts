export type SkillCategory = "frontend" | "backend" | "cloud" | "database" | "architecture";

export interface SkillData {
  name: string;
  category: SkillCategory;
  proficiency: number; // 1-10
}

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  frontend: "#74C0FC",   // Light Blue
  backend: "#FFB347",    // Orange
  cloud: "#B58FFF",      // Purple
  database: "#9FFFB0",   // Green
  architecture: "#FFD9A6", // Light Gold
};

export const skills: SkillData[] = [
  // Frontend
  { name: "Next.js", category: "frontend", proficiency: 9 },
  { name: "React", category: "frontend", proficiency: 9 },
  { name: "Angular", category: "frontend", proficiency: 8 },
  { name: "TypeScript", category: "frontend", proficiency: 9 },
  { name: "Three.js", category: "frontend", proficiency: 7 },
  { name: "React Three Fiber", category: "frontend", proficiency: 8 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 9 },
  { name: "Framer Motion", category: "frontend", proficiency: 8 },
  { name: "WebRTC", category: "frontend", proficiency: 7 },
  { name: "Chart.js", category: "frontend", proficiency: 8 },

  // Backend
  { name: "Node.js", category: "backend", proficiency: 9 },
  { name: ".NET", category: "backend", proficiency: 8 },
  { name: "Express", category: "backend", proficiency: 9 },
  { name: "FastAPI", category: "backend", proficiency: 7 },
  { name: "Python", category: "backend", proficiency: 7 },
  { name: "REST API", category: "backend", proficiency: 9 },
  { name: "Socket.io", category: "backend", proficiency: 8 },
  { name: "OpenAI API", category: "backend", proficiency: 8 },
  { name: "NLP", category: "backend", proficiency: 6 },

  // Cloud
  { name: "Azure Functions", category: "cloud", proficiency: 8 },
  { name: "Azure DevOps", category: "cloud", proficiency: 8 },
  { name: "Vercel", category: "cloud", proficiency: 9 },
  { name: "AWS S3", category: "cloud", proficiency: 7 },
  { name: "Docker", category: "cloud", proficiency: 8 },
  { name: "Kubernetes", category: "cloud", proficiency: 7 },
  { name: "Terraform", category: "cloud", proficiency: 6 },

  // Database
  { name: "PostgreSQL", category: "database", proficiency: 8 },
  { name: "MongoDB", category: "database", proficiency: 8 },
  { name: "Redis", category: "database", proficiency: 7 },

  // Architecture
  { name: "Zustand", category: "architecture", proficiency: 8 },
];
