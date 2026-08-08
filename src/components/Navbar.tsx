import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoImg from '/logo.png';
import ThemeToggle from './ThemeToggle';

const labels: Record<string, string> = {
  home: 'Home',
  about: 'About',
  'meta-services': 'Meta Services',
  experience: 'Experience',
  projects: 'Projects',
  tech: 'Tech Stack',
  architecture: 'Architecture',
  blogs: 'Blogs',
  certifications: 'Certifications',
  resume: 'Resume',
  contact: 'Contact',
};

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  onOpenPalette?: () => void;
}

const headerNavItems = ['about', 'meta-services', 'experience', 'projects', 'resume', 'contact'];

export default function Navbar({ active, onNavigate }: Props) {
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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} className="group flex items-center gap-2.5" aria-label="Himanshu Bharti — Home">
          <img
            src={logoImg}
            alt="Himanshu Bharti logo"
            width={38}
            height={38}
            className="rounded-xl shadow-[0_0_16px_-2px_rgba(6,182,212,0.6)] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-display text-base font-semibold tracking-tight">
            Himanshu Bharti
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {headerNavItems.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className={`nav-link ${active === s ? 'text-brand-500' : ''}`}
            >
              {labels[s] || s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
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
            {headerNavItems.map((s) => (
              <button
                key={s}
                onClick={() => go(s)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  active === s ? 'bg-brand-500/10 text-brand-500' : 'text-soft hover:bg-soft'
                }`}
              >
                {labels[s] || s}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
