import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import { useTypingEffect } from '../hooks';

const phrases = [
  'building custom software, AI CRM & ERP platforms...',
  'setting up Meta Cloud WhatsApp AI & support systems...',
  'architecting WhatsApp broadcasting campaign engines...',
  'integrating Instagram Graph API & automated DMs...',
  'enabling businesses to become official Meta Tech Providers...',
  'designing enterprise RAG & multi-agent AI platforms...',
];

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const typed = useTypingEffect(phrases);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden" aria-label="Himanshu Bharti — Software Engineer Hero Section">
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[320px] w-[320px] rounded-full bg-accent-500/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-soft bg-soft/60 px-3.5 py-1.5 text-xs font-medium text-soft backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Available for Custom Software, AI & Meta Tech Projects
          </div>

          <h1
            className="animate-fade-up mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            Himanshu Bharti
          </h1>
          <p
            className="animate-fade-up mt-3 font-display text-xl font-medium text-soft sm:text-2xl"
            style={{ animationDelay: '160ms' }}
          >
            Software Engineer <span className="text-brand-500">| Custom Software, AI CRM/ERP & Meta Tech</span>
          </p>

          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-soft"
            style={{ animationDelay: '240ms' }}
          >
            Engineering full-stack custom software, AI-powered CRM & ERP platforms, RAG systems, and complete Meta Ecosystem solutions (WhatsApp Cloud API, Bulk Broadcasting, Instagram Automation, Facebook Login & Meta Tech Provider status).
          </p>

          {/* Terminal typing effect */}
          <div
            className="animate-fade-up mt-7 w-full max-w-xl overflow-hidden rounded-xl border border-soft bg-ink-950/90 p-4 font-mono text-sm shadow-xl backdrop-blur"
            style={{ animationDelay: '320ms' }}
          >
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-ink-400">himanshu@portfolio: ~</span>
            </div>
            <div className="flex items-center gap-2 text-brand-300">
              <Terminal className="h-4 w-4 shrink-0 text-ink-400" />
              <span className="text-ink-200">{typed}</span>
              <span className="h-4 w-1.5 animate-blink bg-brand-400" />
            </div>
          </div>

          <div
            className="animate-fade-up mt-7 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '400ms' }}
          >
            <button onClick={() => onNavigate('projects')} className="btn-primary">
              View All Projects <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate('meta-services')} className="btn-ghost">
              Meta & WhatsApp Solutions
            </button>
            <button onClick={() => onNavigate('contact')} className="btn-ghost">
              <Sparkles className="h-4 w-4" /> Hire Me
            </button>
          </div>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-soft"
            style={{ animationDelay: '480ms' }}
          >
            {['Custom Software', 'AI CRM & ERP', 'Meta WhatsApp API', 'Broadcasting', 'Instagram API', 'Meta Tech Provider', 'FastAPI', 'Spring Boot', 'React'].map((t) => (
              <span key={t} className="transition-colors hover:text-brand-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('about')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-soft transition-colors hover:text-brand-500 sm:flex"
        aria-label="Scroll down"
      >
        <span className="text-[11px] uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-soft p-1">
          <span className="h-2 w-0.5 animate-bounce rounded-full bg-current" />
        </span>
      </button>
    </section>
  );
}
