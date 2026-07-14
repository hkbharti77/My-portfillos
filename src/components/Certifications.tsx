import { Award, GitFork, Star, Users } from 'lucide-react';
import { certifications } from '../data';
import { useReveal } from '../hooks';

const githubStats = [
  { icon: Star, label: 'Stars', value: '340+' },
  { icon: GitFork, label: 'Forks', value: '120+' },
  { icon: Users, label: 'Followers', value: '580+' },
];

const topRepos = [
  { name: 'enterprise-rag', desc: 'Production RAG platform with FAISS + reranker', lang: 'Python', stars: 142 },
  { name: 'multi-agent-orchestrator', desc: 'Planner/executor agent framework with HITL', lang: 'Python', stars: 98 },
  { name: 'spring-crm-core', desc: 'Modular Spring Boot CRM foundation', lang: 'Java', stars: 64 },
  { name: 'whatsapp-ai-bot', desc: 'WhatsApp Cloud API + LangChain agent', lang: 'Python', stars: 51 },
];

const langs = [
  { name: 'Python', pct: 42, color: 'bg-brand-500' },
  { name: 'Java', pct: 28, color: 'bg-accent-500' },
  { name: 'TypeScript', pct: 18, color: 'bg-warn-500' },
  { name: 'Other', pct: 12, color: 'bg-ink-400' },
];

export default function Certifications() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="certifications" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Certifications */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">07 — Certifications</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Credentials
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {certifications.map((c) => (
                <span key={c} className="chip group gap-2 py-2 hover:border-brand-400/60 hover:text-brand-500">
                  <Award className="h-4 w-4 text-warn-500" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub activity */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">08 — GitHub</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Open source activity
            </h2>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {githubStats.map((s) => (
                <div key={s.label} className="card flex flex-col items-center justify-center p-4">
                  <s.icon className="h-5 w-5 text-brand-500" />
                  <p className="mt-2 font-display text-xl font-bold">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-wide text-soft">{s.label}</p>
                </div>
              ))}
            </div>

            {/* language bar */}
            <div className="card mt-3 p-4">
              <div className="flex h-2 overflow-hidden rounded-full">
                {langs.map((l) => (
                  <div key={l.name} className={l.color} style={{ width: `${l.pct}%` }} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {langs.map((l) => (
                  <span key={l.name} className="flex items-center gap-1.5 text-xs text-soft">
                    <span className={`h-2 w-2 rounded-full ${l.color}`} /> {l.name} {l.pct}%
                  </span>
                ))}
              </div>
            </div>

            {/* top repos */}
            <div className="mt-3 space-y-2">
              {topRepos.map((r) => (
                <div key={r.name} className="card flex items-center justify-between p-3.5 transition-colors hover:border-brand-400/40">
                  <div>
                    <p className="font-mono text-sm font-medium text-brand-500">{r.name}</p>
                    <p className="text-xs text-soft">{r.desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-soft">
                    <span className="chip py-0.5">{r.lang}</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warn-500" /> {r.stars}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* contribution graph */}
            <ContributionGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const cells: number[] = [];
  // deterministic pseudo-random
  for (let i = 0; i < weeks * days; i++) {
    const v = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const n = Math.abs(v);
    cells.push(n > 0.85 ? 4 : n > 0.6 ? 3 : n > 0.35 ? 2 : n > 0.15 ? 1 : 0);
  }
  const levels = [
    'bg-ink-200/20',
    'bg-brand-500/30',
    'bg-brand-500/50',
    'bg-brand-500/70',
    'bg-brand-500',
  ];
  return (
    <div className="card mt-3 p-4">
      <p className="mb-3 text-xs font-medium text-soft">Contribution activity</p>
      <div className="flex gap-[3px] overflow-hidden">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, d) => {
              const v = cells[w * days + d];
              return <span key={d} className={`h-2.5 w-2.5 rounded-[2px] ${levels[v]}`} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
