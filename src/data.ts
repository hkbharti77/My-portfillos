import {
  Brain,
  MessageSquare,
  Network,
  GraduationCap,
  Stethoscope,
  LineChart,
  Send,
  Facebook,
  Instagram,
  ShieldCheck,
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
    id: 'meta-cloud-whatsapp',
    title: 'Meta Cloud WhatsApp & AI Support Desk',
    tagline: 'Official Meta WhatsApp Cloud API setup, AI customer helpdesk & live agent routing.',
    icon: MessageSquare,
    tags: ['Meta Cloud API', 'WhatsApp Setup', 'AI Helpdesk', 'Webhooks', 'Live Handoff', 'Multi-Tenant'],
    description:
      'End-to-end Meta Cloud WhatsApp API setup for client businesses. Features automatic business manager verification, webhook token handshake, RAG-powered AI auto-replies, interactive quick-reply buttons, and automatic escalations to live support reps.',
    architecture: [
      'Meta Cloud WhatsApp API Webhook → FastAPI ingress',
      'LLM Intent Classifier & Knowledge RAG Bot',
      'Interactive HSM Template & Quick-Reply Buttons',
      'Live Rep Support Queue & Handoff Router',
      'Encrypted PostgreSQL session & chat log store',
    ],
    stack: ['Python', 'FastAPI', 'Meta Cloud API', 'LangChain', 'PostgreSQL', 'Redis', 'Docker'],
    challenges:
      'Handling sudden spikes of incoming WhatsApp messages from Meta webhooks without dropping requests or violating Meta rate limits.',
    results: 'Reduced customer support first-response time by 74% and handled 100,000+ monthly automated messages.',
    accent: 'from-emerald-500/20 to-teal-400/5',
  },
  {
    id: 'whatsapp-broadcasting',
    title: 'WhatsApp Broadcasting & Campaign Manager',
    tagline: 'High-throughput bulk messaging, HSM template manager & campaign analytics.',
    icon: Send,
    tags: ['WhatsApp Broadcast', 'HSM Templates', 'Audience Tagging', 'Rate Limiting', 'Meta API', 'Analytics'],
    description:
      'Enterprise WhatsApp bulk broadcasting engine built on official Meta APIs. Integrates HSM (Highly Structured Message) template approval tracking, audience segmentation, token-bucket rate limiters for Meta throughput tiers, and delivery/read conversion analytics.',
    architecture: [
      'Campaign Builder & Dynamic Audience Filter',
      'Meta Approved HSM Template Sync Engine',
      'Redis Token-Bucket Rate Limiter (Tiers 1-4)',
      'Async Celery Broadcast Worker Queue',
      'Realtime Read & Click Analytics Stream',
    ],
    stack: ['Python', 'FastAPI', 'Meta WhatsApp API', 'Redis', 'Celery', 'PostgreSQL', 'React'],
    challenges:
      'Safely distributing 1M+ broadcast messages while staying strictly within Meta daily tier throughput limits (Tier 1-4).',
    results: 'Achieved 99.4% broadcast delivery rate with a 45%+ engagement rate across marketing campaigns.',
    accent: 'from-green-500/20 to-emerald-400/5',
  },
  {
    id: 'instagram-automation',
    title: 'Instagram Graph API & Automation Suite',
    tagline: 'Automated DMs, comment keyword triggers, story mention leads & catalog sync.',
    icon: Instagram,
    tags: ['Instagram API', 'Automated DMs', 'Comment Triggers', 'Story Mentions', 'Meta Graph API', 'Lead Funnel'],
    description:
      'Complete Instagram Graph API integration enabling automated DM customer service, instant comment-to-direct-message keyword triggers, story mention lead capture, and a unified messaging inbox across WhatsApp & Instagram.',
    architecture: [
      'Instagram Graph API Webhook Event Listener',
      'Comment Keyword Engine → Auto DM Dispatcher',
      'Story Mention Recognition & Lead Capture Bot',
      'Unified Customer Thread Manager (IG + WhatsApp)',
      'PostgreSQL Session & Analytics Store',
    ],
    stack: ['TypeScript', 'Node.js', 'Instagram Graph API', 'Meta App Review', 'PostgreSQL', 'Redis'],
    challenges:
      'Maintaining 24-hour customer service window compliance while automating contextual DM replies for viral Instagram posts.',
    results: 'Increased post comment conversions by 310% and captured 5× more direct Instagram leads.',
    accent: 'from-pink-500/20 to-rose-400/5',
  },
  {
    id: 'meta-tech-provider',
    title: 'Meta Tech Provider & Embedded Signup Engine',
    tagline: 'Consulting & tech suite enabling client businesses to become official Meta Tech Providers.',
    icon: ShieldCheck,
    tags: ['Meta Tech Provider', 'Embedded Signup', 'Facebook Login', 'Meta OAuth', 'App Review', 'Partner Portal'],
    description:
      'Full technical platform and consulting service to guide SaaS companies and agencies in becoming official Meta Tech Providers (Business Partners). Implements Meta Embedded Signup (1-click WABA setup), Meta OAuth 2.0, Facebook Login, and Meta App Review compliance.',
    architecture: [
      'Meta Embedded Signup OAuth 2.0 Flow',
      'Facebook Login & System User Token Exchange',
      'Meta Business Manager Asset Delegation API',
      'App Review & Security Compliance Hardening Module',
      'Partner Management Dashboard for Client WABAs',
    ],
    stack: ['TypeScript', 'React', 'Meta OAuth 2.0', 'Meta Business Manager API', 'Python', 'FastAPI'],
    challenges:
      'Compressing client WhatsApp onboarding from a 3-day manual process down to a 2-minute 1-click Embedded Signup flow.',
    results: 'Guided 15+ SaaS clients to achieve Meta Tech Provider status with a 100% Meta App Review pass rate.',
    accent: 'from-blue-500/20 to-indigo-400/5',
  },
  {
    id: 'facebook-login-oauth',
    title: 'Facebook Login & Meta OAuth Platform',
    tagline: 'Social login authentication, Page Access Tokens management & SSO engine.',
    icon: Facebook,
    tags: ['Facebook Login', 'Meta OAuth 2.0', 'Page Access Tokens', 'Meta SDK', 'Security', 'SSO'],
    description:
      'Enterprise Facebook Login & Meta OAuth integration supporting multi-tenant permission delegation, long-lived Page access token refreshing, business verification token storage, and single sign-on (SSO).',
    architecture: [
      'Meta JS SDK & Server-side OAuth 2.0 Handshake',
      'Token Exchange (Short-lived → Long-lived Page Token)',
      'Encrypted Token Vault in PostgreSQL with KMS',
      'Automatic Token Expiration & Refresh Daemon',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Meta SDK', 'OAuth 2.0', 'PostgreSQL'],
    challenges:
      'Managing token invalidation events gracefully across 500+ connected client Facebook Pages.',
    results: 'Zero auth downtime and smooth 1-click social login for 200,000+ registered platform users.',
    accent: 'from-sky-500/20 to-cyan-400/5',
  },
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
  { name: 'Custom Software & Enterprise Solutions', items: ['Custom Software Development', 'Conversational AI CRM Platforms', 'University ERP Systems', 'Healthcare CRM & Patient Software', 'Financial Intelligence Platforms', 'Multi-Tenant SaaS Architectures', 'Workflow Automation Engine'] },
  { name: 'Meta Ecosystem & Messaging', items: ['Meta Cloud WhatsApp API', 'WhatsApp Broadcasting Campaigns', 'HSM Template Approval Flow', 'Instagram Graph API', 'Facebook OAuth / Login', 'Meta Embedded Signup', 'Meta Tech Provider Consulting', 'Meta Webhooks Stream', 'Page Access Token Refresh'] },
  { name: 'Languages', items: ['Python', 'Java', 'SQL', 'TypeScript', 'JavaScript'] },
  { name: 'AI / GenAI Systems', items: ['RAG Pipelines', 'Multi-Agent Orchestration', 'LangChain', 'LangGraph', 'FAISS', 'Pinecone', 'ChromaDB', 'Sentence Transformers', 'Cross-Encoder Reranking', 'SHAP (Explainable AI)', 'OpenAI & Gemini APIs', 'Prompt Engineering'] },
  { name: 'Backend', items: ['FastAPI', 'Spring Boot', 'Node.js', 'RESTful APIs', 'Asyncio', 'Distributed Locking (Redis)', 'WebSockets', 'Webhooks', 'JWT', 'Fine-Grained RBAC'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Material UI', 'TypeScript'] },
  { name: 'Databases & Storage', items: ['PostgreSQL', 'MongoDB', 'Redis', 'pgvector', 'FAISS', 'Pinecone', 'ChromaDB'] },
  { name: 'Cloud & DevOps', items: ['AWS (EC2, S3)', 'GCP (Vertex AI)', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions', 'Jenkins', 'CI/CD'] },
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
    id: 'meta-cloud-whatsapp',
    title: 'Meta Cloud WhatsApp & AI Ingress',
    description: 'Inbound Webhook → FastAPI verification → Intent Classifier → RAG Agent / Live Handoff.',
    nodes: [
      { label: 'Meta Cloud API', sub: 'Inbound Webhook', kind: 'in' },
      { label: 'FastAPI Ingress', sub: 'Signature Verify', kind: 'core' },
      { label: 'AI Intent Classifier', sub: 'LangChain / LLM', kind: 'core' },
      { label: 'PostgreSQL Store', sub: 'Encrypted History', kind: 'store' },
      { label: 'Live Rep Handoff', sub: 'Agent Queue', kind: 'core' },
      { label: 'WhatsApp Reply', sub: 'Meta Cloud API', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [2, 5]],
  },
  {
    id: 'meta-broadcasting',
    title: 'WhatsApp & IG Broadcasting Flow',
    description: 'Audience Segment → HSM Template Engine → Redis Token Bucket → Meta Dispatch.',
    nodes: [
      { label: 'Campaign Creator', kind: 'in' },
      { label: 'HSM Template Sync', sub: 'Meta Approved', kind: 'core' },
      { label: 'Audience Filter', sub: 'Segment Engine', kind: 'core' },
      { label: 'Token Bucket', sub: 'Redis Limiter', kind: 'store' },
      { label: 'Async Queue', sub: 'Celery Workers', kind: 'core' },
      { label: 'Meta API Delivery', sub: 'WhatsApp & Instagram', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  },
  {
    id: 'meta-tech-provider',
    title: 'Meta Tech Provider & Embedded Signup',
    description: '1-Click OAuth → Meta Embedded Signup → Token Exchange → WABA & Page Access Granted.',
    nodes: [
      { label: 'Client App', kind: 'in' },
      { label: 'Embedded Signup', sub: 'Meta Popup OAuth', kind: 'core' },
      { label: 'Token Exchange', sub: 'Short to Long-lived', kind: 'core' },
      { label: 'Encrypted Vault', sub: 'KMS + Postgres', kind: 'store' },
      { label: 'WABA & Page Access', sub: 'Meta Business Manager', kind: 'out' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
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
  date: string;
  content: string[];
  // Optional SEO fields populated from Firestore
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
}

export const blogs: BlogPost[] = [
  {
    title: 'RAG Explained',
    excerpt: 'How retrieval-augmented generation grounds LLMs in your data — and why it beats fine-tuning for most teams.',
    tag: 'AI',
    readTime: '8 min',
    date: 'Mar 2025',
    content: [
      'Retrieval-augmented generation (RAG) combines a language model with a search step over your own documents. Instead of relying on what the model learned during training, you fetch relevant chunks at query time and feed them into the prompt as context.',
      'The core pipeline is straightforward: ingest documents, split them into chunks, embed each chunk with a sentence-transformer model, and store the vectors in an index like FAISS or Pinecone. At query time you embed the question, run a similarity search, and pass the top-k chunks to the LLM alongside the question.',
      'Why this beats fine-tuning for most teams: fine-tuning bakes knowledge into weights, which means every update requires retraining and you lose the ability to cite sources. RAG keeps knowledge external — you add or update documents and the system adapts instantly. You also get citations, which are essential for trust in enterprise settings.',
      'The hard part is chunking. Naive fixed-size chunks break tables and split sentences mid-way. A hybrid chunker that respects document structure — keeping tabular rows intact and splitting on semantic boundaries — dramatically improves retrieval quality.',
      'Add a reranker after retrieval. Cross-encoder rerankers reorder candidates by true relevance rather than embedding distance, and a reranked top-5 consistently outperforms a raw top-20.',
    ],
  },
  {
    title: 'FAISS vs Pinecone',
    excerpt: 'When to run FAISS locally vs. a managed vector DB — latency, scale, and operational tradeoffs.',
    tag: 'Vector Search',
    readTime: '6 min',
    date: 'Feb 2025',
    content: [
      'FAISS and Pinecone solve the same problem — fast similarity search over high-dimensional vectors — but they sit at opposite ends of the build-vs-buy spectrum.',
      'FAISS is a library. You embed your documents, build an index in memory, and query it. There is no server, no network hop, and no per-query cost. Latency is sub-millisecond for millions of vectors on a single machine. The tradeoff: you own persistence, replication, and scaling yourself.',
      'Pinecone is a managed service. You get horizontal scaling, filtered search, and zero infrastructure work. The tradeoff is network latency on every query and a usage-based bill that climbs quickly at scale.',
      'My rule of thumb: start with FAISS for prototypes and internal tools where the dataset fits in memory on one box. Move to Pinecone (or a self-hosted equivalent like Milvus) when you need multi-tenant filtering, high availability, or the index exceeds what a single node can hold.',
      'A hybrid pattern I use in production: FAISS for the hot, frequently-queried subset and Pinecone for the long tail. Cache the top results and most reads never hit either index.',
    ],
  },
  {
    title: 'AI Agent Architecture',
    excerpt: 'Designing planner/executor agents with memory and human-in-the-loop approval gates.',
    tag: 'AI',
    readTime: '10 min',
    date: 'Jan 2025',
    content: [
      'An AI agent is not just a prompt — it is a loop. The agent receives a goal, decides on an action, observes the result, and repeats until the goal is met or a budget is exhausted. The architecture you wrap around that loop determines whether the system is safe and useful or unpredictable and dangerous.',
      'I split agents into roles: a Planner that decomposes the goal into a task graph, an Executor that calls tools, a Memory store for short-term context and long-term recall, and a Human Approval node for irreversible actions.',
      'The Planner is the most important piece. A good planner produces a dependency-ordered task graph, not a flat list. Each task has explicit inputs and outputs so the executor knows when it has what it needs.',
      'Memory needs two tiers. Short-term memory holds the current task graph and recent observations — this is what fits in the context window. Long-term memory persists across sessions in a vector store so the agent can recall past decisions and avoid repeating mistakes.',
      'The human approval gate is non-negotiable for any tool with side effects. Send an email, modify a database row, charge a card — these require explicit approval. I budget the agent with a step limit and a cost limit so runaway loops fail fast instead of burning tokens indefinitely.',
    ],
  },
  {
    title: 'Spring Boot Best Practices',
    excerpt: 'Structuring modular monoliths, exception handling, and caching that scales.',
    tag: 'Backend',
    readTime: '7 min',
    date: 'Dec 2024',
    content: [
      'A modular monolith gives you the logical separation of microservices without the operational overhead. Each module is a package with its own controllers, services, repositories, and entities. Modules talk to each other through well-defined interfaces, never by reaching into another module\'s database tables.',
      'Global exception handling with @RestControllerAdvice keeps controllers clean. Define a hierarchy of business exceptions, map each to an HTTP status and a consistent error envelope, and log the stack trace once at the boundary — not in every catch block.',
      'Caching is the easiest way to add 10x performance and the easiest way to introduce subtle bugs. Use @Cacheable on read-heavy, rarely-changing queries, but always pair it with @CacheEvict on writes. For multi-tenant systems, include the tenant ID in the cache key or you will leak data across tenants.',
      'Connection pooling: let HikariCP manage it, but tune the pool size to your database capacity, not your peak request count. A common mistake is setting maxPoolSize equal to max concurrent requests — the database can rarely handle that many simultaneous connections.',
      'Always version your API. A /api/v1 prefix costs nothing upfront and saves you from breaking every client when you need to evolve a response shape.',
    ],
  },
  {
    title: 'FastAPI Performance',
    excerpt: 'Async I/O, connection pooling, and batching for high-throughput ML APIs.',
    tag: 'Backend',
    readTime: '6 min',
    date: 'Nov 2024',
    content: [
      'FastAPI is fast because it is async, but async only helps when your code actually awaits. A single blocking call — a synchronous database driver, a requests.get, or a CPU-bound computation — blocks the entire event loop and every other request waiting on it.',
      'For database access use an async driver like asyncpg or databases. For HTTP calls use httpx with an AsyncClient. For CPU-bound work like model inference, push it to a thread pool with run_in_executor or offload to a background worker entirely.',
      'Connection pooling matters more in async land because creating connections is expensive and the pool is shared across the event loop. Set min_size to keep warm connections ready and max_size high enough for burst traffic but not so high that the database refuses connections.',
      'Batching is the single biggest win for ML APIs. Instead of running inference on one input at a time, queue incoming requests and process them in batches of 8-32. GPU utilization jumps from 20% to 90% and throughput improves by an order of magnitude.',
      'Use background tasks for fire-and-forget work like logging or notifications, but do not use them for anything that must survive a crash. For durable async work, a real task queue (Celery, RQ, or a simple Redis list) is the right tool.',
    ],
  },
  {
    title: 'MongoDB Optimization',
    excerpt: 'Index strategy, aggregation pipelines, and reading explain plans the right way.',
    tag: 'Database',
    readTime: '5 min',
    date: 'Oct 2024',
    content: [
      'MongoDB performance is almost entirely about indexes. Every query that scans more than a few hundred documents is missing an index or using the wrong one. Start with .explain("executionStats") on slow queries and look for totalDocsExamined — if it is close to your collection size, you are doing a collection scan.',
      'Compound indexes follow the ESR rule: Equality, Sort, Range. Put equality fields first, then the field you sort on, then range fields. This lets one index serve a query that filters, sorts, and ranges simultaneously.',
      'Aggregation pipelines are powerful but easy to misuse. Put $match as early as possible to reduce the working set before $group or $lookup. A $lookup on a million-document collection without a preceding $match will bring your server to its knees.',
      'Read preference matters in replica sets. Default reads go to the primary, which is correct for consistency-critical workloads. For analytics and reporting, route to secondaries with readPreference=secondaryPreferred to offload the primary.',
      'Monitor working set size. If your active working set exceeds available RAM, MongoDB pages to disk and performance falls off a cliff. Either add RAM, shard the collection, or archive cold data.',
    ],
  },
  {
    title: 'Docker for AI Services',
    excerpt: 'Layered images for Python ML workloads and keeping images small without losing models.',
    tag: 'DevOps',
    readTime: '5 min',
    date: 'Sep 2024',
    content: [
      'ML images are notoriously huge — a base Python image plus PyTorch and a few transformers can easily hit 5GB. The key is multi-stage builds and layer caching.',
      'Split your Dockerfile into a builder stage that installs heavy dependencies and a runtime stage that copies only what is needed. Use a slim base image like python:3.11-slim and install system dependencies explicitly rather than pulling a full Debian image.',
      'Order layers from least to most frequently changing. Copy requirements.txt and install dependencies before copying your application code. This way a code change does not invalidate the cached pip install layer — which is the slowest step by far.',
      'Model files are the elephant in the room. Do not bake a 2GB model into the image. Either download it at startup from object storage or mount it as a volume. This keeps images small and lets you swap models without rebuilding.',
      'Use .dockerignore aggressively. The build context should contain only what the image needs. A stray data folder or a .git directory can slow down every build.',
    ],
  },
  {
    title: 'Redis as a System Backbone',
    excerpt: 'Caching, pub/sub, and rate limiting patterns that survive production traffic.',
    tag: 'Infra',
    readTime: '6 min',
    date: 'Aug 2024',
    content: [
      'Redis is the Swiss army knife of infrastructure. In a single system I might use it for caching, session storage, rate limiting, pub/sub messaging, and a task queue — all talking to the same Redis instance.',
      'For caching, always set a TTL. Memory is finite and Redis will evict keys via maxmemory policies, but explicit TTLs keep your cache predictable. Use cache stampede protection: when a key expires, let one request compute the value and block others with a short lock — this prevents 50 simultaneous requests from all hitting the database at once.',
      'Rate limiting with Redis is clean and atomic. Use a sliding window with sorted sets or a fixed window with INCR and EXPIRE. The sliding window is more accurate; the fixed window is simpler and sufficient for most use cases.',
      'Pub/sub is great for real-time fan-out — WebSocket notifications, cache invalidation across instances, live dashboards. The catch: pub/sub is fire-and-forget. If a subscriber is offline, the message is gone. For durable messaging, use Redis Streams instead.',
      'Always run Redis with persistence enabled (AOF at least) for anything that matters. Redis is fast because it is in-memory, but a restart should not mean losing every session and cache entry.',
    ],
  },
  {
    title: 'How to Become an Official Meta Tech Provider',
    excerpt: 'Step-by-step technical guide to Embedded Signup, Meta OAuth, WABA management & Meta App Review approval.',
    tag: 'Meta Ecosystem',
    readTime: '9 min',
    date: 'May 2025',
    content: [
      'Becoming an official Meta Tech Provider (formerly Meta Business Partner) allows your business or SaaS application to onboard clients seamlessly to WhatsApp Cloud API and Facebook Pages using Embedded Signup.',
      'Instead of asking clients to generate permanent access tokens manually, Meta Embedded Signup pops up a standard OAuth flow where the client logs in with Facebook, selects their WhatsApp Business Account (WABA), registers their phone number, and delegates permissions to your Meta app in seconds.',
      'The architecture requires three steps: 1) Triggering the Meta SDK Embedded Signup dialog with scope whatsapp_business_management and whatsapp_business_messaging. 2) Catching the authorization code server-side and exchanging it for a System User Access Token. 3) Storing the client WABA ID and Phone Number ID securely.',
      'Passing Meta App Review: Meta enforces strict security checks. Your app must provide clean privacy policy URLs, data deletion endpoints, explicit permission use cases, and video screencasts showing the exact user flow.',
      'Once approved, your tech platform can manage client messaging, broadcast campaigns, and automated customer support under your Meta Tech Provider account while giving clients full control over their assets.',
    ],
  },
  {
    title: 'High-Throughput WhatsApp & Instagram Automation',
    excerpt: 'Architecting token-bucket rate limiting, HSM templates, and comment-to-DM triggers at enterprise scale.',
    tag: 'Messaging',
    readTime: '11 min',
    date: 'Apr 2025',
    content: [
      'Scaling Meta WhatsApp Cloud API and Instagram Graph API requires balancing throughput with strict API rate limits and Meta quality scores.',
      'WhatsApp Cloud API imposes daily messaging tiers (Tier 1: 1k users/day, Tier 2: 10k/day, Tier 3: 100k/day, Tier 4: Unlimited). To avoid getting throttled or banned during bulk broadcasting, use a Redis token-bucket rate limiter that enforces per-second and per-hour message dispatch limits.',
      'Template Messages (HSM): All outbound initiated messages outside the 24-hour customer window must use approved HSM templates. Build an automated template status sync service that polls or listens to Meta template webhooks so your campaign engine only dispatches active templates.',
      'Instagram Comment-to-DM automation: Catching the instagram_story_insights or comments webhook lets you send instant contextual DMs when users comment specific keywords (e.g., "DEMO" or "PRICE"). Always verify X-Hub-Signature SHA256 headers on webhooks to ensure requests come strictly from Meta servers.',
    ],
  },
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

export interface CertificationItem {
  year: string;
  title: string;
  issuer: string;
  badge: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  score: string;
  period: string;
}

export const educationList: EducationItem[] = [
  {
    institution: 'Bihar Engineering University',
    location: 'Bihar, India',
    degree: 'Bachelor of Technology (B.Tech) – Electronics & Communication Engineering',
    score: 'CGPA: 7.8 / 10',
    period: '2020 – 2024',
  },
  {
    institution: 'R.M. College (BSEB)',
    location: 'Saharsa, Bihar, India',
    degree: 'Class XII (Senior Secondary) – Science (PCM)',
    score: 'Percentage: 68%',
    period: '2018 – 2020',
  },
  {
    institution: "St. Xavier's School",
    location: 'Saharsa, Bihar, India',
    degree: 'Class X (Secondary School Certificate)',
    score: 'CGPA: 9.4 / 10',
    period: '2018',
  },
];

export const certificationsList: CertificationItem[] = [
  {
    year: '2024',
    title: 'Salesforce Trailhead Superbadges – Apex Specialist & Process Automation Specialist',
    issuer: 'Salesforce',
    badge: 'Apex & Automation',
  },
  {
    year: '2024',
    title: 'Cisco CyberOps Associate',
    issuer: 'Cisco Networking Academy',
    badge: 'Cybersecurity',
  },
  {
    year: '2023',
    title: 'Cisco CCNA: Introduction to Networks (CCNAv7)',
    issuer: 'Cisco Networking Academy',
    badge: 'Networking',
  },
  {
    year: '2024',
    title: 'Meta Tech Provider & WhatsApp Cloud API Specialist',
    issuer: 'Meta Partner Ecosystem',
    badge: 'Meta APIs',
  },
];

export const certifications = [
  'Salesforce Superbadges: Apex Specialist & Process Automation',
  'Cisco CyberOps Associate (2024)',
  'Cisco CCNAv7: Intro to Networks (2023)',
  'Meta Tech Provider & Cloud API Specialist',
  'Custom Software Architect',
  'Enterprise CRM & ERP Systems',
  'Docker & Redis Distributed Systems',
  'FastAPI & Hybrid RAG AI Systems',
  'Java Spring Boot & MySQL Indexing',
];

export const navSections = [
  'home',
  'about',
  'meta-services',
  'experience',
  'projects',
  'tech',
  'architecture',
  'blogs',
  'certifications',
  'resume',
  'contact',
];

