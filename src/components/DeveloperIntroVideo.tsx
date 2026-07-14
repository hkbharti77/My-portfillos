import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight CSS/SVG "cartoon" animation that plays as an introduction video
 * of the developer. Pure DOM animation — no external video file needed.
 * A cartoon avatar "types" at a desk while code symbols float up.
 */
export default function DeveloperIntroVideo() {
  const [playing, setPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenes = [
    'A young engineer opens a laptop and starts building...',
    'Lines of code compile into a server architecture...',
    'AI agents wake up and start talking to each other...',
    'A cloud platform deploys across the world. Hi, I\'m Himanshu.',
  ];

  useEffect(() => {
    if (!playing) return;
    setScene(0);
    const cycle = () => {
      setScene((s) => {
        if (s >= scenes.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    };
    timer.current = setInterval(cycle, 2600);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const replay = () => {
    setScene(0);
    setPlaying(true);
  };

  return (
    <div className="card group relative aspect-video w-full overflow-hidden">
      {/* gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* floating code symbols */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {['{ }', '< />', '()', '[]', '=>', '&&', '||', '#'].map((s, i) => (
          <span
            key={i}
            className="absolute font-mono text-sm text-brand-400/40"
            style={{
              left: `${8 + i * 11}%`,
              top: `${20 + (i % 3) * 22}%`,
              animation: `float ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* cartoon developer scene */}
      <div className="relative flex h-full items-end justify-center pb-10">
        <svg viewBox="0 0 400 220" className="h-full w-full max-w-md">
          {/* desk */}
          <rect x="60" y="160" width="280" height="10" rx="3" className="fill-ink-300/40" />
          <rect x="70" y="170" width="6" height="34" className="fill-ink-300/30" />
          <rect x="324" y="170" width="6" height="34" className="fill-ink-300/30" />

          {/* laptop */}
          <g style={{ transformOrigin: '200px 150px', animation: 'float 4s ease-in-out infinite' }}>
            <rect x="150" y="120" width="100" height="40" rx="4" className="fill-ink-400/50" />
            <rect x="156" y="126" width="88" height="28" rx="2" className="fill-brand-500/30" />
            <rect x="148" y="158" width="104" height="6" rx="3" className="fill-ink-400/60" />
            {/* screen code lines */}
            <rect x="162" y="132" width="50" height="3" rx="1" className="fill-accent-400/70" />
            <rect x="162" y="139" width="36" height="3" rx="1" className="fill-brand-300/70" />
            <rect x="162" y="146" width="60" height="3" rx="1" className="fill-ink-200/50" />
          </g>

          {/* developer avatar */}
          <g style={{ transformOrigin: '200px 120px', animation: 'float 3.5s ease-in-out infinite' }}>
            {/* chair */}
            <rect x="232" y="150" width="6" height="30" className="fill-ink-300/40" />
            {/* body */}
            <path
              d="M250 150 Q250 120 230 120 L210 120 Q200 120 200 130 L200 150 Z"
              className="fill-brand-500/60"
            />
            {/* head */}
            <circle cx="222" cy="104" r="16" className="fill-amber-500/70" />
            {/* hair */}
            <path d="M206 100 Q210 88 222 88 Q236 88 238 100 Q236 94 222 94 Q210 94 206 100 Z" className="fill-ink-700/80" />
            {/* eyes */}
            <circle cx="218" cy="104" r="1.6" className="fill-ink-900" />
            <circle cx="227" cy="104" r="1.6" className="fill-ink-900" />
            {/* smile */}
            <path d="M218 110 Q222 113 227 110" fill="none" className="stroke-ink-900" strokeWidth="1.2" strokeLinecap="round" />
            {/* arm to laptop */}
            <path d="M210 130 Q200 138 195 150" fill="none" className="stroke-amber-500/70" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* AI agents appearing in later scenes */}
          {scene >= 2 && (
            <g className="animate-fade-in">
              <circle cx="110" cy="80" r="10" className="fill-accent-500/60" />
              <circle cx="300" cy="70" r="10" className="fill-brand-400/60" />
              <line x1="110" y1="80" x2="300" y2="70" className="stroke-brand-400/40" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="110" y="84" textAnchor="middle" className="fill-white font-mono text-[7px]">A1</text>
              <text x="300" y="74" textAnchor="middle" className="fill-white font-mono text-[7px]">A2</text>
            </g>
          )}

          {/* cloud in final scene */}
          {scene >= 3 && (
            <g className="animate-fade-in">
              <ellipse cx="200" cy="40" rx="40" ry="16" className="fill-ink-200/30" />
              <ellipse cx="180" cy="36" rx="18" ry="10" className="fill-ink-200/40" />
              <ellipse cx="220" cy="36" rx="20" ry="11" className="fill-ink-200/40" />
            </g>
          )}
        </svg>
      </div>

      {/* caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4 pt-10">
        <div className="flex items-end justify-between gap-3">
          <p className="font-mono text-xs text-ink-200 sm:text-sm">
            <span className="text-brand-400">$</span> {scenes[scene]}
            {playing && <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-brand-400 align-middle" />}
          </p>
          {!playing && (
            <button
              onClick={replay}
              className="shrink-0 rounded-full border border-ink-400/40 px-3 py-1 text-[11px] text-ink-200 transition-colors hover:bg-ink-400/20"
            >
              Replay
            </button>
          )}
        </div>
      </div>

      {/* progress bar */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-ink-400/20">
        <div
          className="h-full bg-brand-400 transition-all duration-700"
          style={{ width: `${((scene + (playing ? 1 : 0)) / scenes.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
