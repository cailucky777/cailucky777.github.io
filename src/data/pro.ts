// Single source of truth for the /pro page.
// Edit dates / titles here; everything renders from this file.

export type NowItem = {
  date: string;
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
  link?: string;
  status?: "shipping" | "research" | "released";
};

export type ExperienceItem = {
  role: string;
  org: string;
  location?: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

export const now: NowItem[] = [
  {
    date: "Starting May 2026",
    text: "Full-Stack AI Engineer Intern · BluePearl Mortgage Group Inc. · Vancouver, BC · Mitacs Accelerate"
  }
];

export const projects: Project[] = [
  {
    slug: "wildfire-router",
    title: "Serverless Risk-Aware Model Routing",
    period: "2026 · in progress",
    summary:
      "Adaptive YOLO11n / YOLOv9m inference for wildfire detection. Routes to a heavier model only when CWFIS regional risk scores cross a threshold, cutting GPU time on low-risk frames.",
    stack: ["PyTorch", "ONNX", "AWS Lambda", "CWFIS", "FastAPI"],
    highlights: [
      "Per-region risk lookup gates which detector runs",
      "Cold-start tuned with provisioned concurrency on the heavy path",
      "Built-in eval harness for precision / recall by risk tier"
    ],
    status: "shipping"
  },
  {
    slug: "local-docs-agent",
    title: "Local Docs Agent",
    period: "2026 · released",
    summary:
      "A privacy-first RAG document Q&A app. Ingests PDFs and Markdown, embeds locally, and answers with grounded citations.",
    stack: ["LangChain", "FAISS", "Ollama", "Next.js", "TypeScript"],
    highlights: [
      "100% offline pipeline — no document leaves the machine",
      "Citation-first UI: every claim linked to a source span",
      "Streaming responses with token-level cancel"
    ],
    status: "released"
  },
  {
    slug: "vancouver-city-brain",
    title: "Vancouver City Brain",
    period: "2026 · released",
    summary:
      "Urban intelligence dashboard fusing geospatial ML with open civic data — transit, weather, and incident signals on a single map.",
    stack: ["Mapbox GL", "GeoPandas", "scikit-learn", "Next.js"],
    highlights: [
      "H3 hex aggregation for fast multi-layer rendering",
      "Time-series forecasting per hex for incident risk",
      "Click-through drilldowns with explainable feature attributions"
    ],
    status: "released"
  },
  {
    slug: "malware-detection",
    title: "Explainable Malware Detection",
    period: "2026 · research",
    summary:
      "Combines SHAP and Grad-CAM over a CNN+tabular hybrid to make malware classification decisions inspectable for SOC analysts.",
    stack: ["PyTorch", "SHAP", "Grad-CAM", "scikit-learn"],
    highlights: [
      "Hybrid pipeline: PE-image + static-feature streams",
      "Analyst-facing UI surfaces the top-k contributing features per verdict",
      "Benchmarked on EMBER and a curated red-team set"
    ],
    status: "research"
  },
  {
    slug: "teamsync-polyglot",
    title: "TeamSync Polyglot",
    period: "2024 · released",
    summary:
      "A multilingual meeting AI: live transcription, summarization, and action-item extraction across English / Mandarin / Japanese.",
    stack: ["Google Gemma", "WebRTC", "FastAPI", "React"],
    highlights: [
      "Speaker-diarized streaming transcripts with sub-second latency",
      "Per-language post-processing for honorifics and tone",
      "Action items pushed to Linear / Notion via webhooks"
    ],
    status: "released"
  },
  {
    slug: "geek-resources",
    title: "GeekResources",
    period: "2024 · open source",
    summary:
      "Open-source K–12 CS curriculum: Swift and Python lessons, projects, and assessments. 47+ structured files in active classroom use.",
    stack: ["Swift", "Python", "Markdown"],
    highlights: [
      "Scaffolded units from \"first script\" to \"first iOS app\"",
      "Rubrics and answer keys for each project",
      "Used by Geek Education tutors across BC"
    ],
    link: "https://github.com/cailucky777/GeekResources",
    status: "released"
  }
];

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack AI Engineer Intern",
    org: "BluePearl Mortgage Group Inc.",
    location: "Vancouver, BC",
    period: "2026.05 — present",
    bullets: []
  },
  {
    role: "Programming Consultant",
    org: "Geek Education",
    location: "Vancouver, BC",
    period: "2026.02 — present",
    bullets: [
      "Teaching Swift and Python to K–12 students; designed and shipped curriculum used across multiple cohorts.",
      "Authored open-source GeekResources — 47+ lesson files, projects, and assessments.",
      "Mentor 1:1 capstone projects from idea to App Store / GitHub release."
    ]
  },
  {
    role: "MSc Applied Computing — Research Track",
    org: "British Columbia Institute of Technology",
    location: "Vancouver, BC",
    period: "2025.09 — present",
    bullets: [
      "Research on serverless ML inference and explainable security models.",
      "Coursework spans applied ML systems, distributed computing, and HCI.",
      "Co-author on explainable-AI work in malware detection."
    ]
  }
];

export const education: EducationItem[] = [
  {
    degree: "MSc, Applied Computing",
    school: "British Columbia Institute of Technology",
    period: "2025 — present"
  },
  {
    degree: "MS, Analytics",
    school: "University of Southern California",
    period: "2022 — 2024"
  },
  {
    degree: "BS, Computer Science",
    school: "University of Oregon",
    period: "2018 — 2022"
  }
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "Swift", "SQL", "Go", "C++"]
  },
  {
    group: "ML / AI",
    items: [
      "PyTorch",
      "LangChain",
      "FAISS",
      "Hugging Face",
      "OpenAI / Anthropic SDKs",
      "ONNX",
      "scikit-learn",
      "SHAP / Grad-CAM"
    ]
  },
  {
    group: "Platform",
    items: [
      "Next.js",
      "FastAPI",
      "AWS Lambda",
      "Docker",
      "Postgres",
      "Mapbox GL",
      "Vercel"
    ]
  }
];
