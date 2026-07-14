import {
  Brain,
  MessageSquare,
  Network,
  GraduationCap,
  Stethoscope,
  LineChart,
  type LucideIcon,
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  tags: string[];
  description: string;
  architecture: string[];
  stack: string[];
  challenges: string;
  results: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'ai-crm',
    title: 'AI CRM Platform',
    tagline: 'Conversational CRM with WhatsApp AI, lead routing & human handoff.',
    icon: MessageSquare,
    tags: ['WhatsApp AI', 'Lead Management', 'Human Handoff', 'Multi-Tenant', 'Analytics', 'AI Automation'],
    description:
      'A multi-tenant CRM where an LLM-powered agent handles inbound WhatsApp conversations, qualifies leads, routes them to the right rep, and escalates to humans when confidence drops — all with real-time analytics.',
    architecture: [
      'WhatsApp Cloud API webhook → FastAPI ingress',
      'LangChain orchestrator with tool-calling agent',
      'Confidence gate → human handoff queue',
      'Per-tenant data isolation in PostgreSQL',
      'Realtime analytics stream via Redis pub/sub',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Redis', 'WhatsApp API', 'Docker'],
    challenges:
      'Balancing agent autonomy with safety — built a confidence-gated handoff so low-certainty conversations escalate to humans automatically.',
    results: 'Cut first-response time by 62% and qualified 3× more leads per rep.',
    accent: 'from-brand-500/20 to-brand-400/5',
  },
  {
    id: 'rag-platform',
    title: 'Enterprise RAG Platform',
    tagline: 'Multi-format ingestion, vector search & semantic knowledge base.',
    icon: Brain,
    tags: ['PDF', 'DOCX', 'Excel', 'Vector Search', 'FAISS', 'Semantic Search', 'Knowledge Base'],
    description:
      'A retrieval-augmented generation platform that ingests PDFs, DOCX and Excel, chunks and embeds them, and answers natural-language queries with cited sources over FAISS / Pinecone.',
    architecture: [
      'Ingestion pipeline → unstructured + tabular parsers',
      'Chunking + sentence-transformer embeddings',
      'FAISS / Pinecone vector index with hybrid search',
      'Reranker → grounded LLM answer with citations',
      'Per-collection access control',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'Pinecone', 'Sentence Transformers', 'OpenAI'],
    challenges:
      'Preserving table structure from Excel/PDF — built a hybrid chunker that keeps tabular rows intact before embedding.',
    results: 'Achieved 91% answer accuracy on internal eval set with full source citations.',
    accent: 'from-accent-500/20 to-accent-400/5',
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent AI Platform',
    tagline: 'Planner, retriever, memory & human-in-the-loop agent orchestration.',
    icon: Network,
    tags: ['Planner Agent', 'Retrieval Agent', 'Memory', 'Human Agent', 'Tool Calling'],
    description:
      'A multi-agent orchestration platform with a planner that decomposes goals, a retrieval agent, shared memory, and a human agent for approvals — all coordinated through tool-calling.',
    architecture: [
      'Planner agent → task graph decomposition',
      'Retrieval + executor agents with tool schemas',
      'Shared short-term memory + long-term store',
      'Human-in-the-loop approval node',
      'Observability via structured traces',
    ],
    stack: ['Python', 'LangChain', 'OpenAI', 'Gemini', 'Redis', 'FastAPI', 'Docker'],
    challenges:
      'Preventing runaway agent loops — added budgeted step limits and a human approval gate for irreversible tools.',
    results: 'Reduced manual task handling by 48% across internal automation workflows.',
    accent: 'from-violet-500/20 to-violet-400/5',
  },
  {
    id: 'university-erp',
    title: 'University ERP / CRM',
    tagline: 'Admissions, student CRM, employee portal & AI chatbot in one platform.',
    icon: GraduationCap,
    tags: ['Admissions', 'Student CRM', 'Employee Portal', 'AI Chatbot', 'Reports'],
    description:
      'A full university ERP covering admissions, student lifecycle, employee portal, automated reports, and an AI chatbot that answers student queries from the knowledge base.',
    architecture: [
      'Spring Boot modular monolith + REST APIs',
      'Role-based access (student, staff, admin)',
      'Event-driven reports generation',
      'RAG-backed chatbot for student queries',
      'PostgreSQL + Redis caching layer',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    challenges:
      'Complex role matrix across departments — implemented a fine-grained RBAC engine with composable permissions.',
    results: 'Onboarded 4,000+ students and cut admissions processing time by 40%.',
    accent: 'from-amber-500/20 to-amber-400/5',
  },
  {
    id: 'healthcare-crm',
    title: 'Healthcare CRM',
    tagline: 'Appointments, doctors, patients, queue management & e-prescriptions.',
    icon: Stethoscope,
    tags: ['Appointments', 'Doctors', 'Patients', 'Queue Management', 'Digital Prescriptions'],
    description:
      'A healthcare CRM managing appointments, doctor availability, patient records, live queue management, and digital prescriptions with audit trails.',
    architecture: [
      'Appointment engine with slot optimization',
      'Live queue via WebSocket updates',
      'Patient records with encrypted storage',
      'Digital prescription generator (PDF)',
      'Spring Boot + PostgreSQL + JWT auth',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Redis', 'WebSocket'],
    challenges:
      'Real-time queue fairness — built a priority-aware queue scheduler that handles emergencies without starving the line.',
    results: 'Reduced average patient wait time by 35% across pilot clinics.',
    accent: 'from-rose-500/20 to-rose-400/5',
  },
  {
    id: 'company-analysis',
    title: 'AI Company Analysis',
    tagline: 'Company intelligence, financial analysis & buy-probability scoring.',
    icon: LineChart,
    tags: ['Company Intelligence', 'Financial Analysis', 'Buy Probability', 'Portfolio Recommendation'],
    description:
      'An AI platform that pulls company intelligence, runs financial analysis, scores buy probability, and recommends portfolio allocations with explainable signals.',
    architecture: [
      'Data ingestion → filings + market feeds',
      'Feature engineering + financial ratios',
      'ML buy-probability model with SHAP signals',
      'Portfolio optimizer with risk constraints',
      'FastAPI + scheduled batch scoring',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'scikit-learn', 'AWS'],
    challenges:
      'Explainability for buy scores — wrapped predictions with SHAP so every recommendation surfaces its top drivers.',
    results: 'Outperformed baseline picks by 18% on backtested 12-month returns.',
    accent: 'from-emerald-500/20 to-emerald-400/5',
  },
];

export interface TechCategory {
  name: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  { name: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { name: 'Backend', items: ['Spring Boot', 'FastAPI', 'Node.js'] },
  {
    name: 'AI / ML',
    items: ['LangChain', 'OpenAI', 'Gemini', 'Vertex AI', 'RAG', 'FAISS', 'Pinecone', 'ChromaDB', 'Sentence Transformers'],
  },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Material UI'] },
  { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'Cloud / DevOps', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions', 'Jenkins', 'CI/CD'] },
];

export interface ArchitectureDiagram {
  id: string;
  title: string;
  nodes: { label: string; sub?: string; kind: 'in' | 'core' | 'store' | 'out' }[];
  edges: [number, number][];
  description: string;
}

export const architectures: ArchitectureDiagram[] = [
  {
    id: 'rag',
    title: 'RAG Architecture',
    description: 'Document ingestion → embeddings → vector search → grounded LLM answer.',
    nodes: [
      { label: 'Documents', sub: 'PDF · DOCX · XLSX', kind: 'in' },
      { label: 'Chunker', kind: 'core' },
      { label: 'Embeddings', sub: 'Sentence Transformers', kind: 'core' },
      { label: 'Vector Index', sub: 'FAISS / Pinecone', kind: 'store' },
      { label: 'Reranker', kind: 'core' },
      { label: 'LLM Answer', sub: 'with citations', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  },
  {
    id: 'agent',
    title: 'AI Agent Architecture',
    description: 'Planner decomposes goals, executor calls tools, memory persists context.',
    nodes: [
      { label: 'Goal', kind: 'in' },
      { label: 'Planner', kind: 'core' },
      { label: 'Executor', sub: 'tool calling', kind: 'core' },
      { label: 'Memory', kind: 'store' },
      { label: 'Human Approval', kind: 'core' },
      { label: 'Result', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 2], [2, 4], [4, 5]],
  },
  {
    id: 'crm',
    title: 'CRM Architecture',
    description: 'WhatsApp ingress → AI agent → lead routing & human handoff.',
    nodes: [
      { label: 'WhatsApp', kind: 'in' },
      { label: 'FastAPI', kind: 'core' },
      { label: 'AI Agent', sub: 'LangChain', kind: 'core' },
      { label: 'PostgreSQL', sub: 'multi-tenant', kind: 'store' },
      { label: 'Lead Routing', kind: 'core' },
      { label: 'Analytics', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 3], [3, 5]],
  },
  {
    id: 'microservices',
    title: 'Microservices',
    description: 'API gateway → services → message bus → shared data stores.',
    nodes: [
      { label: 'Client', kind: 'in' },
      { label: 'API Gateway', sub: 'Nginx', kind: 'core' },
      { label: 'Services', sub: 'Spring Boot', kind: 'core' },
      { label: 'Message Bus', sub: 'Redis / Kafka', kind: 'store' },
      { label: 'Databases', kind: 'store' },
      { label: 'Response', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 2], [2, 5]],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp AI Flow',
    description: 'Webhook → intent detection → agent → confidence gate → reply.',
    nodes: [
      { label: 'Inbound Msg', kind: 'in' },
      { label: 'Webhook', kind: 'core' },
      { label: 'Intent', sub: 'LLM', kind: 'core' },
      { label: 'Confidence', kind: 'core' },
      { label: 'Agent / Human', kind: 'core' },
      { label: 'Reply', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  },
  {
    id: 'k8s',
    title: 'Kubernetes Deployment',
    description: 'CI builds image → push registry → deploy with autoscaling.',
    nodes: [
      { label: 'Git Push', kind: 'in' },
      { label: 'CI/CD', sub: 'GitHub Actions', kind: 'core' },
      { label: 'Registry', sub: 'ECR / GCR', kind: 'store' },
      { label: 'K8s Cluster', kind: 'core' },
      { label: 'HPA', sub: 'autoscale', kind: 'core' },
      { label: 'Live Service', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 3], [3, 5]],
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
}

export const blogs: BlogPost[] = [
  { title: 'RAG Explained', excerpt: 'How retrieval-augmented generation grounds LLMs in your data — and why it beats fine-tuning for most teams.', tag: 'AI', readTime: '8 min' },
  { title: 'FAISS vs Pinecone', excerpt: 'When to run FAISS locally vs. a managed vector DB — latency, scale, and operational tradeoffs.', tag: 'Vector Search', readTime: '6 min' },
  { title: 'AI Agent Architecture', excerpt: 'Designing planner/executor agents with memory and human-in-the-loop approval gates.', tag: 'AI', readTime: '10 min' },
  { title: 'Spring Boot Best Practices', excerpt: 'Structuring modular monoliths, exception handling, and caching that scales.', tag: 'Backend', readTime: '7 min' },
  { title: 'FastAPI Performance', excerpt: 'Async I/O, connection pooling, and batching for high-throughput ML APIs.', tag: 'Backend', readTime: '6 min' },
  { title: 'MongoDB Optimization', excerpt: 'Index strategy, aggregation pipelines, and reading explain plans the right way.', tag: 'Database', readTime: '5 min' },
  { title: 'Docker for AI Services', excerpt: 'Layered images for Python ML workloads and keeping images small without losing models.', tag: 'DevOps', readTime: '5 min' },
  { title: 'Redis as a System Backbone', excerpt: 'Caching, pub/sub, and rate limiting patterns that survive production traffic.', tag: 'Infra', readTime: '6 min' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 8, suffix: '+', label: 'AI Systems' },
  { value: 15, suffix: '+', label: 'REST APIs' },
  { value: 50, suffix: '+', label: 'Features Delivered' },
];

export const certifications = [
  'Google Cloud',
  'AWS',
  'Docker',
  'Kubernetes',
  'AI',
  'Spring',
  'Java',
];

export const navSections = [
  'home',
  'about',
  'experience',
  'projects',
  'tech',
  'architecture',
  'blogs',
  'resume',
  'contact',
];
