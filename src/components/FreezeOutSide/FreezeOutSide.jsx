import Models from '../Models';

const FreezeOutSide = ({
  roofLength,
  roofWidth,
  Balk150x150x2200,
  Lodge20x200x1000,
  firstFreezeDistance,
  firstFreezeY,
}) => {
  const boardsPosY = Balk150x150x2200.height + firstFreezeY * 2;

  // Long boards parameters
  const longBoardLength = roofLength + Balk150x150x2200.width + firstFreezeDistance * 2;
  const longBoardPosX = -longBoardLength / 2;
  const longBoardPosZ = roofWidth / 2 + Balk150x150x2200.width / 2 + firstFreezeDistance;

  // Short boards parameters
  const shortBoardLength =
    roofWidth + Balk150x150x2200.width + firstFreezeDistance * 2 + Lodge20x200x1000.width * 2;
  const shortBoardPosX =
    -roofLength / 2 - Balk150x150x2200.width / 2 - firstFreezeDistance - Lodge20x200x1000.width;
  const shortBoardPosZ =
    roofWidth / 2 + Balk150x150x2200.width / 2 + firstFreezeDistance + Lodge20x200x1000.width;

  // Function to render long boards
  const renderLongBoard = (zPosition, flipZ = false) => (
    <Models.Lodge20x200x1000
      position={[
        longBoardPosX,
        boardsPosY,
        flipZ ? -zPosition - Lodge20x200x1000.width : zPosition,
      ]}
      scale={[longBoardLength, 1, 1]}
    />
  );

  // Function to render short boards
  const renderShortBoard = (xPosition, flipX = false) => (
    <Models.Lodge20x200x1000
      rotation={[0, Math.PI / 2, 0]}
      position={[
        flipX ? -xPosition - Lodge20x200x1000.width : xPosition,
        boardsPosY,
        shortBoardPosZ,
      ]}
      scale={[shortBoardLength, 1, 1]}
    />
  );

  return (
    <>
      {/* Long boards */}
      {renderLongBoard(longBoardPosZ, true)}
      {renderLongBoard(longBoardPosZ)}

      {/* Short boards */}
      {renderShortBoard(shortBoardPosX)}
      {renderShortBoard(shortBoardPosX, true)}
    </>
  );
};

export default FreezeOutSide;
