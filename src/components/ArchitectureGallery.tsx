import { architectures, type ArchitectureDiagram } from '../data';
import { useReveal } from '../hooks';

const kindStyles: Record<string, { pill: string; dot: string }> = {
  in:   { pill: 'bg-brand-500/10 border-brand-400/50 text-brand-400',   dot: 'bg-brand-400'  },
  core: { pill: 'bg-accent-500/10 border-accent-400/50 text-accent-400', dot: 'bg-accent-400' },
  store:{ pill: 'bg-warn-500/10  border-warn-400/50  text-warn-400',    dot: 'bg-warn-400'   },
  out:  { pill: 'bg-soft border-soft text-soft',                         dot: 'bg-[var(--text-soft)]' },
};

const kindLabels: Record<string, string> = {
  in: 'Input', core: 'Process', store: 'Store', out: 'Output',
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
          Architecture diagrams for the platforms I build — because how components connect
          matters as much as what they do.
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
  const nodes = diagram.nodes;

  // Split into two rows: first half top, second half bottom
  const half = Math.ceil(nodes.length / 2);
  const topRow = nodes.slice(0, half);
  const botRow = nodes.slice(half);

  // Legend: unique kinds in this diagram
  const usedKinds = [...new Set(nodes.map((n) => n.kind))];

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40">
      {/* Header */}
      <div className="border-b border-soft p-5 pb-4">
        <h3 className="font-display text-base font-semibold">{diagram.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-soft">{diagram.description}</p>
      </div>

      {/* Diagram area */}
      <div className="flex flex-1 flex-col justify-center gap-4 bg-soft/20 px-5 py-6">
        <NodeRow nodes={topRow} />
        {botRow.length > 0 && <NodeRow nodes={botRow} />}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-soft px-5 py-3">
        {usedKinds.map((k) => (
          <span key={k} className="flex items-center gap-1.5 text-[10px] text-soft">
            <span className={`h-1.5 w-1.5 rounded-full ${kindStyles[k].dot}`} />
            {kindLabels[k]}
          </span>
        ))}
      </div>
    </div>
  );
}

function NodeRow({ nodes }: { nodes: ArchitectureDiagram['nodes'] }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`rounded-lg border px-2.5 py-1.5 text-center transition-transform duration-300 group-hover:scale-[1.03] ${kindStyles[n.kind].pill}`}
          >
            <p className="whitespace-nowrap text-[11px] font-semibold leading-tight">{n.label}</p>
            {n.sub && (
              <p className="mt-0.5 whitespace-nowrap text-[9px] leading-tight opacity-60">{n.sub}</p>
            )}
          </div>
          {i < nodes.length - 1 && (
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              className="shrink-0 text-brand-400/40 transition-colors duration-300 group-hover:text-brand-400/70"
            >
              <path
                d="M1 6h13M11 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
