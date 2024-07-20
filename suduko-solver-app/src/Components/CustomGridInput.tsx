import React, { useEffect, useRef } from "react";
import { useSudoku } from "../Context/SudokuContext";

const CustomGridInput: React.FC = () => {
  const {applyCustomGrid, resetTrigger, setResetTrigger } = useSudoku();

  const customGridRef = useRef<HTMLTextAreaElement>(null);

  const handleApplyCustomGrid = () => {

    if (customGridRef.current) {
      try {
        if (customGridRef.current) {
          applyCustomGrid(customGridRef.current.value);
        } else {
          alert("Please provide a valid Value");
        }
      } catch (error) {
        alert("Invalid input. Please provide a valid 2D array.");
      }
    }
  };

  useEffect(() => {
    if (resetTrigger && customGridRef.current) {
      customGridRef.current.value = '';
      setResetTrigger(false);
    }
  }, [resetTrigger]);


  return (
    <div className="customInput">
      <textarea
        className="inputCustomGrid"
        id="scrollbar6"
        ref={customGridRef}
        placeholder="Enter custom Sudoku grid as 2D array"
        rows={2}
        cols={32}
      />
      <button className="addButton" onClick={handleApplyCustomGrid}>
        Add From Array
      </button>
    </div>
  );
};

export default CustomGridInput;
