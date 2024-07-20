import React from 'react';
import {useSudoku} from "../Context/SudokuContext"

 
const Controls: React.FC = () => {
  const { checkSudoku, solveSudoku, resetSudoku, solveTime } = useSudoku();

  return (
    <div className="buttonContainer">
      <button className='checkButton' onClick={checkSudoku}>Check</button>
      <button className='solveButton' onClick={solveSudoku}>Solve</button>
      <button className='resetButton' onClick={resetSudoku}>Reset</button>
      {solveTime !== null && <p>Solve Time: {solveTime.toFixed(2)} ms</p>}
    </div>
  );
};

export default Controls;
