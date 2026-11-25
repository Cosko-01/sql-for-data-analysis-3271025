// Flat 2D toon parts for "How the Rich Borrow From Their Own Funeral": ink-outlined shapes, bean heads, stick limbs.
import React from 'react';
import {Easing, interpolate} from 'remotion';

export const INK = '#241726';
export const GOLD = '#f5c842';
export const W = 1080;
export const H = 1920;
export const HORIZON = 1380;

export const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
export const pop = (f: number, a: number, dur = 10) =>
  interpolate(f, [a, a + dur * 0.6, a + dur], [0, 1.18, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export type P = [number, number];
export const bez = (p0: P, c: P, p1: P, t: number): P => {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
};
export const bezPath = (p0: P, c: P, p1: P) => `M${p0[0]} ${p0[1]} Q${c[0]} ${c[1]} ${p1[0]} ${p1[1]}`;

export const Sky: React.FC<{top?: string; bottom?: string; ground?: string}> = ({top = '#5e93d9', bottom = '#cfe0f3', ground = '#86bb6e'}) => (
  <g>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#sky)" />
    <rect y={HORIZON} width={W} height={H - HORIZON} fill={ground} stroke={INK} strokeWidth={6} />
    <ellipse cx={180} cy={330} rx={150} ry={46} fill="#fff" opacity={0.9} />
    <ellipse cx={820} cy={520} rx={190} ry={52} fill="#fff" opacity={0.85} />
  </g>
);

export const House: React.FC<{x: number; w: number; h: number; color: string; roof?: string}> = ({x, w, h, color, roof = '#b5523b'}) => (
  <g stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <rect x={x} y={HORIZON - h} width={w} height={h} fill={color} />
    <path d={`M${x - 12} ${HORIZON - h} L${x + w / 2} ${HORIZON - h - w * 0.38} L${x + w + 12} ${HORIZON - h}Z`} fill={roof} />
    <rect x={x + w * 0.18} y={HORIZON - h * 0.7} width={w * 0.2} height={h * 0.22} fill="#f7e9b0" />
    <rect x={x + w * 0.62} y={HORIZON - h * 0.7} width={w * 0.2} height={h * 0.22} fill="#f7e9b0" />
    <rect x={x + w * 0.4} y={HORIZON - h * 0.36} width={w * 0.2} height={h * 0.36} fill="#6b4a3a" />
  </g>
);
export const Skyline: React.FC = () => (
  <g>
    <House x={20} w={190} h={230} color="#e8d2a6" />
    <House x={230} w={170} h={290} color="#d9a66c" roof="#8a4a3a" />
    <House x={790} w={160} h={260} color="#c9d6b0" />
    <House x={940} w={170} h={210} color="#e8c0a0" roof="#7a4a5a" />
  </g>
);

export const Coin: React.FC<{x: number; y: number; r?: number; s?: number; o?: number}> = ({x, y, r = 30, s = 1, o = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill={GOLD} stroke={INK} strokeWidth={6} />
    <circle r={r * 0.62} fill="none" stroke="#c98e1c" strokeWidth={5} />
  </g>
);

export const Pig: React.FC<{x: number; y: number; s?: number; glow?: number; crack?: number; split?: number; happy?: boolean}> = ({x, y, s = 1, glow = 0, crack = 0, split = 0, happy = true}) => {
  const half = (clip: string, dx: number, rot: number) => (
    <g clipPath={`url(#${clip})`} transform={`translate(${dx} ${Math.abs(dx) * 0.4}) rotate(${rot})`}>
      <PigBody happy={happy} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow > 0 && <circle cy={-100} r={190 + glow * 40} fill="#ffe27a" opacity={0.28 * glow} />}
      {glow > 0 && <circle cy={-100} r={140 + glow * 20} fill="#fff2b0" opacity={0.3 * glow} />}
      {split <= 0 ? <PigBody happy={happy} /> : (
        <g>
          <defs>
            <clipPath id="pl"><rect x={-300} y={-300} width={300} height={600} /></clipPath>
            <clipPath id="pr"><rect x={0} y={-300} width={300} height={600} /></clipPath>
          </defs>
          {half('pl', -split * 90, -split * 18)}
          {half('pr', split * 90, split * 18)}
        </g>
      )}
      {crack > 0 && split <= 0 && (
        <path d="M-10 -215 L10 -170 L-20 -140 L15 -100 L-15 -60 L8 -20" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={260} strokeDashoffset={260 * (1 - crack)} />
      )}
    </g>
  );
};
const PigBody: React.FC<{happy: boolean}> = ({happy}) => (
  <g stroke={INK} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-95 -190 L-120 -270 L-50 -225Z" fill="#e88aa0" />
    <path d="M95 -190 L120 -270 L50 -225Z" fill="#e88aa0" />
    <path d="M150 -110 q60 -30 40 -80 q-30 -20 -20 20" fill="none" />
    <rect x={-105} y={-70} width={44} height={70} rx={14} fill="#e88aa0" />
    <rect x={60} y={-70} width={44} height={70} rx={14} fill="#e88aa0" />
    <ellipse cx={0} cy={-120} rx={160} ry={115} fill="#f4a3b5" />
    <rect x={-48} y={-238} width={96} height={20} rx={10} fill="#5a2a3a" />
    <ellipse cx={-108} cy={-110} rx={54} ry={40} fill="#e88aa0" />
    <circle cx={-118} cy={-112} r={7} fill={INK} /><circle cx={-92} cy={-112} r={7} fill={INK} />
    <circle cx={-52} cy={-170} r={10} fill={INK} stroke="none" />
    {happy ? <path d="M-80 -78 q20 18 44 0" fill="none" /> : <path d="M-80 -70 q20 -12 44 0" fill="none" />}
    <path d="M30 -170 l44 20 l0 50 q-30 20 -50 -10Z" fill="#fff2b0" opacity={0.0} />
  </g>
);

export const Shield: React.FC<{x: number; y: number; s?: number; o?: number}> = ({x, y, s = 1, o = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <path d="M0 -70 L56 -48 L50 14 Q36 56 0 76 Q-36 56 -50 14 L-56 -48Z" fill="#4aa3df" />
    <path d="M0 -42 L26 -30 L22 8 Q14 30 0 40Z" fill="#bfe6ff" stroke="none" />
  </g>
);

type Face = 'smile' | 'flat' | 'shock' | 'worry' | 'smirk' | 'happy';
export const hand = (a: number, side: 1 | -1, L = 150): P => [side * (74 + Math.sin((a * Math.PI) / 180) * L), -330 + Math.cos((a * Math.PI) / 180) * L];

export const Person: React.FC<{
  x: number; y: number; s?: number; suit?: string; tie?: string; skin?: string; hat?: 'top' | 'visor' | 'bowler' | 'none'; face?: Face;
  armL?: number; armR?: number; walk?: number; back?: boolean; flip?: boolean; tilt?: number; ghost?: boolean; height?: number; children?: React.ReactNode;
}> = ({x, y, s = 1, suit = '#31507f', tie = GOLD, skin = '#f6d3a5', hat = 'none', face = 'smile', armL = 12, armR = 12, walk = 0, back = false, flip = false, tilt = 0, ghost = false, height = 1, children}) => {
  const sw = Math.sin(walk * Math.PI * 2) * 22;
  const ink = {stroke: INK, strokeWidth: 9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const hL = hand(armL, -1), hR = hand(armR, 1);
  const mouth = {
    smile: 'M-30 -400 q30 30 60 0', happy: 'M-34 -402 q34 44 68 0Z', flat: 'M-26 -398 l52 0', shock: '', worry: 'M-30 -390 q30 -28 60 0', smirk: 'M-28 -396 q34 24 58 -12',
  }[face];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s * height}) rotate(${tilt})`} opacity={ghost ? 0.55 : 1}>
      <ellipse cx={0} cy={4} rx={90} ry={16} fill={INK} opacity={0.18} />
      <path d={`M-34 -170 L${-34 + sw} -14`} fill="none" {...ink} />
      <path d={`M34 -170 L${34 - sw} -14`} fill="none" {...ink} />
      <ellipse cx={-34 + sw - 8} cy={-8} rx={28} ry={14} fill={INK} /><ellipse cx={34 - sw + 8} cy={-8} rx={28} ry={14} fill={INK} />
      <path d={`M-74 -330 L${hL[0]} ${hL[1]}`} fill="none" {...ink} /><circle cx={hL[0]} cy={hL[1]} r={11} fill={INK} />
      <rect x={-82} y={-358} width={164} height={200} rx={44} fill={suit} stroke={INK} strokeWidth={8} />
      {!back && <path d="M-14 -352 L14 -352 L10 -300 L0 -260 L-10 -300Z" fill={tie} stroke={INK} strokeWidth={5} />}
      <path d={`M74 -330 L${hR[0]} ${hR[1]}`} fill="none" {...ink} /><circle cx={hR[0]} cy={hR[1]} r={11} fill={INK} />
      <ellipse cx={0} cy={-444} rx={88} ry={96} fill={back ? '#4a3326' : skin} stroke={INK} strokeWidth={8} />
      {!back && (
        <g fill={INK}>
          <circle cx={-32} cy={-452} r={10} /><circle cx={32} cy={-452} r={10} />
          {face === 'shock' ? <ellipse cx={0} cy={-396} rx={16} ry={22} /> : <path d={mouth} fill={face === 'happy' ? '#7a2e3a' : 'none'} stroke={INK} strokeWidth={7} strokeLinecap="round" />}
          {(face === 'worry' || face === 'shock') && <path d="M-52 -484 l34 -10 M52 -484 l-34 -10" stroke={INK} strokeWidth={6} fill="none" />}
        </g>
      )}
      {hat === 'top' && (
        <g stroke={INK} strokeWidth={8} strokeLinejoin="round">
          <rect x={-62} y={-660} width={124} height={124} rx={8} fill="#2a2a3a" />
          <rect x={-62} y={-570} width={124} height={26} fill={GOLD} />
          <ellipse cx={0} cy={-534} rx={112} ry={18} fill="#2a2a3a" />
        </g>
      )}
      {hat === 'visor' && (
        <g stroke={INK} strokeWidth={8} strokeLinejoin="round">
          <path d="M-90 -480 Q0 -600 90 -480Z" fill="#3d8f5a" />
          <path d="M-96 -478 L96 -478 L130 -462 L-130 -462Z" fill="#2f7347" />
        </g>
      )}
      {hat === 'bowler' && (
        <g stroke={INK} strokeWidth={8} strokeLinejoin="round">
          <path d="M-70 -520 Q0 -640 70 -520Z" fill="#5a4636" />
          <ellipse cx={0} cy={-520} rx={104} ry={14} fill="#5a4636" />
        </g>
      )}
      {children}
    </g>
  );
};

export const Hose: React.FC<{a: P; c: P; b: P; w?: number; f: number}> = ({a, c, b, w = 16, f}) => (
  <g fill="none" strokeLinecap="round">
    <path d={bezPath(a, c, b)} stroke={INK} strokeWidth={w + 12} />
    <path d={bezPath(a, c, b)} stroke={GOLD} strokeWidth={w} />
    <path d={bezPath(a, c, b)} stroke="#fff6c2" strokeWidth={Math.max(3, w * 0.25)} strokeDasharray="14 40" strokeDashoffset={-f * 3} />
  </g>
);

export const Paper: React.FC<{x: number; y: number; w?: number; h?: number; rot?: number; children?: React.ReactNode}> = ({x, y, w = 150, h = 190, rot = 0, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#fffaf0" stroke={INK} strokeWidth={7} />
    {children}
  </g>
);
export const RedX: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#d63a3a" strokeWidth={22} strokeLinecap="round">
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" />
  </g>
);
export const Push: React.FC<{f: number; fx?: number; fy?: number; rate?: number; shake?: number; children: React.ReactNode}> = ({f, fx = W / 2, fy = 1100, rate = 0.0004, shake = 0, children}) => {
  const k = 1 + rate * f;
  const sx = f % 2 === 0 ? shake : -shake;
  return <g transform={`translate(${sx} ${-sx * 0.6}) translate(${fx} ${fy}) scale(${k}) translate(${-fx} ${-fy})`}>{children}</g>;
};
