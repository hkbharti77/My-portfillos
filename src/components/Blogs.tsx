import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock, X, Calendar } from 'lucide-react';
import { blogs, type BlogPost } from '../data';
import { useReveal } from '../hooks';

export default function Blogs() {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

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
            <button
              key={b.title}
              onClick={() => setActive(b)}
              className="card group flex flex-col p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
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
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="card relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-soft p-6 pb-5">
              <div>
                <span className="chip text-brand-500">{active.tag}</span>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{active.title}</h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-soft">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {active.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {active.readTime} read
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-full p-2 text-soft transition-colors hover:bg-soft hover:text-brand-500"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="space-y-4">
                {active.content.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-soft first:text-base first:font-medium first:text-[var(--text)]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
