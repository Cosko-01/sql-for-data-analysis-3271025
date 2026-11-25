import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Coin, Hose, INK, GOLD, H, HORIZON, P, Paper, Person, Pig, Push, RedX, Shield, Sky, Skyline, W, bez, ease, pop} from './parts';

const absHand = (px: number, py: number, s: number, a: number, side: 1 | -1): P => [px + s * side * (74 + Math.sin((a * Math.PI) / 180) * 150), py + s * (-330 + Math.cos((a * Math.PI) / 180) * 150)];
const Bg: React.FC<{sky?: boolean}> = ({sky = true}) => (<g><Sky />{sky && <Skyline />}</g>);
const MoneyBag: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <path d="M-60 0 Q-90 -90 -26 -120 L26 -120 Q90 -90 60 0Z" fill="#c9a56a" />
    <path d="M-30 -120 L-40 -150 L40 -150 L30 -120Z" fill="#b08a4e" />
    <circle cy={-56} r={26} fill={GOLD} />
  </g>
);

/* 1. Hook */
export const S1: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const gx = ease(f, 0, 45, 1080, 700), walk = f < 45 ? f / 18 : 0;
  const hand: P = absHand(gx, 1500, 1.15, 75, -1);
  const slot: P = [300, 1380 - 238 * 1.2];
  const bag: P = [gx - 130, 1480];
  return (
    <g><Bg />
      <Push f={f} fy={1250} rate={0.0006}>
        <Pig x={300} y={1380} s={1.2} glow={ease(f, 0, 30)} />
        <Hose a={slot} c={[380, 800]} b={hand} w={18} f={f} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const t = ((f * 0.02 + i / 6) % 1);
          const p = bez(slot, [380, 800], hand, t);
          return <Coin key={i} x={p[0]} y={p[1]} r={22} />;
        })}
        {[0, 1, 2, 3].map((i) => {
          const t = ((f * 0.025 + i / 4) % 1);
          const p = bez(hand, [hand[0] - 40, hand[1] + 200], bag, t);
          return <Coin key={'b' + i} x={p[0]} y={p[1]} r={20} />;
        })}
        <MoneyBag x={gx - 130} y={1500} s={1 + ease(f, 20, D, 0, 0.5)} />
        <Person x={gx} y={1500} s={1.15} hat="top" face="happy" armL={75} armR={15} walk={walk} />
        <Person x={970} y={1490} s={0.8} suit="#4a4a52" hat="visor" skin="#e9c39a" face="worry" armL={55} armR={55} flip />
      </Push>
    </g>
  );
};

/* 2. Setting: premiums into the pot, tax man looks away */
export const S2: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const hand: P = absHand(220, 1500, 1.1, 100, 1);
  const g = 1 + 0.15 * ease(f, 0, D);
  const slot: P = [740, 1380 - 238 * 1.4 * g];
  const shield: P = [520, 760];
  const flashS = Math.max(0, 1 - Math.abs(f - 60) / 20);
  return (
    <g><Bg />
      <Push f={f} fy={1250} rate={0.0004}>
        <Pig x={740} y={1380} s={1.4 * g} glow={ease(f, 30, D)} />
        <Shield x={shield[0]} y={shield[1]} s={1 + 0.25 * flashS} />
        {Array.from({length: 14}).map((_, i) => {
          const t = (f - 20 - i * 12) / 34;
          if (t < 0 || t > 1) return null;
          const toShield = i % 4 === 0;
          const to = toShield ? shield : slot;
          const p = bez(hand, [(hand[0] + to[0]) / 2, 820], to, t);
          return <Coin key={i} x={p[0]} y={p[1]} r={24} s={toShield ? 0.8 : 1} />;
        })}
        <Person x={220} y={1500} s={1.1} hat="top" face="happy" armL={20} armR={100} />
        <Person x={995} y={1490} s={0.75} suit="#4a4a52" hat="visor" skin="#e9c39a" back armL={20} armR={20} flip />
        {[0, 1].map((i) => <circle key={i} cx={990 + i * 30} cy={1130 - ((f * 1.2 + i * 40) % 120)} r={9} fill={INK} opacity={1 - ((f * 1.2 + i * 40) % 120) / 120} />)}
      </Push>
    </g>
  );
};

