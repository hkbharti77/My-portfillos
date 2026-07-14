import { useEffect, useState } from 'react';

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink-950 transition-opacity duration-500 ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-white">
          HB
        </span>
        <span className="font-display text-lg font-semibold text-ink-100">Himanshu Bharti</span>
      </div>
      <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-ink-700">
        <div className="h-full w-1/3 animate-[shimmer_1.2s_linear_infinite] bg-gradient-to-r from-transparent via-brand-400 to-transparent" style={{ backgroundSize: '200% 100%' }} />
      </div>
      <p className="mt-4 font-mono text-xs text-ink-400">Initializing portfolio...</p>
    </div>
  );
}
