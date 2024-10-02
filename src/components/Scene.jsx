import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { DoubleSide, TextureLoader } from 'three';
import FreezeInside from './FreezeInside';
import FreezeOutSide from './FreezeOutSide';
import FreezeBoard from './FreezeBoard';
import LongBalks from './LongBalks';
import ShortBalks from './ShortBalks';
import CrossBalks from './CrossBalks/CrossBalks';
import RoofMaterial from './RoofMaterial';
import ColumnsGrid from './ColumnsGrid';

const Scene = ({ roofLength, roofWidth, roofMaterial, boards }) => {
  const texture = useLoader(TextureLoader, './textures/roof_texture.jpg');
  const Balk150x150x2200 = {
    width: 0.15,
    height: 2.2,
  };

  const Lodge20x200x1000 = {
    width: 0.02,
    length: 1,
    height: 0.2,
  };

  const Lodge20x190x1000Bevel = {
    width: 0.19,
    length: 1,
    height: 0.02,
  };

  const Lodge150x50x1000 = {
    width: 0.05,
    length: 1,
    height: 0.15,
  };

  const Lodge150x50x200 = {
    width: 0.05,
    length: 0.2,
    height: 0.15,
  };

  const Ruberoid1000x1000x2 = {
    width: 1,
    length: 1,
    height: 0.002,
  };

  const firstFreezeDistance = 0.18;
  const firstFreezeY = 0.1;

  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight position={[10, 10, 10]} angle={0.1} penumbra={1} decay={0} intensity={Math.PI} /> */}
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {/* <axesHelper args={[5000]} /> */}

      <Suspense fallback={null}>
        <ColumnsGrid roofLength={roofLength} roofWidth={roofWidth} />

        <ShortBalks
          roofLength={roofLength}
          roofWidth={roofWidth}
          Balk150x150x2200={Balk150x150x2200}
          Lodge20x200x1000={Lodge20x200x1000}
          Lodge150x50x1000={Lodge150x50x1000}
          Lodge150x50x200={Lodge150x50x200}
          firstFreezeDistance={firstFreezeDistance}
          firstFreezeY={firstFreezeY}
        />

        <LongBalks
          roofLength={roofLength}
          roofWidth={roofWidth}
          Balk150x150x2200={Balk150x150x2200}
          Lodge20x200x1000={Lodge20x200x1000}
          Lodge150x50x1000={Lodge150x50x1000}
          Lodge150x50x200={Lodge150x50x200}
          firstFreezeDistance={firstFreezeDistance}
          firstFreezeY={firstFreezeY}
        />

        <CrossBalks
          roofLength={roofLength}
          roofWidth={roofWidth}
          Balk150x150x2200={Balk150x150x2200}
          Lodge150x50x1000={Lodge150x50x1000}
        />

        <FreezeInside
          roofLength={roofLength}
          roofWidth={roofWidth}
          Balk150x150x2200={Balk150x150x2200}
          Lodge20x200x1000={Lodge20x200x1000}
          firstFreezeDistance={firstFreezeDistance}
          firstFreezeY={firstFreezeY}
        />

        <FreezeOutSide
          roofLength={roofLength}
          roofWidth={roofWidth}
          Balk150x150x2200={Balk150x150x2200}
          Lodge20x200x1000={Lodge20x200x1000}
          firstFreezeDistance={firstFreezeDistance}
          firstFreezeY={firstFreezeY}
        />

        {boards && (
          <FreezeBoard
            roofLength={roofLength}
            roofWidth={roofWidth}
            Balk150x150x2200={Balk150x150x2200}
            Lodge20x190x1000Bevel={Lodge20x190x1000Bevel}
            firstFreezeDistance={firstFreezeDistance}
            firstFreezeY={firstFreezeY}
          />
        )}

        {roofMaterial && (
          <RoofMaterial
            roofLength={roofLength}
            roofWidth={roofWidth}
            Balk150x150x2200={Balk150x150x2200}
            Lodge20x200x1000={Lodge20x200x1000}
            Lodge150x50x1000={Lodge150x50x1000}
            firstFreezeDistance={firstFreezeDistance}
            Ruberoid1000x1000x2={Ruberoid1000x1000x2}
            Lodge20x190x1000Bevel={Lodge20x190x1000Bevel}
          />
        )}

        {/* Floor */}
        <mesh
          position={[0, -0.001, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[roofLength + 2, roofWidth + 2, 1]}
        >
          <planeGeometry />
          <meshBasicMaterial map={texture} side={DoubleSide} />
        </mesh>
      </Suspense>

      <OrbitControls />
      <Environment preset='warehouse' background />
    </Canvas>
  );
};

export default Scene;