/* 3. Selling = tax bill, borrow instead */
export const S3: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const tx = ease(f, 15, 50, 1250, 800);
  const headNo = f > 55 && f < 95 ? Math.sin((f - 55) * 0.7) * 5 : 0;
  const turned = f >= 100;
  const pigX = ease(f, 95, 125, -260, 190);
  const chart = !turned;
  return (
    <g><Bg />
      <Push f={f} fy={1200} rate={0.0004}>
        <Pig x={pigX} y={1380} s={1.2} glow={ease(f, 110, 140)} />
        <Person x={430} y={1500} s={1.15} hat="top" tilt={headNo} face={turned ? 'smirk' : f > 50 ? 'worry' : 'flat'} armL={turned ? 80 : 12} armR={chart ? 95 : 20}>
          {chart && (
            <g transform={`translate(${74 + 150 * Math.sin((95 * Math.PI) / 180)} ${-330 + 150 * Math.cos((95 * Math.PI) / 180) - 80})`}>
              <Paper x={0} y={0} w={170} h={140} rot={-4}>
                <path d="M-60 40 L-28 8 L-6 24 L24 -24 L56 -44" fill="none" stroke="#2f9e5a" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
              </Paper>
            </g>
          )}
        </Person>
        <Person x={tx} y={1500} s={0.95} suit="#4a4a52" hat="visor" skin="#e9c39a" face={turned ? 'flat' : 'smirk'} armL={20} armR={80} flip>
          <g transform="translate(232 -330)">
            <g transform={`scale(${pop(f, 40, 12)})`}><Paper x={0} y={-40} w={190} h={240} rot={5}><Coin x={0} y={-30} r={44} /><path d="M-60 60 H60 M-60 90 H20" stroke={INK} strokeWidth={9} strokeLinecap="round" /></Paper></g>
          </g>
        </Person>
        {turned && <RedX x={tx - 120} y={1010} s={pop(f, 100, 10)} />}
      </Push>
    </g>
  );
};

/* 4. Loan: no tax, no credit check, no schedule; interest piles up */
const Clip: React.FC = () => (
  <Paper x={0} y={0} w={170} h={210}><rect x={-30} y={-110} width={60} height={22} rx={6} fill="#888" stroke={INK} strokeWidth={6} />
    <path d="M-50 -40 h100 M-50 0 h100 M-50 40 h60" stroke={INK} strokeWidth={9} strokeLinecap="round" /><path d="M20 55 l14 14 l30 -34" fill="none" stroke="#2f9e5a" strokeWidth={9} strokeLinecap="round" /></Paper>
);
const Cal: React.FC = () => (
  <Paper x={0} y={0} w={190} h={190}><rect x={-95} y={-95} width={190} height={50} fill="#d63a3a" stroke={INK} strokeWidth={7} />
    {[-50, 0, 50].map((x) => [-10, 40].map((y) => <rect key={x + '' + y} x={x - 14} y={y - 14} width={28} height={28} fill="#e2e2e2" stroke={INK} strokeWidth={4} />))}</Paper>
);
export const S4: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const hand: P = absHand(330, 1500, 1.15, 95, 1);
  const slot: P = [800, 1380 - 238 * 1.2];
  const icons = [{x: 210, a: 15, el: <Paper x={0} y={0} w={170} h={220}><Coin x={0} y={-20} r={44} /><path d="M-50 60 H50" stroke={INK} strokeWidth={9} strokeLinecap="round" /></Paper>}, {x: 540, a: 60, el: <Clip />}, {x: 870, a: 105, el: <Cal />}];
  const pile = Math.max(0, Math.floor((f - 30) / 30));
  return (
    <g><Bg />
      <Push f={f} fy={1200} rate={0.0004}>
        {icons.map((ic, i) => (
          <g key={i} transform={`translate(${ic.x} ${480 + Math.sin((f + i * 20) * 0.07) * 8}) scale(${pop(f, ic.a - 10, 12)})`}>
            {ic.el}
            <RedX x={0} y={0} s={pop(f, ic.a + 12, 10)} />
          </g>
        ))}
        <Pig x={800} y={1380} s={1.2} glow={0.7} />
        <Hose a={slot} c={[640, 840]} b={hand} w={18} f={f} />
        {Array.from({length: Math.min(pile, 9)}).map((_, i) => <Coin key={i} x={940 - (i % 3) * 44} y={1420 - Math.floor(i / 3) * 18} r={22} s={1} />)}
        {pile > 0 && <Coin x={940 - ((pile - 1) % 3) * 44} y={1420 - Math.floor((pile - 1) / 3) * 18 - 60 * Math.max(0, 1 - ((f - 30) % 30) / 8)} r={22} />}
        <Person x={330} y={1500} s={1.15} hat="top" face="smile" armL={12} armR={95} />
      </Push>
    </g>
  );
};

