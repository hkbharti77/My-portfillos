import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-soft text-soft transition-colors hover:text-brand-500"
      aria-label="Toggle theme"
    >
      <span className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </span>
    </button>
  );
}
