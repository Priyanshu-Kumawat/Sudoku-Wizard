import React, { createContext, useState, useContext, useEffect } from "react";

// type for the Sudoku grid 
type SudokuGrid = number[][];

// Define the interface for the Sudoku context
interface SudokuContextType {
  Initial: SudokuGrid;
  SudokuArr: SudokuGrid;
  solveTime: number | null;
  resetTrigger: boolean;
  setSudokuArr: React.Dispatch<React.SetStateAction<SudokuGrid>>;
  setSolveTime: React.Dispatch<React.SetStateAction<number | null>>;
  setResetTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  applyCustomGrid: (a: string) => void;
  checkSudoku: () => void;
  solveSudoku: () => void;
  resetSudoku: () => void;
}

// Create the context 
const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

// Custom hook to use the Sudoku context
export const useSudoku = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error("useSudoku must be used within a SudokuProvider");
  }
  return context;
};

// Provider component for the Sudoku context
const SudokuProvider = ({ children }: { children: React.ReactNode }) => {
 
  // Default Sudoku grid 
  let defaultGrid: SudokuGrid = [
    [5, 3, -1, -1, 7, -1, -1, -1, -1],
    [6, -1, -1, 1, 9, 5, -1, -1, -1],
    [-1, 9, 8, -1, -1, -1, -1, 6, -1],
    [8, -1, -1, -1, 6, -1, -1, -1, 3],
    [4, -1, -1, 8, -1, 3, -1, -1, 1],
    [7, -1, -1, -1, 2, -1, -1, -1, 6],
    [-1, 6, -1, -1, -1, -1, 2, 8, -1],
    [-1, -1, -1, 4, 1, 9, -1, -1, 5],
    [-1, -1, -1, -1, 8, -1, -1, 7, 9],
  ];

  // State variables for initial grid, current grid, solve time, and reset trigger
  const [Initial, setInitial] = useState<SudokuGrid>(defaultGrid);
  const [SudokuArr, setSudokuArr] = useState<SudokuGrid>(getDeepCopy(Initial));
  const [solveTime, setSolveTime] = useState<number | null>(null);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  // Update SudokuArr whenever Initial changes
  useEffect(() => {
    setSudokuArr(getDeepCopy(Initial));
  }, [Initial]);

  // Utility function to create a deep copy of the grid
  function getDeepCopy(arr: SudokuGrid): SudokuGrid {
    return JSON.parse(JSON.stringify(arr));
  }

  // Handle input changes in the Sudoku grid
  function onInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    const val = parseInt(e.target.value) || -1;
    const grid = getDeepCopy(SudokuArr);
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);
  }

  // Apply a custom grid 
  function applyCustomGrid(customGrid: string) {
    try {
      const grid: SudokuGrid = JSON.parse(customGrid);
      if (grid.length === 9 && grid.every((row) => row.length === 9)) {
        setInitial(grid);
      } else {
        alert("Invalid grid format. Ensure it's a 9x9 array.");
      }
    } catch (error) {
      alert("Invalid input. Please provide a valid 2D array.");
    }
  }

  // Validation of Sudoku rules
  function checkValid(grid: SudokuGrid, row: number, col: number, num: number) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
      if (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num) {
        return false;
      }
    }
    return true;
  }

  // Sudoku Grid Solver
  function solver(grid: SudokuGrid): boolean {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === -1) {
          for (let num = 1; num <= 9; num++) {
            if (checkValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solver(grid)) {
                return true;
              } else {
                grid[row][col] = -1; 
              }
            }
          }
          return false; 
        }
      }
    }
    return true; 
  }

  // Compare the current Sudoku grid with the solved grid to determine completeness and solvability
  function compareSudokus(currentSudoku: SudokuGrid, solvedSudoku: SudokuGrid) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  // Check the current Sudoku grid against the solved grid
  function checkSudoku() {
    const sudoku = getDeepCopy(Initial);
    solver(sudoku);
    const compare = compareSudokus(SudokuArr, sudoku);
    if (compare.isComplete) {
      alert("Congratulations! You have solved Sudoku!");
    } else if (compare.isSolvable) {
      alert("Keep going!");
    } else {
      alert("Sudoku can't be solved. Try again!");
    }
  }

  // Solve the Sudoku grid and measure Response Time
  function solveSudoku() {
    const sudoku = getDeepCopy(Initial);
    const startTime = performance.now();
    solver(sudoku);
    const endTime = performance.now();
    setSolveTime(endTime - startTime);
    setSudokuArr(sudoku); 
  }

  // Reset the Sudoku grid to its default state
  function resetSudoku() {
    setResetTrigger(true);
    setInitial(defaultGrid); 
    setSolveTime(null); 
    const sudoku = getDeepCopy(defaultGrid);
    setSudokuArr(sudoku); 
  }

  return (
    <SudokuContext.Provider
      value={{
        Initial,
        SudokuArr,
        solveTime,
        setSudokuArr,
        setSolveTime,
        onInputChange,
        applyCustomGrid,
        checkSudoku,
        solveSudoku,
        resetSudoku,
        resetTrigger,
        setResetTrigger,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
};

export default SudokuProvider;