/* 5. Premium financing: the bank lends the premium, policy is the collateral */
const Bank: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <rect x={0} y={-330} width={330} height={330} fill="#efe3c6" />
    <path d="M-20 -330 L165 -430 L350 -330Z" fill="#d9c79a" />
    {[30, 110, 190, 270].map((cx) => <rect key={cx} x={cx} y={-300} width={34} height={250} fill="#f9f1dc" />)}
    <rect x={-20} y={-50} width={370} height={50} fill="#cdbb8a" />
    <circle cx={165} cy={-372} r={20} fill={GOLD} />
  </g>
);
export const S5: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const slot: P = [830, 1380 - 238 * 1.2];
  const hand: P = absHand(560, 1500, 1.1, 130, 1);
  return (
    <g><Bg sky={false} />
      <Push f={f} fy={1200} rate={0.0004}>
        <Bank x={20} y={HORIZON} />
        <path d={`M300 ${HORIZON - 70} Q560 ${HORIZON + 120} 760 1290`} fill="none" stroke={INK} strokeWidth={20} />
        <path d={`M300 ${HORIZON - 70} Q560 ${HORIZON + 120} 760 1290`} fill="none" stroke="#b5523b" strokeWidth={10} strokeDasharray="22 10" />
        <Pig x={830} y={1380} s={1.2} glow={0.5} />
        {Array.from({length: 6}).map((_, i) => {
          const t = ((f / 120 + i / 6) % 1);
          const p: P = t < 0.5 ? bez([200, 1020], [420, 820], hand, t * 2) : bez(hand, [740, 880], slot, (t - 0.5) * 2);
          return <Coin key={i} x={p[0]} y={p[1]} r={24} />;
        })}
        <Person x={560} y={1500} s={1.1} hat="top" face="worry" armL={130} armR={130} />
      </Push>
    </g>
  );
};

/* 6. Snap: loan outgrows the pot, pig cracks, old gains spill to the tax collector */
export const S6: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const cross = Math.round(D * 0.4), snap = Math.round(D * 0.62);
  const level = f < cross ? ease(f, 0, cross, 0.1, 0.72) : ease(f, cross, snap, 0.72, 1.0);
  const crack = ease(f, cross, snap, 0, 1);
  const split = ease(f, snap, snap + 22, 0, 1);
  const since = f - snap;
  const shake = since >= 0 && since < 8 ? 18 * (1 - since / 8) : 0;
  const pigS = 1.4;
  return (
    <g><Bg />
      <Push f={f} fy={1250} rate={0.0004} shake={shake}>
        <g stroke={INK} strokeWidth={8}>
          <rect x={90} y={800} width={90} height={700} rx={30} fill="#f3eadb" />
          <rect x={90} y={1500 - 700 * level} width={90} height={700 * level} rx={30} fill="#d9452b" />
          <path d={`M60 ${1500 - 700 * 0.72} H210`} stroke="#2f9e5a" strokeWidth={10} />
        </g>
        <Pig x={720} y={1380} s={pigS} glow={split > 0 ? 0 : 0.6} crack={crack} split={split} happy={f < cross} />
        {since >= 0 && Array.from({length: 16}).map((_, i) => {
          const t = (since - 6 - i * 3) / 36;
          if (t < 0 || t > 1) return null;
          const p = bez([720, 1250], [820, 900 - (i % 4) * 60], [900, 1350], t);
          return <Coin key={i} x={p[0]} y={p[1]} r={24} />;
        })}
        <g transform="translate(920 1420)">
          <MoneyBag x={0} y={0} s={1 + ease(since, 20, 80, 0, 0.9)} />
        </g>
        <Person x={340} y={1500} s={0.9} hat="top" face={since >= 0 ? 'shock' : 'worry'} armL={30} armR={30} />
        <Person x={990} y={1490} s={0.9} suit="#4a4a52" hat="visor" skin="#e9c39a" face={since >= 0 ? 'smirk' : 'flat'} armL={50} armR={50} flip />
      </Push>
      {since >= 0 && since < 4 && <rect width={W} height={H} fill="#fff" opacity={[0.9, 0.6, 0.35, 0.15][since]} />}
    </g>
  );
};

