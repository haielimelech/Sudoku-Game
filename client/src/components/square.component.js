import React from 'react';


const Square = ({ value, onSquareClick,backgroundColor,isChangeble })=> {
  return (
    <button 
    className="square" 
    onClick={onSquareClick}
    style={{backgroundColor:backgroundColor}}
    isChangeble = {isChangeble}>
    
      {value}
    </button>
  );
}

export default Square