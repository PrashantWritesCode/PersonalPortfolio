export type TimelineMilestone = {
  id: string;
  date: string; // ISO date
  title: string;
  description: string;
  type: "education" | "work" | "certification" | "achievement";
  isActive: boolean; // Active milestones get particle trails
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: "internship-1",
    date: "2020-06-01",
    title: "First Internship",
    description: "Frontend development internship - React & TypeScript",
    type: "work",
    isActive: true,
  },
  {
    id: "bachelor-degree",
    date: "2021-05-15",
    title: "Bachelor's Degree",
    description: "Computer Science - Graduated with Honors",
    type: "education",
    isActive: true,
  },
  {
    id: "fullstack-role",
    date: "2021-09-01",
    title: "Full-Stack Engineer",
    description: "Joined tech startup - React, Node.js, PostgreSQL",
    type: "work",
    isActive: true,
  },
  {
    id: "azure-cert",
    date: "2022-03-20",
    title: "Azure Certification",
    description: "Microsoft Certified: Azure Developer Associate",
    type: "certification",
    isActive: true,
  },
  {
    id: "hackathon-win",
    date: "2022-11-10",
    title: "Hackathon Winner",
    description: "1st place - AI-powered portfolio analyzer",
    type: "achievement",
    isActive: true,
  },
  {
    id: "senior-promotion",
    date: "2023-06-01",
    title: "Senior Engineer",
    description: "Promoted to Senior Full-Stack Engineer",
    type: "work",
    isActive: true,
  },
  {
    id: "open-source",
    date: "2024-02-15",
    title: "Open Source Contributor",
    description: "Core contributor to React Three Fiber ecosystem",
    type: "achievement",
    isActive: true,
  },
  {
    id: "current",
    date: "2025-01-01",
    title: "Building the Future",
    description: "Crafting immersive web experiences",
    type: "work",
    isActive: true,
  },
];
