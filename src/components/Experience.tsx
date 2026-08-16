import { Building2, Check, MapPin, Sparkles } from 'lucide-react';
import { stats } from '../data';
import { useCountUp, useReveal } from '../hooks';

const responsibilities = [
  '5-Channel Conversational AI Bots (FastAPI & Hybrid RAG)',
  'Omnichannel Live Agent Handoff (Rich Media & Text)',
  'Slack Bot Automated Lead & Ticketing Engine (< 3s Latency)',
  'Real-Time AI Voice Calling & IVR (Deepgram + ElevenLabs)',
  'Outbound Voice & Campaign Broadcast Engine (10k+ Volume)',
  'Meta WhatsApp Cloud API & Embedded Signup Integration',
  'Tenant-Isolated PostgreSQL, MongoDB & Redis Caching',
  'Docker Microservices Architecture (15k+ Daily Req, 99.5% Uptime)',
];

export default function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="experience"
      className="section-pad relative py-24 sm:py-28"
      aria-label="Work Experience — Mobiloitte Technologies (New Delhi, India)"
      itemScope
      itemType="https://schema.org/Occupation"
    >
      <meta itemProp="name" content="Software Development Engineer (Full Stack & AI)" />
      <meta itemProp="occupationLocation" content="New Delhi, India" />

      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">02 — Experience</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Current role & impact
            </h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active SDE (Full Stack & AI)
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div
            className="card relative overflow-hidden p-6 lg:col-span-3 transition-all duration-300 hover:border-brand-500/30 shadow-md"
            itemScope
            itemProp="hiringOrganization"
            itemType="https://schema.org/Organization"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-soft bg-soft/60 shadow-sm">
                <Building2 className="h-6 w-6 text-brand-500" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">Software Development Engineer (Full-Stack & AI)</h3>
                  <span className="chip text-accent-500 font-mono text-[11px]">May 2025 — Present</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-500">
                  <span itemProp="name">Mobiloitte Technologies</span>
                  <span className="text-soft font-normal">·</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-soft" itemProp="address">
                    <MapPin className="h-3 w-3 text-brand-500" /> New Delhi, India
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
              {responsibilities.map((r) => (
                <div key={r} className="flex items-start gap-2.5 text-sm text-soft leading-snug">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500/15">
                    <Check className="h-3 w-3 text-accent-500" />
                  </span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-4 flex flex-wrap items-center gap-2 text-xs text-soft">
              <span className="font-mono text-brand-500 font-semibold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Core Tech:
              </span>
              <span>FastAPI · Hybrid RAG · Deepgram & ElevenLabs · WhatsApp Cloud API · Docker · Redis · PostgreSQL</span>
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
    <div className="card flex flex-col items-start justify-center p-5 hover:border-brand-500/30 transition-colors">
      <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        <span ref={ref}>{v}</span>
        <span className="text-brand-500">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-soft">{label}</p>
    </div>
  );
}
