// Stand-in for 'remotion' so the 2D scenes (written for Remotion) run on a HyperFrames timeline:
// the frame is provided by FrameCtx instead of the Remotion player.
import React, {createContext, useContext} from 'react';
export {interpolate, Easing} from 'remotion-real';
export const FrameCtx = createContext(0);
export const useCurrentFrame = () => useContext(FrameCtx);
export const Sequence: React.FC<{from: number; durationInFrames: number; children: React.ReactNode}> = ({from, durationInFrames, children}) => {
  const f = useContext(FrameCtx);
  if (f < from || f >= from + durationInFrames) return null;
  return React.createElement(FrameCtx.Provider, {value: f - from}, children);
};
