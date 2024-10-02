import { useState } from 'react';
import './App.css';
import Scene from './components/Scene';

function App() {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(3);
  const [roofMaterial, setRoofMaterial] = useState(true);
  const [boards, setBoards] = useState(true);

  const handleLengthChange = ({ target }) => setLength(parseInt(target.value, 10));
  const handleWidthChange = ({ target }) => setWidth(parseInt(target.value, 10));
  const handleRoofMaterialChange = ({ target }) => setRoofMaterial(target.checked);
  const handleRoofBoardsChange = ({ target }) => setBoards(target.checked);

  return (
    <div className='App'>
      <div className='field'>
        <label>
          Length:
          <input
            type='range'
            id='rangeInputLength'
            min='5'
            max='20'
            step='5'
            value={length}
            onChange={handleLengthChange}
          />
          <span>{length} m</span>
        </label>
        <label>
          Width:
          <input
            type='range'
            id='rangeInputWidth'
            min='3'
            max='12'
            step='3'
            value={width}
            onChange={handleWidthChange}
          />
          <span>{width} m</span>
        </label>
        <label>
          Roof material:
          <input type='checkbox' checked={roofMaterial} onChange={handleRoofMaterialChange} />
        </label>
        <label>
          Wooden flooring:
          <input type='checkbox' checked={boards} onChange={handleRoofBoardsChange} />
        </label>
      </div>

      <Scene roofLength={length} roofWidth={width} roofMaterial={roofMaterial} boards={boards} />
    </div>
  );
}

export default App;
