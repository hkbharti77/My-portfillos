import { architectures, type ArchitectureDiagram } from '../data';
import { useReveal } from '../hooks';

const kindStyles: Record<string, string> = {
  in: 'bg-brand-500/15 border-brand-400/40 text-brand-500',
  core: 'bg-accent-500/15 border-accent-400/40 text-accent-500',
  store: 'bg-warn-500/15 border-warn-400/40 text-warn-500',
  out: 'bg-ink-400/15 border-ink-300/40 text-soft',
};

export default function ArchitectureGallery() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="architecture" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-500">05 — Architecture</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          How the systems fit together
        </h2>
        <p className="mt-3 max-w-xl text-sm text-soft">
          Architecture diagrams for the platforms I build — because how components connect matters as much as what they do.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {architectures.map((d) => (
            <DiagramCard key={d.id} diagram={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiagramCard({ diagram }: { diagram: ArchitectureDiagram }) {
  const positions = layoutNodes(diagram.nodes.length);

  return (
    <div className="card group overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40">
      <h3 className="font-display text-base font-semibold">{diagram.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-soft">{diagram.description}</p>

      <div className="relative mt-4 h-44 overflow-hidden rounded-lg border border-soft bg-soft/30">
        <svg className="absolute inset-0 h-full w-full">
          {diagram.edges.map(([a, b], i) => {
            const pa = positions[a];
            const pb = positions[b];
            return (
              <line
                key={i}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                className="stroke-brand-400/30 transition-all duration-300 group-hover:stroke-brand-400/60"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            );
          })}
        </svg>
        {diagram.nodes.map((n, i) => {
          const p = positions[i];
          return (
            <div
              key={i}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-1 text-center transition-transform duration-300 group-hover:scale-105 ${kindStyles[n.kind]}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <p className="text-[10px] font-semibold leading-tight">{n.label}</p>
              {n.sub && <p className="text-[8px] leading-tight opacity-70">{n.sub}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function layoutNodes(count: number): { x: number; y: number }[] {
  // Horizontal flow layout with slight vertical variation
  const pad = 14;
  const span = 100 - pad * 2;
  return Array.from({ length: count }, (_, i) => {
    const x = pad + (count === 1 ? span / 2 : (i / (count - 1)) * span);
    const y = 50 + (i % 2 === 0 ? -18 : 18);
    return { x, y };
  });
}
