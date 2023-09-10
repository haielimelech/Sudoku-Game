import React from "react";
import { useState  } from "react";
import Square from "./square.component";

const Tools = (props) => {

    const [clickedButton, setClickedButton] = useState(null);
    const [squareColors, setSquareColors] = useState(Array(9).fill("#ffffff"));
    const [buttons,setButtons] = useState(Array.from({ length: 9 }, (_, index) => index + 1));

    function handleButtonClick(index){
        const newClickedButton = index+1;
        setClickedButton(newClickedButton);
        props.toolsButton(newClickedButton);
        
        const newButtons = squareColors.slice();
        newButtons.fill('#ffffff');
        
        newButtons[index] = "#F2CBDC";
        setSquareColors(newButtons);
    }

    const createTools = () => {
        const tool = [];
        for (let i = 0; i < 9; i++) {
            tool.push(<Square value={buttons[i]} backgroundColor={squareColors[i]} onSquareClick={() => handleButtonClick(i)} />);
          }
          return tool;
        }
    

    return (
        <div className="tools">
        <div className="tools-buttons">
            {createTools()}
        </div>
        </div>
    );
}

export default Tools;