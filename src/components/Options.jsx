import { useState } from "react";
import Confetti from 'react-dom-confetti';

function Options(prop) {
    let [color, setColor] = useState(['default', 'default', 'default', 'default']);
    let [clicked, setClicked] = useState(false);

    function checkAnswer(marked) {
        if(clicked) return;
        setClicked(true);
        
        let colorCopy = [...color];

        if(marked === prop.answer) {
            console.log('correct');
            colorCopy[marked] = 'correct';
            setColor(colorCopy);
        }
        else {
            console.log('wrong');
            colorCopy[marked] = 'wrong';
            setColor(colorCopy);
        }

        setTimeout(() => {
            colorCopy[marked] = 'default';
            setColor(colorCopy);
            setClicked(false);
        }, 2000)

        prop.clickHandler(marked);       
    }
    
    return (
        <div className="options">
            <div className={`box ${color[0]}`} onClick={() => checkAnswer(0)}>
                {prop.options[0]}
                <Confetti active={color[0] === "correct"} />
            </div>
            <div className={`box ${color[1]}`} onClick={() => checkAnswer(1)}>
                {prop.options[1]}
                <Confetti active={ color[1] === "correct" } />
            </div>
            <div className={`box ${color[2]}`} onClick={() => checkAnswer(2)}>
                {prop.options[2]}
                <Confetti active={ color[2] === "correct" } />    
            </div>
            <div className={`box ${color[3]}`} onClick={() => checkAnswer(3)}>
                {prop.options[3]}
                <Confetti active={ color[3] === "correct" } />
            </div>
        </div>
    );
}

export default Options;