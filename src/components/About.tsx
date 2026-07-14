import { Brain, Cloud, Code2, Cpu, GitBranch, Gauge, Layers, Network } from 'lucide-react';
import DeveloperIntroVideo from './DeveloperIntroVideo';
import { useReveal } from '../hooks';

const focus = [
  { icon: Brain, label: 'AI' },
  { icon: Code2, label: 'Backend' },
  { icon: Cloud, label: 'Cloud' },
  { icon: Layers, label: 'APIs' },
  { icon: Network, label: 'Distributed Systems' },
  { icon: Gauge, label: 'Performance' },
  { icon: GitBranch, label: 'System Design' },
  { icon: Cpu, label: 'Architecture' },
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
              Engineer building <span className="gradient-text">production AI systems</span>, not just CRUD apps.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-soft">
              <p>
                I build AI-powered enterprise applications focused on automation, Retrieval-Augmented
                Generation (RAG), multi-agent systems, CRM platforms, and cloud-native backend
                architectures.
              </p>
              <p>
                I enjoy designing scalable APIs, integrating LLMs, optimizing system performance, and
                solving complex engineering problems — from vector search latency to multi-tenant data
                isolation to agent orchestration with human-in-the-loop safety.
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