/* 7. Deadpan: luckily / unluckily */
export const S7: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const second = f >= Math.round(D * 0.5);
  const lf = second ? f - Math.round(D * 0.5) : f;
  return (
    <g><Bg />
      <Push f={lf} fy={1200} rate={0.0007}>
        <Person x={300} y={1500} s={1.2} hat="top" face={second ? 'flat' : 'happy'} armL={12} armR={second ? 20 : 170} />
        <Person x={760} y={1500} s={1.2} suit="#7a7a8a" tie="#d63a3a" face={second ? 'happy' : 'smile'} armL={12} armR={second ? 60 : 12} flip>
          {!second && <g transform="translate(110 -170)"><rect x={-60} y={0} width={120} height={90} rx={12} fill="#6b4a3a" stroke={INK} strokeWidth={7} /><rect x={-20} y={-18} width={40} height={20} fill="none" stroke={INK} strokeWidth={7} /></g>}
          {second && <g transform="translate(232 -240)"><Paper x={0} y={0} w={150} h={100} rot={-6}><path d="M-65 -35 L0 10 L65 -35" fill="none" stroke={INK} strokeWidth={7} /></Paper></g>}
        </Person>
        {second && Array.from({length: Math.min(8, 1 + Math.floor(lf / 4))}).map((_, i) => (
          <g key={i} transform={`translate(${620 + (i % 4) * 34} ${1470 - Math.floor(i / 4) * 40}) rotate(${(i % 3) * 5 - 5})`}><rect width={90} height={56} rx={6} fill="#fffaf0" stroke={INK} strokeWidth={6} /><path d="M0 0 L45 30 L90 0" fill="none" stroke={INK} strokeWidth={5} /></g>
        ))}
      </Push>
    </g>
  );
};

