import React from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {ThreeTest} from './ThreeTest';
import {BridgeShort, BRIDGE_FRAMES} from './videos/bridge/Bridge';

export const Root: React.FC = () => (
  <>
    <Composition id="HelloWorld" component={HelloWorld} durationInFrames={90} fps={30} width={1280} height={720} />
    <Composition id="ThreeTest" component={ThreeTest} durationInFrames={30} fps={30} width={1080} height={1920} />
    <Composition id="BridgeShort" component={BridgeShort} durationInFrames={BRIDGE_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
