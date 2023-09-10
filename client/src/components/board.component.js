import { useState,useEffect } from 'react';
import Square from './square.component';
import Tools from './tools.component';

const Board = ()=> {
  const [squares, setSquares] = useState(Array(81).fill(null));
  const [isChangeble,setIsChangeable] = useState(Array(81).fill(false));
  const [toolsClickedButton, setToolsClickedButton] = useState(null);
  const [squareColors, setSquareColors] = useState(Array(81).fill("#ffffff"));

  function handleValidateSudoku() {
    fetch('http://localhost:4000/validate-sudoku', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ grid: squares }), // 'squares' is your Sudoku grid
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.message ==='Invalid solution'){
        alert('Invalid solution');
  }else if(data.message ==='Valid solution'){
    alert('Valid solution');
  }
    })
    .catch((error) => {
      console.error('Error validating Sudoku:', error);
    });
  }
  function handleStartButton(diff) {
    fetch(`http://localhost:4000/sudoku-puzzle/${diff}`)
      .then((response) => response.json())
      .then((data) => {
        setSquares(data.flat());
      
        const newChangeables = data.flat().map((item) => item === '');
        setIsChangeable(newChangeables);
      
        const newButtonColors = data.flat().map((item) => (item === '' ? '#ffffff' : '#C9E0BF'));
        const newnew = newButtonColors.slice();
        setSquareColors(newnew);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  function handleClick(i) { 
    if(isChangeble[i]){
      const nextSquares = squares.slice();
      nextSquares[i] = toolsClickedButton;
      setSquares(nextSquares);
    } 
  }
  const createBoard = () => {
    const board = [];
    let countRow = 0;
    let countRowGap =0;
    let row = [];
    for (let i = 0; i < 81; i++) {
      row.push(<Square value={squares[i]} backgroundColor={squareColors[i]} isChangeble={isChangeble[i]} onSquareClick={() => handleClick(i)} />);
      countRow++;
      if (countRow === 9) {
        board.push(<div className="board-row">{row}</div>);
        countRow = 0;
        row = [];
      }
    }

    return board;
  }

  return (
      <div className='soduko-board'>
        {createBoard()}
        <div className="tools">
        <Tools
          toolsButton={toolsButton=> setToolsClickedButton(toolsButton)}
        />
        <div className="menu-buttons">
         <button className="tools-button" onClick={() => handleStartButton('easy')}>Easy</button>
         <button className="tools-button" onClick={() => handleStartButton('medium')}>Medium</button>
         <button className="tools-button" onClick={() => handleStartButton('hard')}>Hard</button>
         <button className='dif-button'onClick={()=> handleValidateSudoku()}>Check</button>
         </div>
        </div>
      </div>  
  );
}

export default Board;