/* 8. Explanation: pawn shop, payout clears debt, trust dome */
export const S8: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const bEnd = Math.round(D * 0.4), cEnd = Math.round(D * 0.72);
  if (f < bEnd) {
    const cyc = 80, ph = (f % cyc) / cyc, n = Math.floor(f / cyc);
    const gP: P = [380, 1330], bP: P = [790, 1330];
    const pigPos: P = ph < 0.3 ? bez(gP, [590, 1050], bP, ph / 0.3) : ph < 0.5 ? bP : ph < 0.8 ? bez(bP, [590, 1050], gP, (ph - 0.5) / 0.3) : gP;
    return (
      <g><Bg />
        <Push f={f} fy={1200} rate={0.0004}>
          <g transform={`translate(640 ${HORIZON})`} stroke={INK} strokeWidth={7} strokeLinejoin="round">
            <rect x={0} y={-380} width={400} height={380} fill="#d9b88a" />
            <path d="M-20 -380 H420 V-320 H-20Z" fill="#b5523b" />
            {[0, 1, 2].map((i) => <g key={i}><path d={`M${90 + i * 110} -380 V-440`} /><circle cx={90 + i * 110} cy={-470} r={34} fill={GOLD} /></g>)}
            <rect x={40} y={-290} width={320} height={110} fill="#f7e9b0" />
          </g>
          <Paper x={540} y={760} w={110} h={120 + 60 * n + 60 * ph}><path d="M-30 -20 h60 M-30 10 h60" stroke={INK} strokeWidth={7} strokeLinecap="round" /></Paper>
          <Pig x={pigPos[0]} y={pigPos[1] + 40} s={0.65} glow={0.4} />
          {ph >= 0.3 && ph < 0.5 && Array.from({length: 5}).map((_, i) => { const p = bez(bP, [600, 900], gP, (ph - 0.3) / 0.2 * 0.8 + i * 0.04); return <Coin key={i} x={p[0]} y={p[1]} r={20} />; })}
          <Person x={260} y={1500} s={1.1} hat="top" face="smile" armL={12} armR={ph < 0.3 || ph >= 0.8 ? 110 : 40} />
          <Person x={880} y={1500} s={0.95} suit="#6a4a3a" hat="bowler" face="smirk" armL={70} armR={12} flip />
        </Push>
      </g>
    );
  }
  if (f < cEnd) {
    const lf = f - bEnd, len = cEnd - bEnd;
    const burn = ease(lf, 10, 30);
    const rise = ease(lf, 0, len, 0, 80);
    return (
      <g><Bg />
        <Push f={lf} fy={1200} rate={0.0004}>
          <ellipse cx={260} cy={1250 - rise - 540} rx={70} ry={18} fill="none" stroke={GOLD} strokeWidth={12} />
          <Person x={260} y={1250 - rise} s={0.75} hat="top" ghost face="smile" armL={50} armR={50} />
          <g opacity={1 - burn}><Paper x={540} y={800} w={130} h={240 * (1 - burn * 0.6)}><Coin x={0} y={0} r={36} /></Paper></g>
          {burn > 0 && burn < 1 && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={540 + (i - 2) * 40 * burn} cy={800 - 60 * burn * (1 + i % 2)} r={30 * (1 - burn)} fill="#ffe27a" />)}
          <g transform={`translate(540 ${ease(lf, 30, 56, 360, 720)})`} opacity={ease(lf, 28, 34)}>
            <rect x={-80} y={-50} width={160} height={100} rx={10} fill="#fffaf0" stroke={INK} strokeWidth={7} />
            <path d="M-80 -50 L0 10 L80 -50" fill="none" stroke={INK} strokeWidth={7} />
            <Shield x={0} y={10} s={0.5} />
          </g>
          {Array.from({length: 14}).map((_, i) => {
            const t = (lf - 56 - i * 3) / 40; if (t < 0 || t > 1) return null;
            const p = bez([540, 760], [i % 2 ? 420 : 660, 1000], [i % 2 ? 640 : 860, 1380], t);
            return <Coin key={i} x={p[0]} y={p[1]} r={22} />;
          })}
          <Person x={650} y={1500} s={1.0} suit="#b05a7a" tie="#fff" face="happy" armL={140} armR={140} />
          <Person x={870} y={1500} s={0.7} suit="#3a9a7a" tie="#fff" face="happy" armL={150} armR={150} />
        </Push>
      </g>
    );
  }
  const lf = f - cEnd;
  const tx = lf < 36 ? ease(lf, 0, 36, 1260, 780) : ease(lf, 36, 52, 780, 930);
  const hit = lf >= 36 && lf < 48;
  return (
    <g><Bg />
      <Push f={lf} fy={1200} rate={0.0006}>
        <Pig x={500} y={1380} s={1.2} glow={0.5} />
        {[0, 1, 2, 3].map((i) => <Coin key={i} x={380 + i * 70} y={1400 + (i % 2) * 10} r={24} />)}
        <ellipse cx={500} cy={1230} rx={290} ry={290} fill="#bfe6ff" opacity={0.35} stroke={INK} strokeWidth={8} />
        <path d="M300 1080 Q340 1000 440 980" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={0.8} />
        <g transform="translate(500 1530)" stroke={INK} strokeWidth={7}><rect x={-34} y={-30} width={68} height={56} rx={8} fill={GOLD} /><path d="M-18 -30 V-52 Q0 -78 18 -52 V-30" fill="none" /></g>
        <Person x={tx} y={1500} s={0.95} suit="#4a4a52" hat="visor" skin="#e9c39a" face={lf >= 36 ? 'shock' : 'smirk'} armL={hit ? 100 : 60} armR={60} flip />
        {hit && [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M780 ${1150 + i * 40} l-${30 + (lf - 36) * 3} -${10 - i * 5}`} stroke="#fff" strokeWidth={8} strokeLinecap="round" />)}
        <Person x={130} y={1080} s={0.6} hat="top" ghost face="smile" armL={40} armR={40} />
      </Push>
    </g>
  );
};

/* 9. Consequence: decades, fees, early years nearly empty */
export const S9: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const grow = ease(f, 0, D, 0.45, 1.2);
  const sand = ease(f, 0, D);
  const slot: P = [540, 1400 - 238 * grow];
  return (
    <g><Bg sky={false} />
      <Push f={f} fy={1200} rate={0.0004}>
        <g transform="translate(540 820)" stroke={INK} strokeWidth={9} strokeLinejoin="round">
          <path d="M-150 -240 H150 L20 0 L150 240 H-150 L-20 0Z" fill="#e8f4ff" opacity={0.85} />
          <path d={`M-${130 * (1 - sand) + 10} -230 H${130 * (1 - sand) + 10} L12 ${-20 * (1 - sand)}H-12Z`} fill={GOLD} stroke="none" />
          <path d={`M-${120 * sand + 8} 230 H${120 * sand + 8} L0 ${230 - 200 * sand}Z`} fill={GOLD} stroke="none" />
          <path d="M0 -20 V200" stroke={GOLD} strokeWidth={6} strokeDasharray="10 14" strokeDashoffset={-f * 3} />
          <rect x={-170} y={-270} width={340} height={30} rx={10} fill="#8a5a3a" /><rect x={-170} y={240} width={340} height={30} rx={10} fill="#8a5a3a" />
        </g>
        <Pig x={540} y={1400} s={grow} glow={Math.max(0.1, sand)} />
        {Array.from({length: 8}).map((_, i) => {
          const t = ((f / 70 + i / 8) % 1);
          const p = bez([40, 1100], [300, 700], slot, t);
          return <Coin key={i} x={p[0]} y={p[1]} r={22} />;
        })}
        {Array.from({length: 3}).map((_, i) => {
          const t = ((f / 90 + i / 3) % 1);
          const p = bez([540 + 100, 1300], [800, 1100], [1160, 1260], t);
          return <Coin key={'f' + i} x={p[0]} y={p[1]} r={20} />;
        })}
      </Push>
    </g>
  );
};

/* 10. Callback twist: he never sold a share; the taxman is still waiting */
export const S10: React.FC<{D: number}> = ({D}) => {
  const f = useCurrentFrame();
  const beard = ease(f, 0, D, 0, 330);
  const spider = ease(f, 0, D, 100, 700);
  return (
    <g><Bg />
      <Push f={f} fy={1200} rate={0.0007}>
        <g transform={`translate(80 ${HORIZON})`} stroke={INK} strokeWidth={8}>
          <rect y={-330} width={280} height={330} rx={16} fill="#7e8a99" />
          <circle cx={140} cy={-170} r={70} fill="#9aa6b5" /><circle cx={140} cy={-170} r={14} fill={INK} />
        </g>
        <Person x={420} y={1500} s={1.1} hat="top" face="happy" armL={12} armR={110}>
          <g transform="translate(220 -160)" stroke={INK} strokeWidth={7}><path d="M-26 -50 H26 L18 20 H-18Z" fill="#ffb347" /><path d="M0 -50 L14 -90" /></g>
        </Person>
        <Person x={830} y={1500} s={1.1} suit="#4a4a52" hat="visor" skin="#e9c39a" face="flat" armL={20} armR={80} flip>
          <path d={`M-52 -400 Q0 ${-400 + beard} 52 -400 L0 ${-380 + beard}Z`} fill="#f0f0f0" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <g transform="translate(232 -290)" stroke={INK} strokeWidth={7}><circle r={42} fill="#fffaf0" /><path d={`M0 0 L${30 * Math.sin(f * 0.04)} ${-30 * Math.cos(f * 0.04)}`} /><rect x={-10} y={-62} width={20} height={20} fill={GOLD} /></g>
        </Person>
        <g stroke="#fff" strokeWidth={3} opacity={0.9}><path d="M1080 0 L1080 140 M1080 0 L940 0 M1080 0 L1000 110 M1080 0 L960 60" fill="none" /></g>
        <path d={`M960 0 V${spider}`} stroke="#fff" strokeWidth={3} />
        <circle cx={960} cy={spider} r={18} fill={INK} />
      </Push>
    </g>
  );
};
