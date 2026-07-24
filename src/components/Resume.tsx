import { Briefcase, Calendar, Cloud, Code2, Cpu, Download, GraduationCap, Sparkles } from 'lucide-react';
import { useReveal } from '../hooks';

const timeline = [
  {
    period: 'May 2025 — Present',
    role: 'Software Development Engineer (Full-Stack & AI)',
    company: 'Mobiloitte Technologies · New Delhi, India',
    points: [
      'Deployed omnichannel AI bots (WhatsApp, Instagram, Slack) for 10k+ users with domain-specific knowledge bases and hybrid search',
      'Designed a SaaS-based Human-in-the-Loop (HITL) system for seamless AI-to-agent transitions via WebSockets, reducing ticket turnaround by ~50%',
      'Implemented semantic chunking for multi-tenant PDF ingestion pipelines, ensuring strict tenant isolation & 0% data leakage across vector stores',
      'Optimized multi-tenant billing analytics and LLM usage logging in FastAPI admin dashboards secured with JWT-based fine-grained RBAC',
    ],
    icon: Briefcase,
  },
  {
    period: 'Aug 2024 — Apr 2025',
    role: 'Full Stack Developer Intern',
    company: 'QSpiders · Noida, India',
    points: [
      'Built high-integrity transactional systems using Java Spring Boot and MySQL, managing concurrent data updates and strict ACID compliance',
      'Optimized SQL indexing, composite execution plans, and HikariCP connection pooling, resulting in a 20% increase in API throughput',
      'Integrated RESTful APIs with React frontends, implementing clean architectural patterns and global error handling',
    ],
    icon: Code2,
  },
];

export default function Resume() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="resume" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">09 — Resume</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Interactive resume
            </h2>
          </div>
          <a
            href="/Himanshu_Bharti_Resume.pdf"
            download="Himanshu_Bharti_Resume.pdf"
            className="btn-primary"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* timeline */}
          <div className="lg:col-span-2">
            <div className="relative space-y-6 border-l border-soft pl-6">
              {timeline.map((t) => (
                <div key={t.period} className="relative">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-soft bg-soft">
                    <t.icon className="h-3 w-3 text-brand-500" />
                  </span>
                  <div className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-base font-semibold">{t.role}</h3>
                      <span className="flex items-center gap-1.5 text-xs text-soft">
                        <Calendar className="h-3 w-3" /> {t.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-brand-500">{t.company}</p>
                    <ul className="mt-3 space-y-1.5">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-soft">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <GraduationCap className="h-4 w-4 text-brand-500" /> Education
              </h3>
              <p className="mt-3 text-sm font-semibold text-brand-500">B.Tech in Electronics & Communication</p>
              <p className="text-xs font-medium text-slate-200">Bihar Engineering University</p>
              <p className="mt-1 text-xs text-soft font-mono">CGPA: 7.8 / 10</p>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-brand-500" /> AI & GenAI Systems
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['RAG Pipelines', 'LangChain', 'LangGraph', 'FAISS', 'Pinecone', 'Cross-Encoders', 'SHAP'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Cloud className="h-4 w-4 text-brand-500" /> Infrastructure & Cloud
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['AWS', 'GCP', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Code2 className="h-4 w-4 text-brand-500" /> Core Systems
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['System Design', 'Distributed Locks', 'WebSockets', 'RBAC', 'RESTful APIs'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
