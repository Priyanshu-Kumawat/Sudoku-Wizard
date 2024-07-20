import SudokuProvider from "./Context/SudokuContext";
import SudokuGrid from "./Components/SudokuGrid";
import Controls from "./Components/Controls";
import CustomGridInput from "./Components/CustomGridInput";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/App.module.css";
import Heading from "./Components/Heading";

function App() {
  return (
    <SudokuProvider>
      <div className={`${styles["App"]} container"`}>
        <Heading />
        <SudokuGrid />
        <CustomGridInput />
        <Controls />
      </div>
    </SudokuProvider>
  );
}

export default App;
