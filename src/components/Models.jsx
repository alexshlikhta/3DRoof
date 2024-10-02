import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Clone } from '@react-three/drei';

// Reusable function for loading model and texture
const useModelWithTexture = (modelPath, texturePath) => {
  const obj = useLoader(OBJLoader, modelPath);
  const texture = useLoader(TextureLoader, texturePath);

  useMemo(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  return obj;
};

// Individual components for each model
export const Balk150x150x1000 = (props) => {
  const obj = useModelWithTexture('./models/balk_150x150x1000.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const Balk150x150x2200 = (props) => {
  const obj = useModelWithTexture('./models/balk_150x150x2200.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const BalkCorner = (props) => {
  const obj = useModelWithTexture('./models/balk_corner.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const Lodge20x190x1000Bevel = (props) => {
  const obj = useModelWithTexture(
    './models/Lodge_20x190x1000_bevel.obj',
    './textures/texture_wood_normal.jpg'
  );
  return <Clone object={obj} {...props} />;
};

export const Lodge20x200x1000 = (props) => {
  const obj = useModelWithTexture('./models/Lodge_20x200x1000.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const Lodge150x50x200 = (props) => {
  const obj = useModelWithTexture('./models/lodge_150x50x200.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const Lodge150x50x1000 = (props) => {
  const obj = useModelWithTexture('./models/lodge_150x50x1000.obj', './textures/texture_wood.jpg');
  return <Clone object={obj} {...props} />;
};

export const Ruberoid1000x1000x2 = (props) => {
  const obj = useModelWithTexture(
    './models/ruberoid_1000x1000x2.obj',
    './textures/roof_texture.jpg'
  );
  return <Clone object={obj} {...props} />;
};

// Object to export all models
const Models = {
  Balk150x150x1000,
  Balk150x150x2200,
  BalkCorner,
  Lodge20x190x1000Bevel,
  Lodge20x200x1000,
  Lodge150x50x200,
  Lodge150x50x1000,
  Ruberoid1000x1000x2,
};

export default Models;
