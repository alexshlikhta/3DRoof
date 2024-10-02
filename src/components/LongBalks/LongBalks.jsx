import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const LongBalks = ({
  roofLength,
  roofWidth,
  Balk150x150x2200,
  Lodge20x200x1000,
  Lodge150x50x1000,
  Lodge150x50x200,
  firstFreezeDistance,
}) => {
  const balks = [];
  const columnCountByLength = Math.floor(roofLength / 5) + 1;
  const columnCountByWidth = Math.floor(roofWidth / 3) + 1;

  const balkLength = roofLength / (columnCountByLength - 1) - Balk150x150x2200.width;
  const brusLength =
    roofLength + Balk150x150x2200.width + firstFreezeDistance * 2 - 2 * Lodge20x200x1000.width;
  const brusPosX =
    -roofLength / 2 - Balk150x150x2200.width / 2 - firstFreezeDistance + Lodge20x200x1000.width;
  const brusPosY = Balk150x150x2200.height + Balk150x150x2200.width;
  const brusPosZ = -Lodge150x50x1000.width / 2 + roofWidth / 2 + Balk150x150x2200.width / 2;

  const createBalksAndBrus = (xPosition, zPosition, reverseZ = false) => {
    const zAdjustedPosition = reverseZ ? -zPosition : zPosition;
    balks.push(
      // Balks
      <Models.Balk150x150x1000
        key={uuidv4()}
        position={[xPosition, Balk150x150x2200.height, zAdjustedPosition]}
        scale={[balkLength, 1, 1]}
      />,
      // Bruss
      <Models.Lodge150x50x1000
        key={uuidv4()}
        position={[brusPosX, brusPosY, brusPosZ]}
        scale={[brusLength, 1, 1]}
      />,
      <Models.Lodge150x50x1000
        key={uuidv4()}
        position={[brusPosX, brusPosY, -brusPosZ - Lodge150x50x1000.width]}
        scale={[brusLength, 1, 1]}
      />
    );
  };

  // Generate balks for each width and length
  for (let j = 0; j < columnCountByWidth; j++) {
    const zPosition = -roofWidth / 2 + (j * roofWidth) / (columnCountByWidth - 1);

    for (let i = 0; i < columnCountByLength - 1; i++) {
      const xPosition =
        -roofLength / 2 + Balk150x150x2200.width / 2 + i * (balkLength + Balk150x150x2200.width);
      createBalksAndBrus(xPosition, zPosition);
    }
  }

  // Generate balks along roofWidth boundaries
  for (let i = 0; i < columnCountByLength - 1; i++) {
    const xPosition =
      -roofLength / 2 + Balk150x150x2200.width / 2 + i * (balkLength + Balk150x150x2200.width);
    createBalksAndBrus(xPosition, roofWidth / 2, true);
  }

  // Generate small beams
  const smallBeamStep = 0.6;
  const smallBeamCount = Math.floor(roofLength / smallBeamStep);
  const smallBeamSpacing = roofLength / smallBeamCount;
  const smallbalkLength = parseFloat(
    (firstFreezeDistance - Lodge150x50x200.width / 2 - Lodge20x200x1000.width).toFixed(3)
  );
  const getposX = (i) => -Lodge150x50x200.width / 2 - roofLength / 2 + i * smallBeamSpacing;
  const posY = Balk150x150x2200.height + Balk150x150x2200.width;
  const posZLeftSide =
    smallbalkLength + roofWidth / 2 + Balk150x150x2200.width / 2 + Lodge150x50x200.width / 2;
  const posZRightSide = -roofWidth / 2 - Balk150x150x2200.width / 2 - Lodge150x50x200.width / 2;

  const createSmallBalk = (posX, posZ) => (
    <Models.Lodge150x50x1000
      key={uuidv4()}
      rotation={[0, Math.PI / 2, 0]}
      position={[posX, posY, posZ]}
      scale={[smallbalkLength, 1, 1]}
    />
  );

  for (let i = 0; i <= smallBeamCount; i++) {
    const posX = getposX(i);
    balks.push(createSmallBalk(posX, posZLeftSide), createSmallBalk(posX, posZRightSide));
  }

  return balks;
};

export default LongBalks;
