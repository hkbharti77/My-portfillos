import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Animated particle network canvas — particles drift and connect with lines
 * when close, forming an "AI network" feel. Pointer attracts nearby nodes.
 */
export default function ParticleNetwork({ density = 0.00009 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };

    const isDark = () => document.documentElement.classList.contains('dark');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(90, Math.floor(width * height * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      const dark = isDark();
      const particle = dark ? 'rgba(34, 211, 238, 0.55)' : 'rgba(8, 145, 178, 0.5)';
      const lineBase = dark ? '34, 211, 238' : '8, 145, 178';
      const accentBase = dark ? '52, 211, 153' : '5, 150, 105';
      ctx.clearRect(0, 0, width, height);

      const maxDist = 130;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // pointer attraction
        const pdx = n.x - pointer.x;
        const pdy = n.y - pointer.y;
        const pd = Math.hypot(pdx, pdy);
        if (pd < 160) {
          n.x += (pdx / pd) * 0.6;
          n.y += (pdy / pd) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = particle;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.5;
            const nearPointer = pd < 160 || Math.hypot(m.x - pointer.x, m.y - pointer.y) < 160;
            ctx.strokeStyle = nearPointer
              ? `rgba(${accentBase}, ${alpha + 0.15})`
              : `rgba(${lineBase}, ${alpha})`;
            ctx.lineWidth = nearPointer ? 1.1 : 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
