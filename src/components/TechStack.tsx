import { techStack } from '../data';
import { useReveal } from '../hooks';

export default function TechStack() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="tech" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-500">04 — Tech Stack</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Tools across the full stack
        </h2>
        <p className="mt-3 max-w-xl text-sm text-soft">
          Categorized by layer — from languages and backend frameworks to AI infrastructure, datastores, and cloud deployment.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat, i) => (
            <div
              key={cat.name}
              className="card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                  {cat.name}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-soft bg-soft/50 px-2.5 py-1 text-xs font-medium text-soft transition-colors hover:border-brand-400/50 hover:text-brand-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
