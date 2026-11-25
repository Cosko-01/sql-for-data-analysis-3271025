// "How the Rich Borrow From Their Own Funeral": 2D flat-toon short (1080x1920, 30 fps). Script: remotion/shorts/life-insurance/SCRIPT.md
// TIMING (seconds per beat) comes from the synthesized voice beats; every scene reads its length from it.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {S1, S2, S3, S4, S5, S6, S7, S8, S9, S10} from './Scenes';

export const FPS = 30;
export const TIMING = [6.73, 8.61, 7.3, 7.95, 7.71, 9.72, 4.75, 15.6, 7.92, 4.13]; // = voice beat length + 0.5 s (shorts/life-insurance/voice/durations.json): hook, setting, action1-3, snap, deadpan, explanation, consequence, twist
export const FRAMES = TIMING.map((s) => Math.round(s * FPS));
export const GOLD_TOTAL = FRAMES.reduce((a, b) => a + b, 0);
const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

export const GoldShort: React.FC = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{background: '#cfe0f3'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        {SCENES.map((S, i) => {
          const from = at;
          at += FRAMES[i];
          return <Sequence key={i} from={from} durationInFrames={FRAMES[i]} layout="none"><S D={FRAMES[i]} /></Sequence>;
        })}
      </svg>
    </AbsoluteFill>
  );
};
