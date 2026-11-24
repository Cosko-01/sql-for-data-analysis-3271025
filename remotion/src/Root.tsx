import React from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';

export const Root: React.FC = () => (
  <Composition id="HelloWorld" component={HelloWorld} durationInFrames={90} fps={30} width={1280} height={720} />
);
