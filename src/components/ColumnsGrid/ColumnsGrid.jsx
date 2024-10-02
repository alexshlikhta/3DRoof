import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const ColumnsGrid = ({ roofLength, roofWidth }) => {
  const columns = [];
  const minColumnDistanceX = 5;
  const minColumnDistanceZ = 3;

  const columnCountX = Math.floor(roofLength / minColumnDistanceX) + 1;
  const columnCountZ = Math.floor(roofWidth / minColumnDistanceZ) + 1;

  const stepX = roofLength / (columnCountX - 1);
  const stepZ = roofWidth / (columnCountZ - 1);

  const createBalkCorner = (xPosition, zPosition, rotation) => (
    <Models.BalkCorner key={uuidv4()} position={[xPosition, 0, zPosition]} rotation={rotation} />
  );

  // const createText = (xPosition, zPosition, i, j) => (
  //   <Text key={uuidv4()} position={[xPosition, 3, zPosition]} fontSize={0.3} color='black'>
  //     {`(${i}, ${j})`}
  //   </Text>
  // );

  for (let i = 0; i < columnCountX; i++) {
    const xPosition = -roofLength / 2 + i * stepX;

    for (let j = 0; j < columnCountZ; j++) {
      const zPosition = -roofWidth / 2 + j * stepZ;

      // Add main columns and text
      columns.push(
        <Models.Balk150x150x2200 key={uuidv4()} position={[xPosition, 0, zPosition]} />
        // createText(xPosition, zPosition, i, j)
      );

      const isEdgeColumn =
        (i === 0 || i === columnCountX - 1) && (j === 0 || j === columnCountZ - 1);
      const isBoundaryColumn =
        (i !== 0 && j === 0 && i !== columnCountX - 1) ||
        (i !== 0 && i !== columnCountX - 1 && j === columnCountZ - 1);
      const isSideColumn =
        (i === 0 && j !== 0 && j !== columnCountZ - 1) ||
        (i === columnCountX - 1 && j !== 0 && j !== columnCountZ - 1);
      const isCenterColumn = i !== 0 && j !== 0 && j !== columnCountZ - 1 && i !== columnCountX - 1;

      // Corner columns
      if (isEdgeColumn) {
        columns.push(
          createBalkCorner(xPosition, roofWidth / 2, [0, i === columnCountX - 1 ? -Math.PI : 0, 0]),
          createBalkCorner(xPosition, roofWidth / 2, [0, Math.PI / 2, 0]),
          createBalkCorner(xPosition, -roofWidth / 2, [
            0,
            i === columnCountX - 1 ? -Math.PI : 0,
            0,
          ]),
          createBalkCorner(xPosition, -roofWidth / 2, [0, -Math.PI / 2, 0])
        );
      }

      // Boundary columns
      if (isBoundaryColumn) {
        columns.push(
          createBalkCorner(xPosition, zPosition, [0, -Math.PI, 0]),
          createBalkCorner(xPosition, zPosition, [0, 0, 0])
        );
      }

      // Side columns
      if (isSideColumn) {
        columns.push(
          createBalkCorner(xPosition, zPosition, [0, Math.PI / 2, 0]),
          createBalkCorner(xPosition, zPosition, [0, -Math.PI / 2, 0])
        );
      }

      // Centered columns
      if (isCenterColumn) {
        columns.push(
          createBalkCorner(xPosition, zPosition, [0, 0, 0]),
          createBalkCorner(xPosition, zPosition, [0, Math.PI / 2, 0]),
          createBalkCorner(xPosition, zPosition, [0, Math.PI, 0]),
          createBalkCorner(xPosition, zPosition, [0, -Math.PI / 2, 0])
        );
      }
    }
  }

  return columns;
};

export default ColumnsGrid;
