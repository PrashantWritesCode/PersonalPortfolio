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
    tagline: "AI-Powered Form Automation Prototype",
    description:
      "AI-driven automation layer integrated into an enterprise Form Builder system. Converts natural language instructions into structured JSON schemas to dynamically generate and refactor multi-stage forms within an existing production architecture.",
    features: [
      "Natural language → structured JSON schema transformation",
      "Strict schema contract validation for safe UI rendering",
      "Multi-stage form refactoring (Stages → Sections → Rows → Fields)",
      "Deterministic transformation pipeline (no direct DB mutation)",
      "Designed for integration into Angular + .NET Form Builder workflow",
      "Built using Azure AI Foundry (GPT-4.1)",
    ],
    stack: [
      "Azure AI Foundry",
      "GPT-4.1",
      "Angular",
      ".NET Core",
      "Schema Validation",
      "Structured JSON",
    ],
    status: "prototype",
  },
  {
    name: "FixMate",
    tagline: "AI-Assisted Production Log Triage",
    description:
      "AI-powered workflow automation prototype designed to reduce manual production log review. Automates incident classification, severity routing, and developer notifications by integrating AI-driven analysis into the existing log monitoring pipeline.",
    features: [
      "Automated extraction of production error logs from database",
      "AI-based incident categorization (auto-fix vs developer-required)",
      "Pattern recognition for recurring errors",
      "Severity-based routing & notification system",
      "Workflow orchestration using n8n",
      "Teams/Slack alert integration",
    ],
    stack: [
      "Devin AI",
      "n8n",
      ".NET Core",
      "Workflow Automation",
      "Log Processing",
      "AI Classification",
    ],
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
          "Migrated AU Police Check from legacy flow into centralized UBC subsystem",
          "NCC API integration with webhook-based async updates",
          "Real-time status tracking & bi-directional cancellation sync",
          "Recruiter-initiated & candidate-uploaded dual workflows",
          "Recruiter-configurable payer logic",
        ],
        stack: [
          ".NET Core",
          "Azure Functions",
          "Azure Queues",
          "REST APIs",
          "Webhooks",
        ],
      },
      {
        name: "Form Builder Platform Core",
        keyFeatures: [
          "Stabilized schema-driven Form → Stages → Sections → 3×N row architecture",
          "Resolved long-standing document-control constraints (single instance, auto-last positioning)",
          "Optimized nested rendering logic & reduced redundant API calls",
          "Fixed Single Document Upload rendering & Induction draft→live sync bugs",
          "Introduced auto-generated Merge Tag system for dropdown, radio & multi-select fields",
        ],
        stack: ["Angular", ".NET Core", "Azure Queues", "Dynamic UI Systems"],
      },
      {
        name: "OBDoc & ATS Merge Tag Builder",
        keyFeatures: [
          "Built dynamic Merge Tag Builder UI for ATS-backed document automation",
          "Auto-generated option-level tags with safe-edit override logic",
          "Enabled recruiter-driven contract generation without developer dependency",
          "Implemented reusable API layer to fetch ATS fields (Vincere, Bullhorn)",
        ],
        stack: ["Angular", ".NET Core", "Azure Functions", "REST APIs"],
      },
      {
        name: "Stage PDF & Multi-ATS Routing System",
        keyFeatures: [
          "Designed configurable Stage / Payroll / Super PDF routing layer",
          "Extended integration across 9 Front-Office & 3 Back-Office ATS platforms",
          "Supported hybrid ATS routing via config-driven adapters",
          "Implemented Azure Function-based orchestration for async document delivery",
          "Synced lifecycle statuses (Invited → Completed → Rejected) into Vincere dashboards",
        ],
        stack: [
          "Azure Functions",
          "Azure Queues",
          ".NET Core",
          "Integration Architecture",
        ],
      },
    ],
    platformHardening: [
      "Strengthened async logging & webhook debugging for production reliability",
      "Integrated Wootric (NPS) feedback loops",
      "Built internal Agentic AI prototypes (FormPilot & FixMate) using Azure AI Foundry & workflow orchestration to automate form refactoring and production log triage",
    ],
  },
  amnex: {
    company: "Amnex",
    role: "Associate Full-Stack Developer",
    period: "Aug 2023 – Dec 2024",
    sectionTitle: "Smart Infrastructure & Government Platforms",
    productionSystems: [
      {
        name: "Smart Metering System (HES & MDM)",
        domain: "Utility Infrastructure / Energy Data",
        keyFeatures: [
          "Built backend ingestion logic for smart meter readings",
          "Developed real-time dashboards & heatmap visualizations for consumption trends",
          "Implemented N-level anomaly alerting for usage spikes & device failures",
          "Contributed across .NET Core backend & Angular analytics UI",
        ],
        stack: [".NET Core", "Angular", "SQL", "Analytics Dashboards"],
      },
      {
        name: "Maharashtra Golden Record Portal",
        domain: "Government Citizen Data Platform",
        scale: "~14–15 Crore Citizen Records",
        keyFeatures: [
          "Built multilingual dynamic forms (Hindi, Marathi, English)",
          "Implemented Redis caching for performance optimization",
          "Developed PDF export pipelines for consolidated citizen profiles",
          "Contributed to backend APIs and high-traffic UI workflows",
        ],
        stack: [".NET Core", "Angular", "Redis", "PostgreSQL"],
      },
    ],
    earlyContributions: [
      {
        name: "Goa Smart Parking System",
        domain: "IoT / Smart City Infrastructure",
        keyFeatures: [
          "Built Angular + .NET Core prototype dashboard",
          "Processed parking sensor data to generate occupancy analytics",
          "Aggregated data by time-of-day and vehicle type (2W / 3W / 4W)",
          "Designed reporting views for utilization trends",
        ],
        stack: ["Angular", ".NET Core", "REST APIs", "SQL"],
      },
      {
        name: "IION BREDA – Smart City Lighting Control",
        domain: "Smart Infrastructure / City Operations",
        keyFeatures: [
          "Contributed to vendor management module for street-light maintenance",
          "Implemented vendor assignment and workflow tracking logic",
          "Integrated module into centralized Angular dashboard system",
        ],
        stack: ["Angular", ".NET Core", "REST APIs"],
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
