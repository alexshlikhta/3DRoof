import Models from '../Models';
import { v4 as uuidv4 } from 'uuid';

const RoofMaterial = ({
  roofLength,
  roofWidth,
  Balk150x150x2200,
  firstFreezeDistance,
  Lodge150x50x1000,
  Ruberoid1000x1000x2,
  Lodge20x190x1000Bevel,
}) => {
  const elements = [];
  const totalObjLength = roofLength + Balk150x150x2200.width + firstFreezeDistance * 2;
  const elementLength = roofWidth + Balk150x150x2200.width + firstFreezeDistance * 2;
  const elementWidth = Ruberoid1000x1000x2.width;
  const elementPosY =
    Balk150x150x2200.height +
    Balk150x150x2200.width +
    Lodge150x50x1000.height +
    Lodge20x190x1000Bevel.height;
  const elementPosZ = elementLength / 2;

  const elementCount = Math.floor(totalObjLength / elementWidth);
  const remainingWidth = totalObjLength - elementCount * elementWidth;

  // Helper function to create elements
  const createElement = (xPosition, widthScale = 1) => (
    <Models.Ruberoid1000x1000x2
      key={uuidv4()}
      rotation={[0, Math.PI / 2, 0]}
      position={[xPosition, elementPosY, elementPosZ]}
      scale={[elementLength, 1, widthScale]}
    />
  );

  // Generate the elements
  for (let i = 0; i < elementCount; i++) {
    const xPosition = -totalObjLength / 2 + elementWidth + i * elementWidth;
    elements.push(createElement(xPosition));
  }

  // Add the remaining element if there is extra space
  if (remainingWidth > 0) {
    const remainingXPosition = -totalObjLength / 2 + remainingWidth + elementCount * elementWidth;
    elements.push(createElement(remainingXPosition, remainingWidth));
  }

  return elements;
};

export default RoofMaterial;
