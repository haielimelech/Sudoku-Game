import React from "react";
import Board from "./components/board.component";


const App = () => {
    return (
    <div className="App">
    <div className="Header">
        <h1 className="header-name">Sudoku Game</h1>
    </div>
        <div className="Board">
            <Board/>
        </div>
    </div>
    );
}

export default App;