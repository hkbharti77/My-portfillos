import { Command, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navSections } from '../data';
import ThemeToggle from './ThemeToggle';

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
  active: string;
  onNavigate: (id: string) => void;
  onOpenPalette: () => void;
}

export default function Navbar({ active, onNavigate, onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)]' : 'py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => go('home')} className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-white shadow-[0_0_20px_-4px] shadow-brand-500/60">
            HB
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            Himanshu Bharti
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {navSections.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className={`nav-link ${active === s ? 'text-brand-500' : ''}`}
            >
              {labels[s]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-soft px-3 py-1.5 text-xs text-soft transition-colors hover:text-brand-500 sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded bg-soft px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-soft text-soft lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-4 mt-2 rounded-2xl p-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {navSections.map((s) => (
              <button
                key={s}
                onClick={() => go(s)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  active === s ? 'bg-brand-500/10 text-brand-500' : 'text-soft hover:bg-soft'
                }`}
              >
                {labels[s]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
