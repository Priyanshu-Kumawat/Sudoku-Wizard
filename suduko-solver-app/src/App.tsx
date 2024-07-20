import SudokuProvider from './Context/SudokuContext';
import SudokuGrid from './Components/SudokuGrid';
import Controls from "./Components/Controls"
import CustomGridInput from "./Components/CustomGridInput"
import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <SudokuProvider>
      <div className="App">
        <div className="App-header">
          <h1>Sudoku Wizard</h1>
          <SudokuGrid />
          <CustomGridInput />
          <Controls />
        </div>
      </div>
    </SudokuProvider>
  );
}

export default App;
