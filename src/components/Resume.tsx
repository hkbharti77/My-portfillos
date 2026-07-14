import { Briefcase, Calendar, Cloud, Code2, Cpu, Download, GraduationCap } from 'lucide-react';
import { useReveal } from '../hooks';

const timeline = [
  {
    period: '2023 — Present',
    role: 'Software Engineer',
    company: 'Mobiloitte Technologies',
    points: [
      'Lead enterprise AI systems & agent development',
      'Architected multi-tenant CRM with WhatsApp AI',
      'Built RAG platform handling 1M+ documents',
    ],
    icon: Briefcase,
  },
  {
    period: '2021 — 2023',
    role: 'Software Engineer',
    company: 'Mobiloitte Technologies',
    points: [
      'Delivered Spring Boot microservices for ERP/CRM',
      'Integrated LLMs into customer-facing products',
      'Optimized APIs for 3× throughput',
    ],
    icon: Code2,
  },
  {
    period: '2020 — 2021',
    role: 'Junior Developer',
    company: 'Freelance',
    points: [
      'Built REST APIs & React dashboards for startups',
      'Deployed on AWS with Docker & CI/CD',
    ],
    icon: Cpu,
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
          <a href="#" className="btn-primary">
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
              <p className="mt-3 text-sm font-medium">B.Tech, Computer Science</p>
              <p className="text-xs text-soft">2016 — 2020</p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Cloud className="h-4 w-4 text-brand-500" /> Cloud
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['AWS', 'GCP', 'Docker', 'Kubernetes', 'Nginx'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Code2 className="h-4 w-4 text-brand-500" /> Core Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['System Design', 'Distributed Systems', 'LLM Integration', 'API Design', 'Performance'].map((c) => (
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
