import { useEffect, useRef, useState } from 'react';

/**
 * Custom animated cursor — a trailing ring that lags behind the pointer,
 * and a small dot at the exact pointer position. Hidden on touch devices.
 */
export default function AnimatedCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => ring.current?.classList.add('scale-75');
    const onUp = () => ring.current?.classList.remove('scale-75');

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      <div
        ref={ring}
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-brand-400/50 transition-transform duration-150 ease-out"
      />
      <div
        ref={dot}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-brand-400"
      />
    </div>
  );
}
