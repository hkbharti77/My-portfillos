/**
 * HBLogo — Himanshu Bharti  •  Premium SVG Brand Mark  v3
 *
 * Design language:
 *  ─ Deep dark rounded-square base (feels like a real app icon)
 *  ─ Vivid cyan → violet → emerald multi-stop gradient overlay (top-left → bottom-right)
 *  ─ Inner glass "shine" layer for 3-D depth
 *  ─ Outer subtle ring border
 *  ─ "HB" rendered with proper bezier letterforms — not rectangles, not strokes
 *    H : two vertical pillars + a precision mid-crossbar
 *    B : a single closed filled path with two D-shaped bumps
 *  ─ Three gradient "pulse arcs" behind the letters (AI / signal motif)
 *  ─ Tiny orbit dots top-right and bottom-left (node / network accent)
 */

interface HBLogoProps {
  size?: number;
  className?: string;
}

export default function HBLogo({ size = 40, className = '' }: HBLogoProps) {
  const p = 'hbv3'; // prefix for all IDs

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Himanshu Bharti logo"
      role="img"
      className={className}
    >
      <defs>
        {/* ── Gradients ──────────────────────────────────── */}

        {/* Base card: dark ink */}
        <linearGradient id={`${p}-base`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#0d1117" />
          <stop offset="100%" stopColor="#0b1622" />
        </linearGradient>

        {/* Vivid overlay: cyan → indigo → emerald */}
        <linearGradient id={`${p}-vivid`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#06b6d4" />   {/* cyan-500   */}
          <stop offset="48%"  stopColor="#6366f1" />   {/* indigo-500 */}
          <stop offset="100%" stopColor="#10b981" />   {/* emerald-500*/}
        </linearGradient>

        {/* Letters: bright white with very slight cyan tint */}
        <linearGradient id={`${p}-letters`} x1="9" y1="14" x2="46" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cffafe" />
        </linearGradient>

        {/* Arcs: semi-transparent vivid */}
        <linearGradient id={`${p}-arc`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
        </linearGradient>

        {/* Glass shine on top half */}
        <linearGradient id={`${p}-shine`} x1="28" y1="3" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* ── Filters ────────────────────────────────────── */}

        {/* Outer glow on the card */}
        <filter id={`${p}-cardglow`} x="-18%" y="-18%" width="136%" height="136%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#6366f1" floodOpacity="0.3" />
        </filter>

        {/* Soft glow behind the HB letters */}
        <filter id={`${p}-letterglow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip to card shape */}
        <clipPath id={`${p}-clip`}>
          <rect x="3" y="3" width="50" height="50" rx="14" />
        </clipPath>
      </defs>

      {/* ═══════════════════════════════════════════════
          LAYER 1 — Card base (dark)
      ═══════════════════════════════════════════════ */}
      <rect
        x="3" y="3" width="50" height="50" rx="14"
        fill={`url(#${p}-base)`}
        filter={`url(#${p}-cardglow)`}
      />

      {/* ═══════════════════════════════════════════════
          LAYER 2 — Vivid gradient tint (clipped)
      ═══════════════════════════════════════════════ */}
      <rect
        x="3" y="3" width="50" height="50" rx="14"
        fill={`url(#${p}-vivid)`}
        opacity="0.22"
        clipPath={`url(#${p}-clip)`}
      />

      {/* ═══════════════════════════════════════════════
          LAYER 3 — Decorative arcs (AI signal / orbit)
          Three concentric arcs in bottom-right quadrant
      ═══════════════════════════════════════════════ */}
      <g clipPath={`url(#${p}-clip)`} opacity="1">
        {/* Arc 1 — innermost */}
        <path
          d="M 44 28 A 16 16 0 0 1 28 44"
          stroke={`url(#${p}-arc)`}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Arc 2 */}
        <path
          d="M 50 26 A 24 24 0 0 1 26 50"
          stroke={`url(#${p}-arc)`}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        {/* Arc 3 — outermost, faint */}
        <path
          d="M 54 22 A 32 32 0 0 1 22 54"
          stroke={`url(#${p}-arc)`}
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
        />
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 4 — HB Letterforms (filled paths)

          ViewBox: 56×56  |  Letter area: x 9–46, y 14–42
          Total width: 37px  |  Height: 28px
          H occupies ~x 9–24  (15px wide)
          gap: 3px
          B occupies ~x 27–46 (19px wide)

          ── H ──
          Built from 3 filled rounded rects via path:
            Left pillar:  x=9,  w=4.5, h=28, ry=2
            Right pillar: x=20, w=4.5, h=28, ry=2
            Crossbar:     x=9,  y=25,  w=15.5 h=4.5 ry=2

          ── B ──
          Single closed path:
            Spine left edge at x=27, width≈4.5
            Top bump: semicircle, radius ~6, center (27, 21)
            Bottom bump: semicircle, radius ~7, center (27, 34)
      ═══════════════════════════════════════════════ */}
      <g filter={`url(#${p}-letterglow)`}>

        {/* ── H : left pillar ── */}
        <rect x="9"  y="14" width="4.5" height="28" rx="2" fill={`url(#${p}-letters)`} />

        {/* ── H : right pillar ── */}
        <rect x="20" y="14" width="4.5" height="28" rx="2" fill={`url(#${p}-letters)`} />

        {/* ── H : crossbar (vertically centred in the cap-height) ── */}
        <rect x="9"  y="25.75" width="15.5" height="4.5" rx="2" fill={`url(#${p}-letters)`} />

        {/* ── B : full shape as a single filled path ──
            Strategy: draw the outer silhouette, then cut nothing —
            just fill. The "counters" (white holes inside B bumps)
            don't exist on a dark background, so we draw positive shapes.

            Spine rect + two D-bumps as separate overlapping shapes
            so the fill merges perfectly.
        ── */}

        {/* B spine */}
        <rect x="27" y="14" width="4.5" height="28" rx="2" fill={`url(#${p}-letters)`} />

        {/* B top D-bump
            A D is a rect on the left + semicircle cap on the right.
            rect: x=27, y=14, w=4 (covered by spine), h=13
            semicircle: cx=31, cy=20.5, r=6.5 → but clamp top/bottom
            Use path: M 29 14  L 31 14  Q 38 14 38 20.5  Q 38 27 31 27  L 29 27 Z
        */}
        <path
          d="M 29 14.5 L 32 14.5 Q 39.5 14.5 39.5 21 Q 39.5 27.5 32 27.5 L 29 27.5 Z"
          fill={`url(#${p}-letters)`}
        />

        {/* B bottom D-bump — slightly taller/wider for proper B proportions
            M 29 28.5 L 32.5 28.5 Q 41 28.5 41 35.5 Q 41 42 32.5 42 L 29 42 Z
        */}
        <path
          d="M 29 28.5 L 33 28.5 Q 42 28.5 42 35.25 Q 42 42 33 42 L 29 42 Z"
          fill={`url(#${p}-letters)`}
        />

        {/* Small separator line between B bumps (a thin dark slice
            so the two bumps read as separate counters at glance) */}
        <rect x="29" y="27" width="10" height="1.5" fill={`url(#${p}-base)`} opacity="0.8" />

      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 5 — Glass shine (top half)
      ═══════════════════════════════════════════════ */}
      <rect
        x="3" y="3" width="50" height="26" rx="14"
        fill={`url(#${p}-shine)`}
        clipPath={`url(#${p}-clip)`}
      />

      {/* ═══════════════════════════════════════════════
          LAYER 6 — Accent nodes
          Two small glowing dots: top-right + bottom-left
          They suggest network nodes / AI neurons
      ═══════════════════════════════════════════════ */}
      {/* Top-right node */}
      <circle cx="46" cy="10" r="2.2" fill="#22d3ee" opacity="0.9" />
      <circle cx="46" cy="10" r="4"   fill="#22d3ee" opacity="0.15" />
      {/* Bottom-left node */}
      <circle cx="10" cy="46" r="1.8" fill="#10b981" opacity="0.8" />
      <circle cx="10" cy="46" r="3.5" fill="#10b981" opacity="0.12" />

      {/* ═══════════════════════════════════════════════
          LAYER 7 — Outer card border (crisp edge)
      ═══════════════════════════════════════════════ */}
      <rect
        x="3" y="3" width="50" height="50" rx="14"
        fill="none"
        stroke={`url(#${p}-vivid)`}
        strokeWidth="1.2"
        opacity="0.5"
      />
    </svg>
  );
}
