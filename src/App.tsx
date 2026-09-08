import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MetaServices from './components/MetaServices';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import ArchitectureGallery from './components/ArchitectureGallery';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import AnimatedCursor from './components/AnimatedCursor';
import Loader from './components/Loader';
import { Analytics } from '@vercel/analytics/react';
import { useActiveSection } from './hooks';
import { navSections } from './data';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const active = useActiveSection(navSections);
  const location = useLocation();

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Loader />
      <AnimatedCursor />
      <Navbar active={active} onNavigate={navigate} onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={navigate} />

      <main className="relative">
        <Hero onNavigate={navigate} />
        <About />
        <MetaServices />
        <Experience />
        <Projects />
        <TechStack />
        <ArchitectureGallery />
        <Certifications />
        <Resume />
        <Contact />
      </main>

      <Analytics />
    </>
  );
}
