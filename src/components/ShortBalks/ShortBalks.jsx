import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const ShortBalks = ({
  roofLength,
  roofWidth,
  Balk150x150x2200,
  Lodge20x200x1000,
  Lodge150x50x1000,
  Lodge150x50x200,
  firstFreezeDistance,
}) => {
  const balks = [];

  const smallBalkStep = 0.6;
  const smallBalkLength =
    firstFreezeDistance -
    Lodge20x200x1000.width +
    Balk150x150x2200.width / 2 -
    Lodge150x50x1000.width / 2;
  const smallBalkPosX = -smallBalkLength - roofLength / 2 - Lodge150x50x200.width / 2;
  const smallBalkCount = Math.floor(
    (roofWidth + Balk150x150x2200.width / 2 + Lodge150x50x1000.width / 2) / smallBalkStep
  );
  const smallBalkSpacing = roofWidth / smallBalkCount;
  const columnCountByLength = Math.floor(roofLength / 5) + 1;

  // Reusable function to create Lodge150x50x1000 balks
  const createLodgeBalk = (xPosition, zPosition) => (
    <Models.Lodge150x50x1000
      key={uuidv4()}
      position={[xPosition, Balk150x150x2200.height + Balk150x150x2200.width, zPosition]}
      scale={[smallBalkLength, 1, 1]}
    />
  );

  for (let i = 0; i < columnCountByLength; i++) {
    const xPosition = -roofLength / 2 + (i * roofLength) / (columnCountByLength - 1);

    // Main Balk150x150x1000
    balks.push(
      <Models.Balk150x150x1000
        key={uuidv4()}
        rotation={[0, Math.PI / 2, 0]}
        position={[xPosition, Balk150x150x2200.height, roofWidth / 2 + Balk150x150x2200.width / 2]}
        scale={[roofWidth + Balk150x150x2200.width, 1, 1]}
      />
    );

    // Add small balks for the first column
    if (i === 0) {
      for (let j = 1; j < smallBalkCount; j++) {
        const zPositionSmall =
          -roofWidth / 2 -
          Balk150x150x2200.width / 2 -
          Lodge150x50x1000.width / 2 +
          j * smallBalkSpacing;

        balks.push(
          createLodgeBalk(smallBalkPosX, zPositionSmall),
          createLodgeBalk(-smallBalkPosX - smallBalkLength, zPositionSmall)
        );
      }
    }
  }

  return balks;
};

export default ShortBalks;
