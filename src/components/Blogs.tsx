import { ArrowUpRight, Clock } from 'lucide-react';
import { blogs } from '../data';
import { useReveal } from '../hooks';

export default function Blogs() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="blogs" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-500">06 — Writing</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Technical notes
        </h2>
        <p className="mt-3 max-w-xl text-sm text-soft">
            Deep dives on RAG, vector search, agent architecture, and backend performance.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((b, i) => (
            <a
              key={b.title}
              href="#"
              className="card group flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="chip text-brand-500">{b.tag}</span>
                <ArrowUpRight className="h-4 w-4 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug">{b.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-soft">{b.excerpt}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-soft">
                <Clock className="h-3 w-3" /> {b.readTime} read
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
