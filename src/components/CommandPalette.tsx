import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { navSections } from '../data';

const labels: Record<string, string> = {
  home: 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  tech: 'Tech Stack',
  architecture: 'Architecture',
  blogs: 'Blogs',
  resume: 'Resume',
  contact: 'Contact',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function CommandPalette({ open, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = navSections.filter((s) =>
    labels[s].toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[idx]) {
        onNavigate(results[idx]);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, idx, onClose, onNavigate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center bg-ink-950/70 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-lg overflow-hidden p-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-soft px-4 py-3">
          <Search className="h-4 w-4 text-soft" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIdx(0);
            }}
            placeholder="Search portfolio..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-soft"
          />
          <kbd className="rounded bg-soft px-1.5 py-0.5 font-mono text-[10px] text-soft">ESC</kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-soft">No results.</p>
          )}
          {results.map((s, i) => (
            <button
              key={s}
              onMouseEnter={() => setIdx(i)}
              onClick={() => {
                onNavigate(s);
                onClose();
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                i === idx ? 'bg-brand-500/10 text-brand-500' : 'text-soft hover:bg-soft'
              }`}
            >
              {labels[s]}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
