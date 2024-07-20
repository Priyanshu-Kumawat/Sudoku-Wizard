import React from "react";
import Styles from "../styles/Heading.module.css"

// Define the type for props if needed. For a simple heading, no props are required.
const Heading: React.FC = () => {
  return (
    <div className={`${Styles["heading"]}`}>
      <h1>Sudoku Wizard</h1>
    </div>
  );
};

export default Heading;
