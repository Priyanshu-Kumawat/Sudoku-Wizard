import React from "react";
import { useSudoku } from "../Context/SudokuContext";

const SudokuGrid: React.FC = () => {

  const { Initial, SudokuArr, onInputChange } = useSudoku();
  

  return (
    <table>
      <tbody>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
          <tr key={row} className={(row + 1) % 3 === 0 ? "bBorder" : ""}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
              <td
                key={row + col}
                className={(col + 1) % 3 === 0 ? "rBorder" : ""}
              >
                <input
                  onChange={(e) => onInputChange(e, row, col)}
                  value={SudokuArr[row][col] === -1 ? "" : SudokuArr[row][col]}
                  className="cellInput"
                  disabled={Initial[row][col] !== -1}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SudokuGrid;
