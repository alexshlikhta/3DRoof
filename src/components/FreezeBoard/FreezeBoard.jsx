import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const FreezeBoard = ({
  roofLength,
  roofWidth,
  Balk150x150x2200,
  Lodge20x190x1000Bevel,
  firstFreezeDistance,
}) => {
  const freezPosY = Balk150x150x2200.height + Balk150x150x2200.width * 2;
  const totalObjLength = parseFloat(
    (roofLength + Balk150x150x2200.width + firstFreezeDistance * 2).toFixed(3)
  );
  const totalObjWidth = parseFloat(
    (roofWidth + Balk150x150x2200.width + firstFreezeDistance * 2).toFixed(3)
  );
  const boardWidth = Lodge20x190x1000Bevel.width;

  const boards = [];
  const boardCountX = Math.floor(totalObjLength / 0.19);
  const boardCountZ = Math.floor(totalObjWidth / 1);
  const boardCorrectedLength = totalObjWidth / boardCountZ;
  const remainingLength = parseFloat((totalObjLength - boardCountX * boardWidth).toFixed(3));

  for (let i = 0; i < boardCountX; i++) {
    for (let j = 0; j < boardCountZ; j++) {
      const xPosition =
        -roofLength / 2 -
        Balk150x150x2200.width / 2 -
        firstFreezeDistance +
        boardWidth / 2 +
        i * boardWidth;
      const zPosition =
        -roofWidth / 2 -
        Balk150x150x2200.width / 2 -
        firstFreezeDistance +
        boardCorrectedLength +
        j * boardCorrectedLength;

      boards.push(
        <Models.Lodge20x190x1000Bevel
          key={uuidv4()}
          position={[xPosition, freezPosY, zPosition]}
          scale={[1, 1, boardCorrectedLength]}
        />
      );
    }
  }

  if (remainingLength > 0) {
    const xPosition =
      -roofLength / 2 -
      firstFreezeDistance -
      Balk150x150x2200.width / 2 +
      remainingLength / 2 +
      boardCountX * boardWidth;

    boards.push(
      <Models.Lodge20x190x1000Bevel
        key={uuidv4()}
        position={[
          xPosition,
          freezPosY,
          (roofWidth + Balk150x150x2200.width + firstFreezeDistance * 2) / 2,
        ]}
        scale={[
          remainingLength / boardWidth,
          1,
          roofWidth + Balk150x150x2200.width + firstFreezeDistance * 2,
        ]}
      />
    );
  }

  return boards;
};

export default FreezeBoard;
