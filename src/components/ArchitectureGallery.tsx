import { architectures, type ArchitectureDiagram } from '../data';
import { useReveal } from '../hooks';

const kindStyles: Record<string, { pill: string; dot: string }> = {
  in:    { pill: 'bg-brand-500/10 border-brand-400/50 text-brand-400',    dot: 'bg-brand-400'  },
  core:  { pill: 'bg-accent-500/10 border-accent-400/50 text-accent-400', dot: 'bg-accent-400' },
  store: { pill: 'bg-warn-500/10  border-warn-400/50  text-warn-400',     dot: 'bg-warn-400'   },
  out:   { pill: 'border-soft text-soft',                                  dot: 'bg-[var(--text-soft)]' },
};

const kindLabels: Record<string, string> = {
  in: 'Input', core: 'Process', store: 'Store', out: 'Output',
};

const Arrow = () => (
  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="shrink-0 text-brand-400/50">
    <path d="M1 5h15M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WrapArrow = () => (
  <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="mx-auto text-brand-400/40">
    <path d="M12 1v16a4 4 0 0 1-4 4H3M3 21l4-4M3 21l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
  const half = Math.ceil(nodes.length / 2);
  const topRow = nodes.slice(0, half);
  const botRow = nodes.slice(half);
  const usedKinds = [...new Set(nodes.map((n) => n.kind))];

  return (
    <div className="card group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40">
      {/* Header */}
      <div className="border-b border-soft p-5 pb-4">
        <h3 className="font-display text-base font-semibold">{diagram.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-soft">{diagram.description}</p>
      </div>

      {/* Diagram */}
      <div className="flex flex-1 flex-col justify-center gap-0 px-4 py-5">
        <NodeRow nodes={topRow} />
        {botRow.length > 0 && (
          <>
            <WrapArrow />
            <NodeRow nodes={botRow} reverse />
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-soft px-5 py-3">
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

function NodeRow({
  nodes,
  reverse = false,
}: {
  nodes: ArchitectureDiagram['nodes'];
  reverse?: boolean;
}) {
  const items = reverse ? [...nodes].reverse() : nodes;
  return (
    <div className="flex w-full items-stretch gap-1.5">
      {items.map((n, i) => (
        <div key={i} className="flex flex-1 items-center gap-1.5">
          <div
            className={`flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition-transform duration-300 group-hover:scale-[1.02] ${kindStyles[n.kind].pill}`}
          >
            <p className="text-[11px] font-semibold leading-tight">{n.label}</p>
            {n.sub && (
              <p className="mt-0.5 text-[9px] leading-tight opacity-55">{n.sub}</p>
            )}
          </div>
          {i < items.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
}
