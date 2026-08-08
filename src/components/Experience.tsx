import { Building2, Check } from 'lucide-react';
import { stats } from '../data';
import { useCountUp, useReveal } from '../hooks';

const responsibilities = [
  'Omnichannel AI Bots (WhatsApp, Insta, Slack)',
  'SaaS Human-in-the-Loop (HITL) Handoff',
  'Multi-Tenant RAG & Semantic Chunking',
  'JWT RBAC & Administrative Dashboards',
  'Spring Boot Microservices & MySQL ACID',
  'API Throughput & Query Indexing',
];

export default function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="experience" className="section-pad relative py-24 sm:py-28" aria-label="Work Experience — Mobiloitte Technologies">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-500">02 — Experience</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Current role
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="card relative overflow-hidden p-6 lg:col-span-3">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-soft bg-soft/60">
                <Building2 className="h-6 w-6 text-brand-500" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-semibold">Software Development Engineer (Full-Stack & AI)</h3>
                  <span className="chip text-accent-500">May 2025 — Present</span>
                </div>
                <p className="mt-1 text-sm font-medium text-brand-500">Mobiloitte Technologies · New Delhi, India</p>
              </div>
            </div>

            <div className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
              {responsibilities.map((r) => (
                <div key={r} className="flex items-center gap-2.5 text-sm text-soft">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500/15">
                    <Check className="h-3 w-3 text-accent-500" />
                  </span>
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="card flex flex-col items-start justify-center p-5">
      <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        <span ref={ref}>{v}</span>
        <span className="text-brand-500">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-soft">{label}</p>
    </div>
  );
}
