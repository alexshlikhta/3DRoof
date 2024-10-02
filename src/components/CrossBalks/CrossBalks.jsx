import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const CrossBalks = ({ roofLength, roofWidth, Balk150x150x2200, Lodge150x50x1000, step = 0.5 }) => {
  const balks = [];

  const balksCount = Math.floor(roofLength / step);
  const balksSpacing = roofLength / balksCount;

  for (let i = 0; i <= balksCount; i++) {
    const xPosition = -Lodge150x50x1000.width / 2 - roofLength / 2 + i * balksSpacing;

    balks.push(
      <Models.Lodge150x50x1000
        key={uuidv4()}
        rotation={[0, Math.PI / 2, 0]}
        position={[
          xPosition,
          Balk150x150x2200.height + Balk150x150x2200.width,
          roofWidth / 2 + Balk150x150x2200.width / 2 - Lodge150x50x1000.width / 2,
        ]}
        scale={[roofWidth + Balk150x150x2200.width - Lodge150x50x1000.width, 1, 1]}
      />
    );
  }

  return balks;
};

export default CrossBalks;
