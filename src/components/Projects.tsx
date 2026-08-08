import { useState } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { projects, type Project } from '../data';
import { useReveal } from '../hooks';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section-pad relative py-24 sm:py-28" aria-label="Featured Projects — Enterprise AI and Backend Systems">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">03 — Featured Work</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Enterprise AI & backend systems
            </h2>
          </div>
          <p className="max-w-md text-sm text-soft">
            A selection of production AI systems, RAG platforms, and enterprise backends — with architecture, challenges, and measurable results.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const Icon = project.icon;
  return (
    <button
      onClick={onOpen}
      className="card group relative overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-[0_20px_60px_-20px] hover:shadow-brand-500/30"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${project.accent} blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="relative flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-soft bg-soft/60">
          <Icon className="h-6 w-6 text-brand-500" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
      </div>
      <h3 className="relative mt-5 font-display text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-soft">{project.tagline}</p>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md bg-soft px-2 py-0.5 text-[11px] font-medium text-soft">
            {t}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="rounded-md bg-soft px-2 py-0.5 text-[11px] font-medium text-soft">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="card relative max-h-[92vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-soft text-soft transition-colors hover:text-brand-500"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-soft bg-soft/60">
            <Icon className="h-7 w-7 text-brand-500" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-soft">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-soft">{project.description}</p>

        <div className="mt-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-brand-500">Architecture</h4>
          <ul className="mt-3 space-y-2">
            {project.architecture.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-sm text-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-500">Tech Stack</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-500">Results</h4>
            <p className="mt-3 text-sm leading-relaxed text-soft">{project.results}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-soft bg-soft/50 p-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-warn-500">Challenges</h4>
          <p className="mt-2 text-sm leading-relaxed text-soft">{project.challenges}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://github.com/hkbharti77`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.title} on GitHub`}
            className="btn-ghost"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
