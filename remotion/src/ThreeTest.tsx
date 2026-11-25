import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

export const ThreeTest: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#cfe3f2'}}>
      <ThreeCanvas width={1080} height={1920} camera={{position: [0, 0, 5], fov: 40}}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <mesh rotation={[0.4, f * 0.05, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#e8a23a" />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
