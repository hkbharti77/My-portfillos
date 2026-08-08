import { Brain, Cloud, Code2, Network, MessageSquare, Send, Instagram, ShieldCheck, GraduationCap, Users } from 'lucide-react';
import DeveloperIntroVideo from './DeveloperIntroVideo';
import { useReveal } from '../hooks';

const focus = [
  { icon: Code2, label: 'Custom Software Dev' },
  { icon: Users, label: 'Enterprise AI CRM' },
  { icon: GraduationCap, label: 'University & Healthcare ERP' },
  { icon: MessageSquare, label: 'Meta Cloud WhatsApp' },
  { icon: Send, label: 'WhatsApp Broadcasting' },
  { icon: Instagram, label: 'Instagram Automation' },
  { icon: ShieldCheck, label: 'Meta Tech Provider' },
  { icon: Brain, label: 'RAG & AI Agents' },
  { icon: Cloud, label: 'Cloud Architecture' },
  { icon: Network, label: 'Distributed Systems' },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="section-pad relative py-24 sm:py-28" aria-label="About Himanshu Bharti — Software Engineer">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">01 — About</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Engineer building <span className="gradient-text">Custom Software, CRM/ERP & Meta AI Systems</span>.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-soft">
              <p>
                I specialize in building production custom software, enterprise CRM platforms, university & healthcare ERP systems, RAG vector search engines, and multi-agent AI systems.
              </p>
              <p>
                In addition to custom web and backend development, I provide end-to-end Meta Ecosystem solutions — including Meta Cloud WhatsApp API helpdesk setup, high-throughput bulk broadcasting campaign engines, Instagram comment-to-DM automation, Facebook Login OAuth, and helping agencies/SaaS platforms become official Meta Tech Providers.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {focus.map((f) => (
                <span key={f.label} className="chip group hover:border-brand-400/60 hover:text-brand-500">
                  <f.icon className="h-3.5 w-3.5 text-brand-500" />
                  {f.label}
                </span>
              ))}
            </div>

            {/* HR & Hiring Manager Quick Summary Card */}
            <div className="mt-8 rounded-2xl border border-brand-500/30 bg-brand-500/5 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase text-brand-400">
                  ⚡ HR & Recruiter Quick Info
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                  Available Immediately
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-semibold text-foreground">Target Roles:</p>
                  <p className="text-soft">Software Engineer, AI Architect, Meta Tech Lead</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location & Mode:</p>
                  <p className="text-soft">India • Remote / Hybrid / Global Freelance</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/Himanshu_Bharti_Resume.pdf"
                  download="Himanshu_Bharti_Resume.pdf"
                  className="btn-primary py-1.5 px-3.5 text-xs"
                >
                  Download Resume (PDF)
                </a>
                <a href="#contact" className="btn-ghost py-1.5 px-3.5 text-xs">
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          <div className="lg:pl-6">
            <DeveloperIntroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
