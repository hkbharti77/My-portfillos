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
    <section id="about" className="section-pad relative py-24 sm:py-28">
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
          </div>

          <div className="lg:pl-6">
            <DeveloperIntroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
