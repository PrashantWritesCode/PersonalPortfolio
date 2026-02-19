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
    id: "writer-analytics",
    title: "Writer Analytics",
    tagline: "A privacy-first analytics Chrome extension for Wattpad authors.",
    description:
      "Writer Analytics is a Chrome extension built for Wattpad authors to understand how readers engage with their stories. It provides story-level and chapter-level insights directly inside the writing workflow, without using platform APIs or storing story content. The product is publicly published and actively used by writers on a daily basis.\n\nImpact:\n- 19+ organic users\n- 14+ weekly active users\n- Daily active usage\n- Publicly published on the Chrome Web Store",
    stack: [
      "TypeScript",
      "Chrome Extension (Manifest V3)",
      "Content Scripts",
      "DOM Parsing",
      "Browser Storage",
    ],
    liveUrl:
      "https://chromewebstore.google.com/detail/jfpnlkcnijonciekpphgdipdmipefhjo",
  },
];
