// Products — Self-built systems
export const products = [
  {
    name: "Writer Analytics",
    tagline: "Privacy-first analytics for authors",
    description:
      "Chrome extension providing chapter-level engagement analytics for Wattpad and Webnovel authors. Extracts reads, votes, comments with time-series tracking.",
    features: [
      "Chapter-level reads, votes, comments",
      "Engagement rate analysis",
      "Time-series tracking",
      "Client-side data processing",
    ],
    stack: ["Chrome Extension API", "JavaScript", "Local Storage"],
    status: "live",
    users: "~25 active users",
    link: "https://chrome.google.com/webstore",
  },
  {
    name: "FormPilot",
    tagline: "AI-powered form automation",
    description:
      "RAG-powered AI engine for intelligent form filling using local LLMs. Chrome extension with Spring Boot backend for context-aware field extraction.",
    features: [
      "Chrome extension + Spring Boot backend",
      "LangChain4j + Ollama integration",
      "Local LLM processing",
      "Context-aware field extraction",
    ],
    stack: ["Chrome Extension", "Spring Boot", "LangChain4j", "Ollama"],
    status: "development",
    privacy: "Fully offline, privacy-first design",
  },
  {
    name: "FixMate",
    tagline: "AI incident assistant",
    description:
      "AI-driven workflow automation prototype for incident management. Log ingestion, AI-generated debugging summaries, and automated alerting.",
    features: [
      "Log ingestion & analysis",
      "AI-generated debugging summaries",
      "Slack/email alert automation",
      "LLM integration for issue triage",
    ],
    stack: ["LLM Integration", "Automation Workflows"],
    status: "prototype",
  },
];

// Professional work — Organized by company
export const professionalWork = {
  radixweb: {
    company: "Radixweb",
    role: "Software Engineer",
    period: "Dec 2024 – Present",
    platformTitle: "Onboarded — Smart Recruitment & Background Check Platform",
    platformDescription:
      "Multi-tenant recruitment platform powering background checks, document workflows, ATS integrations, and asynchronous orchestration across enterprise clients.",
    modules: [
      {
        name: "Universal Background Check (UBC) Engine",
        keyFeatures: [
          "Real-time status tracking",
          "Bi-directional cancellation sync",
          "Dual workflows (police vs other screenings)",
          "Configurable payer logic",
          "NCC API integration",
        ],
        stack: [".NET Core", "Angular", "Azure Functions", "REST APIs"],
      },
      {
        name: "Form Builder Platform Core",
        keyFeatures: [
          "Merge tag system for dynamic document generation",
          "OBDoc dynamic UI builder",
          "ATS field mappings (Bullhorn, Vincere)",
          "Async form sync via Azure Queues",
          "Wootric NPS integration",
        ],
        stack: ["Angular", ".NET Core", "Azure Queues"],
      },
      {
        name: "Stage PDF Routing System",
        keyFeatures: [
          "Configurable document routing engine",
          "9 front-office + 3 back-office ATS integrations",
          "Automated Stage & Payroll Pack generation",
          "Azure messaging orchestration",
        ],
        stack: ["Azure Functions", "Azure Queues", ".NET Core"],
      },
      {
        name: "Reliability & Platform Hardening",
        keyFeatures: [
          "Fixed legacy Form Builder bugs",
          "Document locking rules enforcement",
          "Async monitoring pipelines",
          "Improved feedback loops",
        ],
        stack: [".NET Core", "Azure"],
      },
    ],
  },
  amnex: {
    company: "Amnex",
    role: "Associate Full-Stack Developer",
    period: "Aug 2023 – Dec 2024",
    sectionTitle: "Utility & Government Scale Platforms",
    projects: [
      {
        name: "Smart Metering System — HES",
        description:
          "Ingestion of millions of smart meter readings with real-time analytics and anomaly detection.",
        keyFeatures: [
          "Ingestion of millions of smart meter readings",
          "Real-time dashboards",
          "Heatmap visualization",
          "N-level anomaly detection",
        ],
        stack: [".NET", "Angular", "PostgreSQL", "Redis"],
        scale: "Millions of readings",
      },
      {
        name: "Meter Data Management (MDM)",
        description:
          "Utility-scale analytics system with data aggregation and alert configuration.",
        keyFeatures: [
          "Utility-scale analytics system",
          "Data aggregation pipelines",
          "Alert configuration engine",
          "Performance optimization",
        ],
        stack: [".NET", "PostgreSQL"],
        scale: "Enterprise utility scale",
      },
      {
        name: "Maharashtra Golden Record Citizen Portal",
        description:
          "Unified citizen data platform with multilingual support and high-scale workflows.",
        keyFeatures: [
          "Unified citizen data (~14–15 crore users)",
          "Multilingual dynamic forms (Hindi, Marathi, English)",
          "Redis caching optimization",
          "PDF export workflows",
        ],
        stack: [".NET", "Angular", "PostgreSQL", "Redis"],
        scale: "~14–15 crore users",
      },
    ],
  },
};

// Skills organized by architectural layer
export const skills = {
  frontend: ["Angular", "React", "TypeScript", "Tailwind"],
  backend: [".NET Core", "C#", "Spring Boot", "Node.js"],
  cloudDevOps: ["Azure Functions", "Azure Queues", "Redis", "DevOps Pipelines"],
  databases: ["PostgreSQL", "MS SQL"],
  aiAutomation: ["LangChain", "Ollama", "RAG", "OpenAI API"],
  architecture: [
    "Multi-tenant systems",
    "Workflow engines",
    "ATS integrations",
    "Event-driven architecture",
    "Async messaging",
  ],
};

// Journey timeline
export const journey = [
  {
    year: "Aug 2023",
    title: "Started at Amnex",
    description:
      "Joined as Associate Full-Stack Developer, building utility-scale analytics and government portal systems.",
  },
  {
    year: "2024",
    title: "Built Smart Metering & Citizen Portal",
    description:
      "Delivered high-scale systems processing millions of records with real-time dashboards and multilingual support.",
  },
  {
    year: "Dec 2024",
    title: "Joined Radixweb",
    description:
      "Software Engineer building unified background check platform with Azure-based workflow automation.",
  },
  {
    year: "2025",
    title: "Launched Writer Analytics & FormPilot",
    description:
      "Published Chrome extensions serving real users with privacy-first AI-powered automation.",
  },
];

export const philosophy = [
  {
    tag: "Dharma",
    title: "Surround yourself with beauty.",
    subtitle: "Design, code, and life in harmony",
    excerpt:
      "I believe craftsmanship begins with aesthetic clarity — beautiful systems are easier to reason about and kinder to maintain.",
    detail:
      "In practice this means: clear code, intentional UX, and a focus on the small details that make a product feel human.",
  },
  {
    tag: "Discipline",
    title: "The only easy day was yesterday.",
    subtitle: "Growth through steady challenge",
    excerpt:
      "Progress is compounding. Consistent work — even small steps — builds real capability.",
    detail:
      "I focus on routines: daily learning, incremental refactors, and shipping with measurable outcomes.",
  },
  {
    tag: "Balance",
    title: "Technology is Dharma in motion.",
    subtitle: "Engineering with empathy",
    excerpt:
      "Tech should be an extension of human care — performant, accessible, and respectful of people's time.",
    detail:
      "This guides how I choose architectures, design onboarding flows, and ensure accessibility.",
  },
];
