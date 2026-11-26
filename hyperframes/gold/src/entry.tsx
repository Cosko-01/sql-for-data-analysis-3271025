import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import {FrameCtx, Sequence} from 'remotion';
import {S1, S2, S3, S4, S5, S6, S7, S8, S9, S10} from '../../../remotion/src/videos/gold/Scenes';
import {FRAMES} from '../../../remotion/src/videos/gold/Gold';

const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];
const App: React.FC<{f: number}> = ({f}) => {
  let at = 0;
  return (
    <FrameCtx.Provider value={f}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        {SCENES.map((S, i) => { const from = at; at += FRAMES[i]; return <Sequence key={i} from={from} durationInFrames={FRAMES[i]}><S D={FRAMES[i]} /></Sequence>; })}
      </svg>
    </FrameCtx.Provider>
  );
};
const root = createRoot(document.getElementById('stage')!);
(window as any).__goldRender = (f: number) => flushSync(() => root.render(<App f={f} />));
(window as any).__goldFrames = FRAMES.reduce((a, b) => a + b, 0);
(window as any).__goldRender(0);
